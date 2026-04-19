import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const updateAllProductsWithColors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const products = await Product.find({});
    console.log(`Checking ${products.length} products`);

    const colorPicks = {
      'Smartphones': [
        { name: 'Phantom Black', hex: '#1a1a1a' },
        { name: 'Alpine White', hex: '#f8f9fa' },
        { name: 'Titanium Gray', hex: '#7d7d7d' }
      ],
      'Laptops': [
        { name: 'Space Gray', hex: '#343d46' },
        { name: 'Silver', hex: '#c0c0c0' },
        { name: 'Midnight', hex: '#191970' }
      ],
      'Tablets': [
        { name: 'Sky Blue', hex: '#87ceeb' },
        { name: 'Silver', hex: '#c0c0c0' }
      ],
      'Wearables': [
        { name: 'Graphite', hex: '#383838' },
        { name: 'White', hex: '#ffffff' },
        { name: 'Bora Purple', hex: '#b2a4d4' }
      ],
      'Accessories': [
        { name: 'Black', hex: '#000000' },
        { name: 'White', hex: '#ffffff' }
      ]
    };

    for (const p of products) {
      if (!p.colors || p.colors.length === 0) {
        p.colors = colorPicks[p.category] || colorPicks['Accessories'];
        await p.save();
        console.log(`✅ Fixed colors for: ${p.name}`);
      }
    }

    console.log('All products now have selectable color options.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateAllProductsWithColors();
