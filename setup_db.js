const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './blog.db'
})

try {
    sequelize.authenticate()
}
catch {
    console.error('No connection')
}

const User = sequelize.define('User', {
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

const Perry = User.build({
    username: 'Perry',
    password: 'ljflaksjflk'
})
Perry.save()

async function findUsers() {
    let users = await User.findAll()
    console.log(users[0].dataValues);
}
findUsers()