require('dotenv').config()
const express = require('express')
const app = express()
const { sequelize } = require('./models')
const shopRoutes = require('./routes/shopRoutes')
const authRoutes = require('./routes/authRoutes')  

app.use(express.json())

app.use('/auth', authRoutes)   
app.use(shopRoutes)

app.get('/', (req, res) => {
  res.send(`
    <h2>Express</h2>
    <p>Welcome to Express</p>
    <ul>
      <li><strong>POST</strong> /auth/login - Login with username & password</li>
      <li><strong>POST</strong> /shops - Create a new shop <em>(Authorization required)</em></li>
      <li><strong>GET</strong> /shops - Get all shops</li>
      <li><strong>GET</strong> /shops?name=Graph Cafe - Get shop by name</li>
      <li><strong>PUT</strong> /shops/:id - Update shop <em>(Authorization required)</em></li>
      <li><strong>DELETE</strong> /shops/:id - Delete shop <em>(Authorization required)</em></li>
    </ul>
    <p>Use Authorization header: Bearer &lt;your_token&gt;</p>
  `);
});


const PORT = process.env.PORT || 4500

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}).catch(err => {
  console.error('Unable to connect to the database:', err)
})

