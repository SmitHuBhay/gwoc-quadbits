require('dotenv').config();
const mongoose = require('mongoose');//for schema of mongodb
const bcrypt = require('bcryptjs');//encryption
const Service = require('./models/Service');
const Admin = require('./models/Admin');
const Feedback = require('./models/Feedback');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('Seeding...');
    await Service.deleteMany({});
    await Admin.deleteMany({});
    await Feedback.deleteMany({});

    // Admin
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('admin123', salt);
    await Admin.create({ username: 'admin', password: hash });

    // Services
    await Service.insertMany([
        { title: 'Ice Plunge', price: 30, duration: '30 min', imageURL: 'https://images.unsplash.com/photo-1596464716127-f9a8f2275660?w=600', category: 'Ice Bath' },
        { title: 'Steam Detox', price: 45, duration: '45 min', imageURL: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600', category: 'Steam' },
        { title: 'Full Recovery Combo', price: 85, duration: '90 min', imageURL: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600', category: 'Combo' }
    ]);
    
    // Fake Feedback
    await Feedback.create({ name: "Sarah J.", message: "Best recovery in the city!", rating: 5 });

    console.log('Seeded! Admin: admin / admin123');
    process.exit();
});