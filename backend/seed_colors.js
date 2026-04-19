import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const updateProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const products = await Product.find({});
    console.log(`Found ${products.length} products`);

    for (const p of products) {
      if (!p.colors || p.colors.length === 0) {
        let colors = [];
        if (p.category === 'Smartphones') {
          colors = ['Phantom Black', 'Alpine White', 'Titanium Gray'];
        } else if (p.category === 'Laptops') {
          colors = ['Space Gray', 'Silver', 'Midnight'];
        } else if (p.category === 'Tablets') {
          colors = ['Sky Blue', 'Silver', 'Space Gray'];
        } else {
          colors = ['Black', 'White'];
        }
        p.colors = colors;
        await p.save();
        console.log(`Updated ${p.name} with default colors`);
      }
    }

    console.log('All products updated successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateProducts();
