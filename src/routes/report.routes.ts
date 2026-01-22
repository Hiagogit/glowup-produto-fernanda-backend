import { Router } from 'express';
import { reportController } from '../controllers/report.controller';
import { optionalAuth } from '../middleware/auth.middleware';

const router = Router();

// Rota pública para gerar relatório (com auth opcional)
router.post('/generate', optionalAuth, reportController.generateReport.bind(reportController));

// Rota pública para buscar relatório por slug
router.get('/:slug', reportController.getReportBySlug.bind(reportController));

// Rota protegida para listar relatórios do usuário
// router.get('/', authenticateToken, reportController.listUserReports.bind(reportController));

export default router;
