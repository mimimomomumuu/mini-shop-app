const { Shop } = require('../models')
const { Op } = require('sequelize')


// สร้างร้านค้าใหม่ (รับได้ทั้งแบบรายการเดียว และหลายรายการ)
exports.createShop = async (req, res) => {
  try {
    const data = req.body

    if (Array.isArray(data)) {
      // ถ้าเป็น array → เพิ่มหลายร้าน
      const validShops = data.filter(shop => shop.name && shop.address)

      if (validShops.length === 0) {
        return res.status(400).json({ message: 'ไม่มีข้อมูลร้านค้าที่ถูกต้อง' })
      }

      const createdShops = await Shop.bulkCreate(validShops)
      return res.status(201).json({
        message: `เพิ่มร้านค้าสำเร็จ ${createdShops.length} รายการ`,
        shops: createdShops
      })
    }

    // ถ้าเป็นแค่ 1 รายการ
    const { name, address } = data
    if (!name || !address) {
      return res.status(400).json({ message: 'กรุณากรอก name และ address' })
    }

    const newShop = await Shop.create({ name, address })
    res.status(201).json({ message: 'เพิ่มร้านค้าสำเร็จ', shop: newShop })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// อ่านร้านค้าทั้งหมด หรือค้นหาได้ทั้ง ชื่อ (name), ที่อยู่ (address), หรือ ทั้งสองอย่างพร้อมกัน
exports.getShops = async (req, res) => {
  try {
    const { name, address } = req.query

    let whereClause = {}

    if (name && address) {
      whereClause = {
        name: { [Op.iLike]: `%${name}%` },
        address: { [Op.iLike]: `%${address}%` }
      }
    } else if (name) {
      whereClause = {
        name: { [Op.iLike]: `%${name}%` }
      }
    } else if (address) {
      whereClause = {
        address: { [Op.iLike]: `%${address}%` }
      }
    }

    const shops = await Shop.findAll({
      where: whereClause,
      order: [['id', 'ASC']]
    })

    res.json(shops)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// อัปเดตร้านค้าตาม id
exports.updateShop = async (req, res) => {
  try {
    const { id } = req.params
    const { name, address } = req.body

    const shop = await Shop.findByPk(id)
    if (!shop) {
      return res.status(404).json({ message: 'ไม่พบร้านค้านี้' })
    }

    if (!name || !address) {
      return res.status(400).json({ message: 'กรุณากรอก name และ address' })
    }

    shop.name = name
    shop.address = address
    await shop.save()

    res.json({ message: 'แก้ไขร้านค้าสำเร็จ', shop })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ลบร้านค้าตาม id
exports.deleteShop = async (req, res) => {
  try {
    const { id } = req.params

    const shop = await Shop.findByPk(id)
    if (!shop) {
      return res.status(404).json({ message: 'ไม่พบร้านค้านี้' })
    }

    await shop.destroy()
    res.json({ message: 'ลบร้านค้าสำเร็จ' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
