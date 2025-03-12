const express = require('express');
const app = express();

const products = [
    { Id: 1, Name: "Tapsilog", Price: 150 },
    { Id: 2, Name: "Hotsilog", Price: 110 },
    { Id: 3, Name: "Tocilog", Price: 100 }, 
    { Id: 4, Name: "Porksilog", Price: 120 }
];

// ✅ Get All Products
app.get('/products', (req, res) => {
    res.json(products);
});

// ✅ Start Product Service
app.listen(5000, () => console.log("Product service running on port 5000"));
