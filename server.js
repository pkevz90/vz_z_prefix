require('dotenv').config()
const express = require('express')
const path = require('path');
const app = express()
const PORT = process.env.PORT || 3001
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));

const users = [
    {
        username: 'Perry',
        password: 'password'
    },
    {
        username: 'Kylee',
        password: 'password'
    },

]

app.post('/login', async (req,res) => {
    let user = users.find(user => user.username === req.body.username)
    if (user === undefined) return res.sendStatus(401)
    if (user.password === req.body.password) {
        // Send JWT
        let authUser = {
            username: user.username
        }
        const accessToken = jwt.sign(authUser, process.env.ACCESS_SECRET)
        return res.status(201).json(accessToken).send()
    }
    else {
        return res.sendStatus(401)
    }
})

// Middleware to check auth token
function checkJWT(req, res, next) {

}

app.listen(PORT, () => console.log('Server started on port ' + PORT ))
