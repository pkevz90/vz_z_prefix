require('dotenv').config()
const express = require('express')
const path = require('path');
const app = express()
const PORT = process.env.PORT || 3001
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { Sequelize, Model, DataTypes } = require('sequelize')

console.log(process.env.DATABASE_URL);
let sequelize
if (false) {
    sequelize = new Sequelize(process.env.DATABASE_URL)
}
else {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './blog.db'
    })
}


const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
User.sync()
const Blog = sequelize.define('blogs', {
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
Blog.sync()


app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));



app.post('/login', async (req,res) => {
    let user = await User.findAll({
        where: {
            username: req.body.username
        }
    })
    if (user.length === 0) return res.sendStatus(401)
    user = user[0].dataValues
    let passComp = await bcrypt.compare(req.body.password, user.password)
    if (passComp) {
        // Send JWT
        let authUser = {
            username: req.body.username
        }
        const accessToken = jwt.sign(authUser, process.env.ACCESS_SECRET)
        return res.status(201).json(accessToken).send()
    }
    else {
        return res.sendStatus(401)
    }
})

app.post('/blog', checkJWT, async (req,res) => {
    let {content, subject} = req.body
    let user = req.user
    let blog = await Blog.create({
        subject,
        content,
        user
    })
    let blogs = await Blog.findAll({
        where: {
            user: req.user
        }
    })
    res.status(201).json(blogs)
})

app.post('/create', async (req,res) => {
    let hashedPassword = await bcrypt.hash(req.body.password, 12)
    const oldUser = await User.findAll({
        where: {
            username: req.body.username
        }
    })
    if (oldUser.length !== 0) return res.sendStatus(409)
    const user = await User.create({
        username: req.body.username,
        password: hashedPassword
    })
    res.sendStatus(201)
})

app.get('/posts', async (req,res) => {
    let blogs = await Blog.findAll()
    res.status(200).json({outBlogs: blogs})
})

app.get('/posts/:user' ,async (req,res) => {
    let blogs = await Blog.findAll({
        where: {
            user: req.params.user
        }
    })
    res.status(200).json({outBlogs: blogs})
})
// /
app.get('/login/auth', checkJWT, async (req,res) => {
    let user = await User.findAll({
        where: {
            username: req.user
        }
    })
    if (user.length === 0) return res.sendStatus(403)
    res.status(201).json({user: req.user})
})

app.put('/post/:id', checkJWT, async (req,res) => {
    if (req.user !== req.body.user) return res.sendStatus(403)
    await Blog.update({
        content: req.body.content,
        subject: req.body.subject
    },{
        where: {
            id: Number(req.params.id)
        }
    })
    let blogs = await Blog.findAll()
    res.status(200).json(blogs)
})

app.delete('/post/:id', checkJWT, async (req,res) => {
    await Blog.destroy({
        where: {
            id: Number(req.params.id)
        }
    })
    let blogs = await Blog.findAll()
    res.status(200).json(blogs)
})

// Middleware to check auth token
function checkJWT(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    // console.log(token);
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403)
        }
        console.log(user.username);
        req.user = user.username
        next()
    })
}

app.listen(PORT, () => console.log('Server started on port ' + PORT ))
