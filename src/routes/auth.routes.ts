import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { body } from 'express-validator';

const router = Router();

// Validações
const registerValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
  body('name').optional().isString().withMessage('Nome deve ser uma string'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória'),
];

const resetPasswordValidation = [
  body('email').isEmail().withMessage('Email inválido'),
];

const updatePasswordValidation = [
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
];

// Rotas públicas
router.post('/register', registerValidation, authController.register.bind(authController));
router.post('/login', loginValidation, authController.login.bind(authController));
router.post('/password-reset', resetPasswordValidation, authController.requestPasswordReset.bind(authController));

// Rotas protegidas (requerem autenticação)
router.post('/logout', authenticateToken, authController.logout.bind(authController));
router.put('/password', authenticateToken, updatePasswordValidation, authController.updatePassword.bind(authController));
router.get('/profile', authenticateToken, authController.getProfile.bind(authController));
router.put('/profile', authenticateToken, authController.updateProfile.bind(authController));

export default router;
