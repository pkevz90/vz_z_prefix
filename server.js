require('dotenv').config()
const express = require('express')
const path = require('path');
const app = express()
const PORT = process.env.PORT || 3001
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

let testBlogs = [
    {
      id: 1,
      user: 'Perry',
      subject: 'This is Blog #1',
      dateCreated: new Date(Date.now() + 2*86400000 - 4 * Math.random() * 86400000),
      content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed ante eget massa aliquam semper maximus vel sem. Nulla et ante bibendum, tincidunt metus vitae, bibendum ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed placerat, quam ut accumsan euismod, lacus enim cursus diam, sed ornare justo justo non nisl. Sed hendrerit neque ut tellus hendrerit, in venenatis turpis fringilla. Praesent ultricies magna efficitur est vestibulum euismod. Suspendisse potenti. Aenean vel neque enim. Morbi accumsan a turpis egestas maximus. Fusce mattis et augue pharetra vulputate.
      `
    },
    {
      id: 2,
      user: 'Kylee',
      subject: 'This is Blog #2',
      dateCreated: new Date(Date.now() + 2*86400000 - 4 * Math.random() * 86400000),
      content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed ante eget massa aliquam semper maximus vel sem. Nulla et ante bibendum, tincidunt metus vitae, bibendum ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed placerat, quam ut accumsan euismod, lacus enim cursus diam, sed ornare justo justo non nisl. Sed hendrerit neque ut tellus hendrerit, in venenatis turpis fringilla. Praesent ultricies magna efficitur est vestibulum euismod. Suspendisse potenti. Aenean vel neque enim. Morbi accumsan a turpis egestas maximus. Fusce mattis et augue pharetra vulputate.
      `
    },
    {
      id: 3,
      user: 'Perry',
      subject: 'This is Blog #3',
      dateCreated: new Date(Date.now() + 2*86400000 - 4 * Math.random() * 86400000),
      content: `
      Maecenas malesuada pulvinar nisi, sed facilisis justo. Proin laoreet felis sed justo volutpat, eu vulputate lorem iaculis. Aenean ac pretium est. Etiam sit amet accumsan lacus. Quisque justo felis, vulputate vitae pellentesque eu, rhoncus vitae leo. Nam lobortis nunc velit, et convallis sapien euismod eget. Nam nec tortor et risus blandit finibus in eget ex. Aenean ullamcorper placerat ipsum vitae scelerisque. Vestibulum id fringilla eros. Vivamus vestibulum nisi cursus rhoncus finibus. Nulla ut egestas sem.
      `
    },
    {
      id: 4,
      user: 'Kylee',
      subject: 'This is Blog #4',
      dateCreated: new Date(Date.now() + 2*86400000 - 4 * Math.random() * 86400000),
      content: `
      Morbi volutpat ante sed magna pretium molestie. Nunc vulputate placerat leo in accumsan. Donec ultricies consequat mollis. Curabitur sodales leo sed justo blandit posuere. Donec ullamcorper est non nunc hendrerit, ut rutrum dolor facilisis. Pellentesque eget tempor nibh, et dictum risus. Praesent interdum metus a pretium interdum. Aliquam ac malesuada magna, ut tempor quam. Donec imperdiet porttitor felis tempus fermentum. Sed ac nulla massa. Curabitur vehicula pellentesque sapien, et viverra eros elementum vitae. Vivamus at urna id massa tincidunt varius. Suspendisse potenti. Donec placerat tellus imperdiet, commodo odio id, lacinia eros. Aliquam non augue at risus viverra eleifend.Maecenas malesuada pulvinar nisi, sed facilisis justo. Proin laoreet felis sed justo volutpat, eu vulputate lorem iaculis. Aenean ac pretium est. Etiam sit amet accumsan lacus. Quisque justo felis, vulputate vitae pellentesque eu, rhoncus vitae leo. Nam lobortis nunc velit, et convallis sapien euismod eget. Nam nec tortor et risus blandit finibus in eget ex. Aenean ullamcorper placerat ipsum vitae scelerisque. Vestibulum id fringilla eros. Vivamus vestibulum nisi cursus rhoncus finibus. Nulla ut egestas sem.
      `
    }
    
]


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

app.post('/create', async (req,res) => {
    users.push({
        username: req.body.username,
        password: req.body.password
    })
    res.sendStatus(201)
})

app.get('/login/auth', checkJWT, (req,res) => {
    res.status(201).json({username: req.user}).send()
})

// Middleware to check auth token
function checkJWT(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    // console.log(token);
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user.username
        next()
    })
}

app.listen(PORT, () => console.log('Server started on port ' + PORT ))
