const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'

// ตัวอย่าง user ที่กำหนดไว้เฉยๆ (จริงๆ ควรเช็คจาก DB)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
]

// ฟังก์ชัน login สร้าง token
exports.login = (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'กรุณากรอก username และ password' })
  }

  const user = users.find(u => u.username === username && u.password === password)

  if (!user) {
    return res.status(401).json({ message: 'username หรือ password ไม่ถูกต้อง' })
  }

  // สร้าง JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' })

  res.json({ token })
}
