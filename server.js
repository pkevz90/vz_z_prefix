require('dotenv').config()
const express = require('express')
const path = require('path');
const app = express()
const PORT = process.env.PORT || 3001
const bcrypt = require('bcrypt');
const { Sequelize, Model, DataTypes } = require('sequelize')
const cookieSession = require('cookie-session')
const { v4: uuidv4 } = require('uuid')
var morgan = require('morgan')

let sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
})
// Database Tables:
// bloguser
// blogposts
// validcookies
const User = sequelize.define('bloguser', {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Anonymous'
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
const Cookies = sequelize.define('validcookies', {
    cookieid: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

let resetDb = false;
User.hasMany(Blog)
User.hasMany(Cookies)
Blog.belongsTo(User)
Cookies.belongsTo(User)
User.sync({
    force: resetDb
})
Blog.sync({
    force: resetDb
})
Cookies.sync({
    force: resetDb
})

// User.findAll().then((res, err) => console.log(res))

app.use(morgan(':date[web] :method :url :status - :response-time ms'))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));
app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_SECRET],
    httpOnly: true,
    maxAge: 86400000
}))

app.post('/login', async (req,res) => {
    let user
    try {
        user = await User.findAll({
            where: {
                username: req.body.username.toLowerCase()
            }
        })
    }
    catch (err) {
        return res.sendStatus(500)
    }
    if (user.length === 0) return res.sendStatus(401)
    user = user[0].dataValues
    let passComp = await bcrypt.compare(req.body.password, user.password)
    if (passComp) {
        // Send JWT
        let cookieId = uuidv4()
        req.session.id = user.id
        req.session.cookieId = cookieId
        await Cookies.create({
            userId: user.id,
            cookieid: cookieId
        })
        return res.status(200).json({user: user.username, id: user.id})
    }
    else {
        return res.sendStatus(401)
    }
})

app.post('/blog', authenticate, async (req,res) => {
    let {content, title} = req.body
    let blogs
    try {
        await Blog.create({
            title,
            content,
            bloguserId: req.id
        })
        blogs = await Blog.findAll({
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
    }
    catch (err) {
        return res.sendStatus(500)
    }
    res.status(201).json(blogs)
})

app.post('/create', async (req,res) => {
    let hashedPassword = await bcrypt.hash(req.body.password, 12)
    let user
    try {
        user = await User.create({
            username: req.body.username.toLowerCase(),
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
    }
    catch (err) {
        console.error(err.original.detail);
        return res.sendStatus(500)
    }
    let cookieId = uuidv4()
    try {
        await Cookies.create({
            userId: user.id,
            cookieid: cookieId
        })
        
        req.session.id = user.id
        req.session.cookieId = cookieId
    }
    catch (err) {
        // Will not send error and user will have to login on refresh    
    }
    res.status(201).json({user: user.username, id: user.id})
})

app.get('/posts', async (req,res) => {
    let blogs
    try {
        blogs = await Blog.findAll({
            attributes: ['id', 'createdAt', 'title', 'content', 'bloguserId'],
            include: [
                {
                    model: User,
                    required: true,
                    attributes: ['username']
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
    }
    catch (err) {
        return res.sendStatus(500)
    }
    res.status(200).json({outBlogs: blogs})
})

app.get('/logout', async (req,res) => {
    // Remove cookieId from valid cookies database
    // Prevents cookie from being used without user permission
    try {
        await Cookies.destroy({
            where: {
                cookieid: req.session.cookieId
            }
        })
    }
    catch (err) {
        return res.sendStatus(500)
    }
    req.session = null
    res.sendStatus(200)
})

app.get('/posts/:userid' ,async (req,res) => {
    let blogs
    try {
        blogs = await Blog.findAll({
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
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
    }
    catch (err) {
        return res.sendStatus(500)
    }
    
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
    let blogs
    try {
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
        blogs = await Blog.findAll({
            attributes: ['id', 'createdAt', 'title', 'content', 'bloguserId'],
            include: [
                {
                    model: User,
                    required: true,
                    attributes: ['username']
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
    }
    catch(err) {
        return res.sendStatus(500)
    }
    res.status(201).json(blogs)
})

app.delete('/post/:id', authenticate, async (req,res) => {
    let blogs
    try {
        await Blog.destroy({
            where: {
                id: Number(req.params.id)
            }
        })
        blogs = await Blog.findAll({
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
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
    }
    catch(err) {
        return res.sendStatus(500)
    }
    
    res.status(201).json(blogs)
})



// Middleware to check auth token

async function authenticate(req, res, next) {
    let id = req.session.id
    let cookieId = req.session.cookieId
    
    // If cookie does not exist, send back unauthorized
    if (id === undefined) return res.sendStatus(401)
    try {
        let cookie = await Cookies.findOne({
            where: {
                cookieid: cookieId
            }
        })
        if (!cookie) {
            // If cookie not within authorized cookie database, send back unauthorized
            req.session = null
            return res.sendStatus(401)
        }
    }
    catch(err) {
        return res.sendStatus(500)
    }
    
    req.id = id
    next()
}

app.listen(PORT, () => console.log('Server started on port ' + PORT ))
