import path from 'path';
import fs   from 'fs';
import express from 'express';
import multer  from 'multer';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ensure upload folders exist
['uploads', 'uploads/products', 'uploads/profiles', 'uploads/used'].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ── Shared multer helpers ─────────────────────────────────────────────────────
const makeStorage = (folder) => multer.diskStorage({
  destination: (req, file, cb) => cb(null, folder),
  filename:    (req, file, cb) => {
    const ext  = path.extname(file.originalname).toLowerCase();
    const name = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, name);
  },
});

function checkFileType(file, cb) {
  const ok = /jpg|jpeg|png|webp|gif/.test(path.extname(file.originalname).toLowerCase())
          && /image/.test(file.mimetype);
  ok ? cb(null, true) : cb(new Error('Images only (jpg, jpeg, png, webp, gif)'));
}

const makeUpload = (folder) => multer({
  storage:    makeStorage(folder),
  fileFilter: (req, file, cb) => checkFileType(file, cb),
  limits:     { fileSize: 5 * 1024 * 1024 },   // 5 MB
});

// Build full metadata object from multer file
const buildMeta = (file) => ({
  url:          `/${file.path.replace(/\\/g, '/')}`,
  originalName: file.originalname,
  mimetype:     file.mimetype,
  size:         file.size,
  uploadedAt:   new Date(),
});

const respond = (res, file) => {
  const meta = buildMeta(file);
  res.json({ success: true, message: 'Image uploaded', data: meta.url, image: meta });
};

// ── 1. Vendor / Admin — product images ────────────────────────────────────────
router.post('/', protect, restrictTo('vendor', 'admin'),
  makeUpload('uploads/products').single('image'),
  (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    respond(res, req.file);
  }
);

// ── 2. Any logged-in user — profile picture ───────────────────────────────────
router.post('/profile', protect,
  makeUpload('uploads/profiles').single('image'),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const meta = buildMeta(req.file);

    // Auto-save the new profilePicture URL to the user's record immediately
    try {
      const User = (await import('../models/User.js')).default;
      await User.findByIdAndUpdate(req.user._id, { profilePicture: meta.url });
    } catch (err) {
      console.error('Failed to auto-save profile picture:', err.message);
    }

    respond(res, req.file);
  }
);

// ── 3. Any logged-in user — used product images ───────────────────────────────
router.post('/used', protect,
  makeUpload('uploads/used').single('image'),
  (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    respond(res, req.file);
  }
);

export default router;