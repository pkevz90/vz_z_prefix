require('dotenv').config()
const express = require('express')
const path = require('path');
const app = express()
const PORT = process.env.PORT || 3001
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

let testBlogs = [
    {
      id: 1,
      user: 'Perry',
      subject: 'This is Blog #1',
      dateCreated: new Date(Date.now() + 2*86400000 - 4 * Math.random() * 86400000),
      content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisis magna etiam tempor orci eu lobortis. Integer malesuada nunc vel risus. Sed risus ultricies tristique nulla aliquet enim tortor at. Sapien eget mi proin sed libero enim sed faucibus turpis. Porttitor eget dolor morbi non arcu risus quis. Eros in cursus turpis massa tincidunt dui ut ornare lectus. Fermentum dui faucibus in ornare quam viverra orci sagittis eu. Commodo viverra maecenas accumsan lacus vel. Eu sem integer vitae justo eget magna fermentum iaculis. Vulputate ut pharetra sit amet aliquam id diam maecenas ultricies. Mauris vitae ultricies leo integer malesuada. Tincidunt eget nullam non nisi. Enim facilisis gravida neque convallis a cras semper. Enim tortor at auctor urna nunc id cursus metus. Id venenatis a condimentum vitae sapien pellentesque. Sit amet facilisis magna etiam. Eget nulla facilisi etiam dignissim diam quis enim. Urna et pharetra pharetra massa massa ultricies mi quis.

      Risus quis varius quam quisque id diam vel quam elementum. Maecenas sed enim ut sem viverra aliquet. Massa massa ultricies mi quis. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Faucibus scelerisque eleifend donec pretium vulputate. Semper feugiat nibh sed pulvinar proin gravida. Amet dictum sit amet justo donec enim diam vulputate. Duis ultricies lacus sed turpis tincidunt. Malesuada pellentesque elit eget gravida cum. Amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Dolor morbi non arcu risus quis varius. Imperdiet proin fermentum leo vel orci porta non pulvinar neque. Non sodales neque sodales ut etiam sit amet. Pulvinar sapien et ligula ullamcorper. Vitae nunc sed velit dignissim sodales ut eu sem integer. Leo integer malesuada nunc vel risus commodo. Eget nulla facilisi etiam dignissim diam. Aenean et tortor at risus viverra adipiscing.
      
      Proin fermentum leo vel orci porta non pulvinar. Sit amet consectetur adipiscing elit pellentesque habitant. Tristique senectus et netus et malesuada fames ac turpis. Ullamcorper sit amet risus nullam. Faucibus scelerisque eleifend donec pretium vulputate. Pellentesque habitant morbi tristique senectus et netus et. Id diam vel quam elementum. Ut ornare lectus sit amet est placerat in egestas. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Tempus quam pellentesque nec nam aliquam. Ut tellus elementum sagittis vitae et. Integer quis auctor elit sed vulputate mi sit amet mauris. Posuere lorem ipsum dolor sit. Lectus nulla at volutpat diam ut venenatis tellus in. Faucibus pulvinar elementum integer enim neque volutpat ac. Ut diam quam nulla porttitor massa id neque aliquam vestibulum. Ipsum consequat nisl vel pretium lectus quam id leo in. Massa id neque aliquam vestibulum morbi blandit cursus risus. Libero nunc consequat interdum varius. Eget felis eget nunc lobortis.
      
      Posuere sollicitudin aliquam ultrices sagittis. Egestas tellus rutrum tellus pellentesque eu tincidunt. Faucibus turpis in eu mi bibendum neque egestas congue. Dui nunc mattis enim ut. Mi ipsum faucibus vitae aliquet nec ullamcorper. Amet risus nullam eget felis eget. Posuere morbi leo urna molestie at elementum. Nibh nisl condimentum id venenatis a condimentum. Faucibus scelerisque eleifend donec pretium vulputate sapien nec. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus.
      
      Elit pellentesque habitant morbi tristique senectus et netus. Sapien faucibus et molestie ac feugiat. Facilisis magna etiam tempor orci eu. Odio ut sem nulla pharetra diam sit amet nisl. Sem nulla pharetra diam sit. Suscipit tellus mauris a diam maecenas sed enim. Purus semper eget duis at tellus at urna condimentum mattis. Porta non pulvinar neque laoreet suspendisse interdum consectetur. Netus et malesuada fames ac turpis egestas integer. Nulla at volutpat diam ut venenatis. In arcu cursus euismod quis viverra nibh.
      `
    },
    {
      id: 2,
      user: 'Kylee',
      subject: 'This is Blog #2',
      dateCreated: new Date(Date.now() + 2*86400000 - 4 * Math.random() * 86400000),
      content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec ultrices dui sapien eget mi proin sed libero enim. Pulvinar mattis nunc sed blandit libero volutpat sed cras. Fringilla urna porttitor rhoncus dolor purus. Eu volutpat odio facilisis mauris sit amet. Nisl condimentum id venenatis a condimentum vitae sapien. Elit pellentesque habitant morbi tristique. Interdum velit euismod in pellentesque. Amet volutpat consequat mauris nunc congue nisi vitae. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Faucibus pulvinar elementum integer enim neque volutpat. Enim facilisis gravida neque convallis a cras semper auctor. Eget nullam non nisi est sit amet facilisis magna. Et tortor at risus viverra adipiscing at in tellus. Turpis in eu mi bibendum neque egestas congue quisque egestas. Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi. Amet est placerat in egestas erat imperdiet sed euismod. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Ac odio tempor orci dapibus ultrices in iaculis. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus.

Quisque id diam vel quam elementum. Ac orci phasellus egestas tellus rutrum. Donec ac odio tempor orci dapibus ultrices in. Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Blandit turpis cursus in hac. Diam maecenas sed enim ut. Proin nibh nisl condimentum id venenatis a condimentum vitae. Aliquet nibh praesent tristique magna sit amet purus gravida. In aliquam sem fringilla ut morbi tincidunt augue. Cursus vitae congue mauris rhoncus aenean vel. Imperdiet proin fermentum leo vel orci porta non. Id interdum velit laoreet id donec ultrices tincidunt. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Dignissim sodales ut eu sem integer. Diam maecenas sed enim ut sem viverra aliquet. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Cum sociis natoque penatibus et magnis dis parturient montes. Amet mauris commodo quis imperdiet. Sed viverra tellus in hac habitasse platea.

Vestibulum sed arcu non odio euismod lacinia at quis risus. Lectus nulla at volutpat diam ut venenatis tellus in. Dolor sed viverra ipsum nunc. Amet massa vitae tortor condimentum lacinia quis vel. Tellus integer feugiat scelerisque varius morbi enim nunc. Ipsum suspendisse ultrices gravida dictum fusce. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. Integer vitae justo eget magna fermentum iaculis eu non diam. Interdum velit laoreet id donec. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. Ut diam quam nulla porttitor massa id neque. Adipiscing elit duis tristique sollicitudin. Lectus urna duis convallis convallis tellus. Adipiscing tristique risus nec feugiat. Eu sem integer vitae justo eget magna fermentum. Odio facilisis mauris sit amet massa vitae. Viverra maecenas accumsan lacus vel. Massa massa ultricies mi quis hendrerit. Tincidunt augue interdum velit euismod in pellentesque massa.

Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Vitae ultricies leo integer malesuada. Mi bibendum neque egestas congue quisque egestas. Faucibus vitae aliquet nec ullamcorper. Tellus id interdum velit laoreet id donec ultrices tincidunt arcu. Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum. Nullam eget felis eget nunc lobortis mattis. Rutrum quisque non tellus orci ac auctor augue. Habitant morbi tristique senectus et netus et malesuada fames ac. Quis hendrerit dolor magna eget est lorem ipsum. Diam ut venenatis tellus in metus. Eget velit aliquet sagittis id consectetur purus. Enim praesent elementum facilisis leo. Nullam non nisi est sit. Varius morbi enim nunc faucibus.

Mauris vitae ultricies leo integer malesuada nunc. Integer enim neque volutpat ac tincidunt. Tincidunt nunc pulvinar sapien et ligula ullamcorper. Lectus magna fringilla urna porttitor. Neque aliquam vestibulum morbi blandit cursus risus at. Tristique senectus et netus et malesuada fames ac. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Sociis natoque penatibus et magnis dis parturient montes. Ultrices vitae auctor eu augue ut lectus arcu bibendum. Massa tempor nec feugiat nisl pretium fusce id velit ut. Aliquam ut porttitor leo a diam sollicitudin. Lorem ipsum dolor sit amet consectetur adipiscing. Libero enim sed faucibus turpis in eu mi bibendum neque.`
    },
    {
      id: 3,
      user: 'Perry',
      subject: 'This is Blog #3',
      dateCreated: new Date(Date.now() + 2*86400000 - 4 * Math.random() * 86400000),
      content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet mattis vulputate enim nulla. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Mus mauris vitae ultricies leo integer malesuada nunc vel. Vitae tempus quam pellentesque nec.`
    },
    {
      id: 4,
      user: 'Kylee',
      subject: 'This is Blog #4',
      dateCreated: new Date(Date.now() + 2*86400000 - 4 * Math.random() * 86400000),
      content: `
      Morbi volutpat ante sed magna pretium molestie. Nunc vulputate placerat leo in accumsan. Donec ultricies consequat mollis. Curabitur sodales leo sed justo blandit posuere. Donec ullamcorper est non nunc hendrerit, ut rutrum dolor facilisis. Pellentesque eget tempor nibh, et dictum risus. Praesent interdum metus a pretium interdum. Aliquam ac malesuada magna, ut tempor quam. Donec imperdiet porttitor felis tempus fermentum. Sed ac nulla massa. Curabitur vehicula pellentesque sapien, et viverra eros elementum vitae. Vivamus at urna id massa tincidunt varius. Suspendisse potenti. Donec placerat tellus imperdiet, commodo odio id, lacinia eros. Aliquam non augue at risus viverra eleifend.Maecenas malesuada pulvinar nisi, sed facilisis justo. Proin laoreet felis sed justo volutpat, eu vulputate lorem iaculis. Aenean ac pretium est. Etiam sit amet accumsan lacus. Quisque justo felis, vulputate vitae pellentesque eu, rhoncus vitae leo. Nam lobortis nunc velit, et convallis sapien euismod eget. Nam nec tortor et risus blandit finibus in eget ex. Aenean ullamcorper placerat ipsum vitae scelerisque. Vestibulum id fringilla eros. Vivamus vestibulum nisi cursus rhoncus finibus. Nulla ut egestas sem.
      `
    },
    {
      id: 5,
      user: 'Gemini',
      subject: 'This is Blog #4',
      dateCreated: new Date(Date.now() + 2*86400000 - 4 * Math.random() * 86400000),
      content: `
      Mi quis hendrerit dolor magna eget est. Sem viverra aliquet eget sit amet tellus cras adipiscing enim. Dolor sed viverra ipsum nunc. Odio ut sem nulla pharetra diam sit amet nisl. In arcu cursus euismod quis viverra nibh cras pulvinar mattis. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Morbi tincidunt ornare massa eget egestas purus. Libero justo laoreet sit amet cursus sit amet dictum sit. Ut pharetra sit amet aliquam id. Cras pulvinar mattis nunc sed blandit libero volutpat. Tincidunt tortor aliquam nulla facilisi cras fermentum odio. Convallis convallis tellus id interdum.`
    }
    
]


app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));

const users = [{
    username: 'Perry',
    password: '$2b$12$0XA.ZjS43kYb0uA4Bqx2HeATa10XxOGLfYgw3RKiJhn3arnMUMgmq'
}]

app.post('/login', async (req,res) => {
    let user = users.find(user => user.username === req.body.username)
    if (user === undefined) return res.sendStatus(401)
    let passComp = await bcrypt.compare(req.body.password, user.password)
    if (passComp) {
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
    users.push({
        username: req.body.username,
        password: hashedPassword
    })
    res.sendStatus(201)
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
    if (users.find(user => user.username === req.user)) return res.sendStatus(418)
    res.status(201).json({username: req.user}).send()
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
