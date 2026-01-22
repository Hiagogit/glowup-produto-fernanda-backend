import { Request, Response } from 'express';
import { supabase, supabaseAdmin } from '../config/supabase';
import { emailService } from '../utils/email.service';

/**
 * Controller para autenticação
 */
export class AuthController {
  /**
   * Registro de novo usuário
   */
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name, metadata } = req.body;

      // Validação básica
      if (!email || !password) {
        res.status(400).json({ 
          error: 'Dados incompletos',
          message: 'Email e senha são obrigatórios' 
        });
        return;
      }

      // Cria usuário no Supabase
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: false, // Requer confirmação de email
        user_metadata: {
          name,
          ...metadata,
        },
      });

      if (error) {
        res.status(400).json({ 
          error: 'Erro ao criar usuário',
          message: error.message 
        });
        return;
      }

      // Envia email de boas-vindas (opcional, pode enviar email de confirmação)
      if (name) {
        await emailService.sendWelcomeEmail(email, name);
      }

      res.status(201).json({
        message: 'Usuário criado com sucesso! Verifique seu email para confirmar.',
        user: {
          id: data.user.id,
          email: data.user.email,
        },
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      res.status(500).json({ 
        error: 'Erro interno no servidor',
        message: 'Ocorreu um erro ao processar o registro' 
      });
    }
  }

  /**
   * Login de usuário
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ 
          error: 'Dados incompletos',
          message: 'Email e senha são obrigatórios' 
        });
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        res.status(401).json({ 
          error: 'Credenciais inválidas',
          message: error.message 
        });
        return;
      }

      res.status(200).json({
        message: 'Login realizado com sucesso',
        session: data.session,
        user: {
          id: data.user.id,
          email: data.user.email,
          metadata: data.user.user_metadata,
        },
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ 
        error: 'Erro interno no servidor',
        message: 'Ocorreu um erro ao processar o login' 
      });
    }
  }

  /**
   * Logout do usuário
   */
  async logout(req: Request, res: Response): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      if (token) {
        await supabase.auth.admin.signOut(token);
      }

      res.status(200).json({
        message: 'Logout realizado com sucesso',
      });
    } catch (error) {
      console.error('Erro no logout:', error);
      res.status(500).json({ 
        error: 'Erro interno no servidor',
        message: 'Ocorreu um erro ao processar o logout' 
      });
    }
  }

  /**
   * Solicita redefinição de senha
   */
  async requestPasswordReset(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ 
          error: 'Email não fornecido',
          message: 'O email é obrigatório' 
        });
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.APP_URL || 'http://localhost:5173'}/reset-password`,
      });

      if (error) {
        res.status(400).json({ 
          error: 'Erro ao solicitar redefinição',
          message: error.message 
        });
        return;
      }

      res.status(200).json({
        message: 'Email de redefinição enviado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao solicitar redefinição de senha:', error);
      res.status(500).json({ 
        error: 'Erro interno no servidor',
        message: 'Ocorreu um erro ao processar a solicitação' 
      });
    }
  }

  /**
   * Atualiza a senha do usuário
   */
  async updatePassword(req: Request, res: Response): Promise<void> {
    try {
      const { password } = req.body;
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      if (!password) {
        res.status(400).json({ 
          error: 'Senha não fornecida',
          message: 'A nova senha é obrigatória' 
        });
        return;
      }

      if (!token) {
        res.status(401).json({ 
          error: 'Token não fornecido',
          message: 'É necessário estar autenticado' 
        });
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        res.status(400).json({ 
          error: 'Erro ao atualizar senha',
          message: error.message 
        });
        return;
      }

      res.status(200).json({
        message: 'Senha atualizada com sucesso',
      });
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      res.status(500).json({ 
        error: 'Erro interno no servidor',
        message: 'Ocorreu um erro ao atualizar a senha' 
      });
    }
  }

  /**
   * Obtém informações do usuário autenticado
   */
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ 
          error: 'Não autenticado',
          message: 'É necessário estar autenticado' 
        });
        return;
      }

      res.status(200).json({
        user: req.user,
      });
    } catch (error) {
      console.error('Erro ao obter perfil:', error);
      res.status(500).json({ 
        error: 'Erro interno no servidor',
        message: 'Ocorreu um erro ao obter o perfil' 
      });
    }
  }

  /**
   * Atualiza informações do usuário
   */
  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ 
          error: 'Não autenticado',
          message: 'É necessário estar autenticado' 
        });
        return;
      }

      const { name, metadata } = req.body;

      const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
        req.user.id,
        {
          user_metadata: {
            name,
            ...metadata,
          },
        }
      );

      if (error) {
        res.status(400).json({ 
          error: 'Erro ao atualizar perfil',
          message: error.message 
        });
        return;
      }

      res.status(200).json({
        message: 'Perfil atualizado com sucesso',
        user: {
          id: data.user.id,
          email: data.user.email,
          metadata: data.user.user_metadata,
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      res.status(500).json({ 
        error: 'Erro interno no servidor',
        message: 'Ocorreu um erro ao atualizar o perfil' 
      });
    }
  }
}

export const authController = new AuthController();
