require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

console.log("Connecting to:", process.env.MONGODB_URI);

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Root route for Render and health checks
app.get('/', (req, res) => {
    res.send('XpenseEase API is running 🚀');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Register User
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('📩 Received registration:', req.body);

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        console.error('❌ Registration Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login User
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('🔐 Login Attempt:', email);

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('❌ No user found');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            console.log('❌ Password does not match');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('✅ Login successful');
        res.status(200).json({ token });

    } catch (error) {
        console.error('🔥 Error in login route:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Serve static files if needed
app.use(express.static('public'));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
