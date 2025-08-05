require('dotenv').config()
const { sequelize, Shop } = require('./models')

const shops = [
  { name: "Graph Cafe", address: "เชียงใหม่ เมืองเชียงใหม่" },
  { name: "Ristr8to Coffee", address: "เชียงใหม่ เมืองเชียงใหม่" },
  { name: "The Little Prince Café Bangkok", address: "กรุงเทพมหานคร เขตสาทร" },
  { name: "Ryoku Cafe", address: "กรุงเทพมหานคร เขตวัฒนา" },
  { name: "Harudot Chonburi by Nana Coffee Roaster", address: "ชลบุรี เมืองชลบุรี" },
  { name: "Carp cafe'sriracha", address: "ชลบุรี ศรีราชา" },
  { name: "Refill Coffee", address: "ขอนแก่น เมืองขอนแก่น" },
  { name: "Godfather Coffee - II Khonkaen", address: "ขอนแก่น เมืองขอนแก่น" },
  { name: "Campus Coffee Roaster", address: "ภูเก็ต เมืองภูเก็ต" },
  { name: "The Feelsion Cafe", address: "ภูเก็ต เมืองภูเก็ต" }
]

async function seed() {
  try {
    await sequelize.authenticate()
    for (const shop of shops) {
      // ใช้ findOrCreate กันข้อมูลซ้ำ
      await Shop.findOrCreate({ where: { name: shop.name, address: shop.address } })
    }
    console.log('Seed data added successfully.')
    process.exit()
  } catch (error) {
    console.error('Failed to seed data:', error)
    process.exit(1)
  }
}

seed()
