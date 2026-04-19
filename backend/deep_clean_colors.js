import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const deepCleanColors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const products = await Product.find({});
    
    const colorOptions = {
      'Smartphones': [{name:'Phantom Black', hex:'#1a1a1a'}, {name:'Alpine White', hex:'#f8f9fa'}, {name:'Titanium Gray', hex:'#7d7d7d'}],
      'Laptops': [{name:'Space Gray', hex:'#343d46'}, {name:'Silver', hex:'#c0c0c0'}, {name:'Midnight', hex:'#191970'}],
      'Wearables': [{name:'Graphite', hex:'#383838'}, {name:'White', hex:'#ffffff'}, {name:'Bora Purple', hex:'#b2a4d4'}],
      'Accessories': [{name:'Black', hex:'#000000'}, {name:'White', hex:'#ffffff'}]
    };

    for (const p of products) {
      // Completely reset colors to ensure no corrupted data
      p.colors = [];
      p.colors = colorOptions[p.category] || colorOptions['Accessories'];
      await p.save();
      console.log(`✅ Deep Cleaned: ${p.name} (${p.category})`);
    }

    console.log('Database synchronization complete. All products now have rich color data.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

deepCleanColors();
