const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON requests

const users = []; // Temporary storage

// ✅ Register User Route
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ username, password: hashedPassword });
    res.json({ message: "User registered successfully!" });
});

// ✅ Login Route (Should Generate Token)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log("Login Attempt:", username, password); // Debugging

    const user = users.find(u => u.username === username);
    console.log("User Found:", user); // Debugging

    if (!user) {
        console.log("User not found");
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    console.log("Password Match:", passwordMatch); // Debugging

    if (!passwordMatch) {
        console.log("Password incorrect");
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });
    console.log("Token Generated:", token); // Debugging

    res.json({ token });
});


// ✅ Protected Route (Requires Token)
app.get('/api/protected', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ message: "No token provided" });

    jwt.verify(token.split(' ')[1], 'secret_key', (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        res.json({ message: "Welcome to the protected route!", user: decoded });
    });
});

// ✅ Start Server
app.listen(3000, () => console.log("Server running on port 3000"));
