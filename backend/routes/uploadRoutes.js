import path from 'path';
import express from 'express';
import multer from 'multer';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname  = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) return cb(null, true);
  cb(new Error('Images only!'));
}

const upload = multer({ storage, fileFilter: (req, file, cb) => checkFileType(file, cb) });

// Vendor/Admin product image upload
router.post('/', protect, restrictTo('vendor', 'admin'), upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
  const fileUrl = `/${req.file.path.replace(/\\/g, '/')}`;
  res.json({ success: true, data: fileUrl, message: 'Image Uploaded' });
});

// Any logged-in user can upload image for used product listings
router.post('/used', protect, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
  const fileUrl = `/${req.file.path.replace(/\\/g, '/')}`;
  res.json({ success: true, data: fileUrl, message: 'Image Uploaded' });
});

export default router;