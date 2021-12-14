require('dotenv').config()
const express = require('express')
const path = require('path');
const app = express()
const PORT = process.env.PORT || 3001
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { Sequelize, Model, DataTypes } = require('sequelize')
const cookieSession = require('cookie-session')

let sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})
sequelize.drop();
// bloguser
// blogposts
const User = sequelize.define('bloguser', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
const Blog = sequelize.define('blogposts', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(5000),
        allowNull: false
    },
})

User.hasMany(Blog)
Blog.belongsTo(User)
User.sync()
Blog.sync()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));
app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_SECRET],
    httpOnly: true
}))

app.post('/login', async (req,res) => {
    let user = await User.findAll({
        where: {
            username: req.body.username.toLowerCase()
        }
    })
    if (user.length === 0) return res.sendStatus(401)
    user = user[0].dataValues
    let passComp = await bcrypt.compare(req.body.password, user.password)
    if (passComp) {
        // Send JWT
        req.session.id = user.id
        return res.status(200).json({user: user.username, id: user.id})
    }
    else {
        return res.sendStatus(401)
    }
})

app.post('/blog', authenticate, async (req,res) => {
    let {content, title} = req.body
    await Blog.create({
        title,
        content,
        bloguserId: req.id
    })
    let blogs = await Blog.findAll({
        where: {
            bloguserId: req.id
        },
        attributes: ['id', 'createdAt', 'title', 'content', 'bloguserId'],
        include: [
            {
                model: User,
                required: true,
                attributes: ['username']
            }
        ]
    })
    res.status(201).json(blogs)
})

app.post('/create', async (req,res) => {
    let hashedPassword = await bcrypt.hash(req.body.password, 12)
    const oldUser = await User.findAll({
        where: {
            username: req.body.username.toLowerCase()
        }
    })
    if (oldUser.length !== 0) return res.sendStatus(409)
    const user = await User.create({
        username: req.body.username.toLowerCase(),
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    console.log(user.id);
    // req.session.id = user.id
    res.status(201).json(user)
})

app.get('/posts', async (req,res) => {
    let blogs = await Blog.findAll({
        attributes: ['id', 'createdAt', 'title', 'content', 'bloguserId'],
        include: [
            {
                model: User,
                required: true,
                attributes: ['username']
            }
        ]
    })
    res.status(200).json({outBlogs: blogs})
})

app.get('/logout', (req,res) => {
    req.session = null
    res.sendStatus(200)
})

app.get('/posts/:userid' ,async (req,res) => {
    let blogs = await Blog.findAll({
        where: {
            bloguserId: req.params.userid
        },
        attributes: ['id', 'createdAt', 'title', 'content', 'bloguserId'],
        include: [
            {
                model: User,
                required: true,
                attributes: ['username']
            }
        ]
    })
    res.status(200).json({outBlogs: blogs})
})
// /
app.get('/login/auth', authenticate, async (req,res) => {
    let user = await User.findAll({
        where: {
            id: req.id
        }
    })
    if (user.length === 0) return res.sendStatus(403)
    user = user[0].dataValues
    res.status(200).json({user: user.username, id: user.id})
})

app.put('/post/:postid', authenticate, async (req,res) => {
    let blog = await Blog.findOne({
        where: {
            id: Number(req.params.postid)
        },
        attributes: ['bloguserId']
    })
    if (req.id !== blog.bloguserId) return res.sendStatus(403)
    await Blog.update({
        content: req.body.content,
        title: req.body.title
    },{
        where: {
            id: Number(req.params.postid)
        }
    })
    let blogs = await Blog.findAll({
        attributes: ['id', 'createdAt', 'title', 'content', 'bloguserId'],
        include: [
            {
                model: User,
                required: true,
                attributes: ['username']
            }
        ]
    })
    res.status(200).json(blogs)
})

app.delete('/post/:id', authenticate, async (req,res) => {
    await Blog.destroy({
        where: {
            id: Number(req.params.id)
        }
    })
    let blogs = await Blog.findAll({
        where: {
            bloguserId: req.id
        },
        attributes: ['id', 'createdAt', 'title', 'content', 'bloguserId'],
        include: [
            {
                model: User,
                required: true,
                attributes: ['username']
            }
        ]
    })
    res.status(200).json(blogs)
})



// Middleware to check auth token

function authenticate(req, res, next) {
    let id = req.session.id
    if (id === undefined) return res.sendStatus(401)
    req.id = id
    next()
}
// function checkJWT(req, res, next) {
//     const token = req.session.jwt
//     // If no JWT present, return forbidden
//     if (token == null) return res.sendStatus(401)
//     // limit algorithm to HS256 to prevent tampering and sending JWT with 'none' setting as algorithm
//     jwt.verify(token,process.env.ACCESS_SECRET, {algorithms: ['HS256']}, (err, user) => {
//         if (err) {
//             // Destroy cookie if JWT is not valid
//             req.session = null
//             return res.sendStatus(403)
//         }
//         // JWT valid, add validated user to request
//         req.user = user.username.toLowerCase()
//         next()
//     })
// }

app.listen(PORT, () => console.log('Server started on port ' + PORT ))
