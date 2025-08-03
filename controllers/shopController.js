const { Shop } = require('../models')

// สร้างร้านค้าใหม่
exports.createShop = async (req, res) => {
  try {
    const { name, address } = req.body
    if (!name || !address) {
      return res.status(400).json({ message: 'กรุณากรอก name และ address' })
    }
    const newShop = await Shop.create({ name, address })
    res.status(201).json({ message: 'เพิ่มร้านค้าสำเร็จ', shop: newShop })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// อ่านร้านค้าทั้งหมด หรือค้นหาด้วยชื่อ (query param ?name=)
exports.getShops = async (req, res) => {
  try {
    const { name } = req.query
    let shops
    if (name) {
      shops = await Shop.findAll({ where: { name } })
    } else {
      shops = await Shop.findAll({ order: [['id', 'ASC']] })  // เรียง id ด้วย
    }
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
