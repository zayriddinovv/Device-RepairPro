require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const adminData = {
  name: 'Admin',
  email: 'admin@devicerepair.com',
  phone: '+998901234567',
  password: 'Admin123!',
  role: 'admin'
};

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB ga ulandi');

    const existing = await User.findOne({ email: adminData.email });
    if (existing) {
      console.log('Admin allaqachon mavjud!');
      process.exit(0);
    }

    const user = new User(adminData);
    await user.save();
    console.log('✅ Admin muvaffaqiyatli yaratildi!');
    console.log('Email   :', adminData.email);
    console.log('Parol   :', 'Admin123!');
  } catch (err) {
    console.error('Xato:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin();
