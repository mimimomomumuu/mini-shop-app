const express = require('express')
const router = express.Router()
const shopController = require('../controllers/shopController')
const authMiddleware = require('../middlewares/authMiddleware')

// สร้างร้านค้า - ต้องมี token
router.post('/shops', authMiddleware, shopController.createShop)

// อ่านร้านค้า (ทั้งหมดหรือค้นหาด้วยชื่อ) - ไม่ต้องใช้ token
router.get('/shops', shopController.getShops)

// อัปเดตร้านค้า - ต้องมี token
router.put('/shops/:id', authMiddleware, shopController.updateShop)

// ลบร้านค้า - ต้องมี token
router.delete('/shops/:id', authMiddleware, shopController.deleteShop)

module.exports = router

