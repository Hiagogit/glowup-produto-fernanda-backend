import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';

// Estende o tipo Request do Express para incluir o usuário
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        role?: string;
        [key: string]: any;
      };
    }
  }
}

/**
 * Middleware de autenticação obrigatória
 * Verifica o token no header Authorization: Bearer <token>
 */
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Pega o token do header Authorization
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ 
        error: 'Token não fornecido',
        message: 'É necessário estar autenticado para acessar este recurso'
      });
      return;
    }

    // Verifica o token usando o Supabase Admin
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      res.status(401).json({ 
        error: 'Token inválido ou expirado',
        message: 'Por favor, faça login novamente'
      });
      return;
    }

    // Adiciona o usuário à requisição para uso posterior
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      ...user.user_metadata,
    };

    next();
  } catch (error) {
    console.error('Erro no middleware de autenticação:', error);
    res.status(500).json({ 
      error: 'Erro interno no servidor',
      message: 'Ocorreu um erro ao processar a autenticação'
    });
  }
};

/**
 * Middleware de autenticação opcional
 * Adiciona o usuário à requisição se houver token válido, mas não bloqueia a requisição
 */
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const { data: { user } } = await supabaseAdmin.auth.getUser(token);
      
      if (user) {
        req.user = {
          id: user.id,
          email: user.email,
          role: user.role,
          ...user.user_metadata,
        };
      }
    }

    next();
  } catch (error) {
    // Continua mesmo se houver erro
    console.error('Erro no middleware de autenticação opcional:', error);
    next();
  }
};

/**
 * Middleware para verificar se o usuário tem uma role específica
 * Deve ser usado após o authenticateToken
 */
export const requireRole = (allowedRoles: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ 
        error: 'Não autenticado',
        message: 'É necessário estar autenticado'
      });
      return;
    }

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    const userRole = req.user.role || 'user';

    if (!roles.includes(userRole)) {
      res.status(403).json({ 
        error: 'Acesso negado',
        message: 'Você não tem permissão para acessar este recurso'
      });
      return;
    }

    next();
  };
};
