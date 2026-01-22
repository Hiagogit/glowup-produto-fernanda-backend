import { Router } from 'express';
import { paymentController } from '../controllers/payment.controller';

const router = Router();

/**
 * POST /api/payments
 * Cria uma nova transação de pagamento PIX
 */
router.post('/', (req, res) => paymentController.createPayment(req, res));

/**
 * GET /api/payments/:transactionId/status
 * Consulta o status de um pagamento
 */
router.get('/:transactionId/status', (req, res) => paymentController.getPaymentStatus(req, res));

/**
 * POST /api/payments/webhook
 * Webhook para receber confirmação de pagamento da Klivo
 */
router.post('/webhook', (req, res) => paymentController.webhook(req, res));

/**
 * GET /api/payments/list
 * Lista todos os pagamentos (admin)
 */
router.get('/list', (req, res) => paymentController.listPayments(req, res));

export default router;
