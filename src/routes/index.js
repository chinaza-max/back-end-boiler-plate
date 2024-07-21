import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    status: 200,
    message: "Welcome to the API",
    data: {
      service: "API Service",
      version: "1.0.0",
    },
  });
});

import usersRoutes from './users.routes.js';
router.use('/users', usersRoutes);import authRoutes from './auth.routes.js';
router.use('/auth', authRoutes);import adminRoutes from './admin.routes.js';
router.use('/admin', adminRoutes);

export default router;