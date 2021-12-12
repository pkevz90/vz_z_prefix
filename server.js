require('dotenv').config()
const express = require('express')
const path = require('path');
const app = express()
const PORT = process.env.PORT || 3001
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose()
const fs = require('fs');
// const { Sequelize, Model, DataTypes } = require('sequelize')

// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './blog.db'
// })
// const User = sequelize.define('user', {
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// })
// User.sync()
// const Blog = sequelize.define('blogs', {
//     subject: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     content: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     user: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// })
// Blog.sync()


const dbFile = './blog.db'
let db;
if (!fs.existsSync(dbFile)) {  
    db = new sqlite3.Database(dbFile) 
    console.log('table created');
    db.serialize(() => {
        db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL);`)
        db.run(`CREATE TABLE blogs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            subject TEXT NOT NULL,
            content TEXT NOT NULL,
            user TEXT NOT NULL);`)
    })
}
else {
    db = new sqlite3.Database(dbFile)
}




app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));



app.post('/login', async (req,res) => {
    db.all(`SELECT password FROM users WHERE username="${req.body.username}"`, async (err, rows) => {
        if (err) return res.sendStatus(500)
        if (rows.length === 0) return res.sendStatus(401)
        let passComp = await bcrypt.compare(req.body.password, rows[0].password)
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
})

app.post('/blog', checkJWT, (req,res) => {
    let {content, subject} = req.body
    let user = req.user
    testBlogs.push({
        user,
        content,
        subject,
        dateCreated: new Date(Date.now()),
        id: testBlogs.length
    })
    res.status(201).json(testBlogs)
})

app.post('/create', async (req,res) => {
    let hashedPassword = await bcrypt.hash(req.body.password, 12)
    db.run(`INSERT INTO users (username, password) VALUES ('${req.body.username}', '${hashedPassword}')`, (err) => {
        if (err) return res.sendStatus(500)
        return res.sendStatus(201)
    })
})

app.get('/posts', (req,res) => {
    res.status(200).json({outBlogs: testBlogs})
})

app.get('/posts/:user' ,(req,res) => {
    let user = req.params.user
    let outBlogs = testBlogs.filter(blog => blog.user === user)
    res.status(200).json({outBlogs})
})
// /
app.get('/login/auth', checkJWT, (req,res) => {
    // if (users.find(user => user.username === req.user)) return res.sendStatus(418)
    // res.status(201).json({username: req.user}).send()
    db.all(`SELECT * FROM users WHERE username="${req.user}"`, (err, rows) => {
        if (err) return res.sendStatus(500)
        if (rows.length === 0) return res.sendStatus(401)
        res.status(201).json({username: req.user}).send()
    })
})

app.put('/post/:id', checkJWT, (req,res) => {
    if (req.user !== req.body.user) return res.sendStatus(403)
    let id = Number(req.params.id)
    let postIndex = testBlogs.findIndex(post => post.id === id)
    if (postIndex === -1) return res.sendStatus(404)
    testBlogs[postIndex] = req.body
    res.status(200).json(testBlogs)
})

app.delete('/post/:id', checkJWT, (req,res) => {
    let id = Number(req.params.id)
    let postIndex = testBlogs.findIndex(post => post.id === id)
    if (postIndex === -1) return res.sendStatus(404)
    if (req.user !== testBlogs[postIndex].user) return res.sendStatus(403)
    testBlogs.splice(postIndex,1)
    res.status(200).json(testBlogs)
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
