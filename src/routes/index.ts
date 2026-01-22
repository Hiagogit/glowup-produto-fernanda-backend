import { Router } from 'express';
import authRoutes from './auth.routes';
import reportRoutes from './report.routes';

const router = Router();

// Rotas de autenticação
router.use('/auth', authRoutes);

// Rotas de relatórios
router.use('/reports', reportRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    message: 'API está funcionando!',
    timestamp: new Date().toISOString(),
  });
});

export default router;
