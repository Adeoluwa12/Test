const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: "*"
}))


// Test data
const products = [
  {
    id: '1',
    name: 'Product 1',
    price: 6.99,
    description: 'Description of Product 1',
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.alamy.com%2Fglass-jug-of-milk-icon-in-outline-style-isolated-on-white-background-milk-product-and-sweet-symbol-vector-illustration-image214872756.html&psig=AOvVaw2YQaaKpwA9enJkXkwFWJnt&ust=1679225027957000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOj01PCu5f0CFQAAAAAdAAAAABAS',
  },
  {
    id: '2',
    name: 'Product 2',
    price: 10.77,
    description: 'Description of Product 2',
    image: 'https://www.shutterstock.com/search/apple',
  },
];

let cart = [
    
        { productId: 'AER397', quantity: 2 },
        { productId: 'JHM380', quantity: 1 },
        { productId: 'XBV154', quantity: 3 }
 ];

// endpoint for all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// endpoint to get current cart
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// endpoint to add a product to cart
app.post('/api/cart/:productId', (req, res) => {
  const productId = req.params.productId;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).send('Product not found');
  }

  const cartItem = cart.find((item) => item.productId === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }

  res.json(cart);
});

// endpoint to remove a product from cart
app.delete('/api/cart/:productId', (req, res) => {
  const productId = req.params.productId;
  const index = cart.findIndex((item) => item.productId === productId);

  if (index === -1) {
    return res.status(404).send('Product not found in cart');
  }

  cart.splice(index, 1);

  res.json(cart);
});

    


// Setting up the the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});












