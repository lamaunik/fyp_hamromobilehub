import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const COLOR_MAP = {
  "Phantom Black": "#1a1a1a",
  "Alpine White":  "#f8f9fa",
  "Titanium Gray": "#7d7d7d",
  "Cobalt Blue":   "#2a4d69",
  "Deep Purple":   "#4b3d8e",
  "Gold":          "#d4af37",
  "Silver":        "#c0c0c0",
  "Space Gray":    "#343d46",
  "Midnight":      "#191970",
  "Sky Blue":      "#87ceeb",
  "Black":         "#000000",
  "White":         "#ffffff",
  "Red":           "#ef4444",
  "Blue":          "#3b82f6",
  "Pink Gold":     "#e6b8af",
};

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const products = await Product.find({});
    console.log(`Processing ${products.length} products`);

    for (const p of products) {
      // Check if colors is an array of strings
      if (p.colors && p.colors.length > 0 && typeof p.colors[0] === 'string') {
        const newColors = p.colors.map(c => ({
          name: c,
          hex: COLOR_MAP[c] || "#e4e4e7"
        }));
        p.colors = newColors;
        await p.save();
        console.log(`Migrated colors for: ${p.name}`);
      }
    }

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

migrate();
