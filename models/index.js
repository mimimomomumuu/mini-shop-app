const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
)


const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

// โหลดโมเดล Shop
db.Shop = require('./shop')(sequelize, DataTypes)

module.exports = db
