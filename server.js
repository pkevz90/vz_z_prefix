const express = require('express')
const path = require('path');
const app = express()
const PORT = process.env.PORT || 3001
var cookieParser = require('cookie-parser')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));
app.use(cookieParser('YOUR-SECRET-SALT'));


app.post('/login', async (req,res) => {
    let randomNumber = Math.random()
    if (randomNumber < 0.5) {
        res.cookie('name', 'value', { signed: true }).status(200).send()
    }
    else {
        res.status(401).send()
    }
})

app.listen(PORT, () => console.log('Server started on port ' + PORT ))
