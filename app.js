require('dotenv').config()
const express = require('express')
const app = express()
const { sequelize } = require('./models')
const shopRoutes = require('./routes/shopRoutes')
const authRoutes = require('./routes/authRoutes')  

app.use(express.json())

app.use('/auth', authRoutes)   
app.use(shopRoutes)

const PORT = process.env.PORT || 4500

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}).catch(err => {
  console.error('Unable to connect to the database:', err)
})

