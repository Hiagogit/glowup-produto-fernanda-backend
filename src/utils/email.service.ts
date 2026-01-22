import { resend } from '../config/resend';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

/**
 * Serviço de envio de emails usando Resend
 */
export class EmailService {
  private fromEmail: string;

  constructor() {
    this.fromEmail = process.env.FROM_EMAIL || 'noreply@yourdomain.com';
  }

  /**
   * Envia um email
   */
  async sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const { data, error } = await resend.emails.send({
        from: options.from || this.fromEmail,
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        html: options.html,
        reply_to: options.replyTo,
      });

      if (error) {
        console.error('Erro ao enviar email:', error);
        return { success: false, error: error.message };
      }

      return { success: true, messageId: data?.id };
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro desconhecido' 
      };
    }
  }

  /**
   * Envia email de boas-vindas
   */
  async sendWelcomeEmail(email: string, name: string): Promise<{ success: boolean; error?: string }> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 5px 5px; }
          .button { display: inline-block; padding: 12px 30px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Bem-vindo ao Mapa do Glow Up! 🎉</h1>
          </div>
          <div class="content">
            <p>Olá, <strong>${name}</strong>!</p>
            <p>Estamos muito felizes em ter você conosco! Sua conta foi criada com sucesso.</p>
            <p>Agora você pode começar a explorar todas as funcionalidades da plataforma.</p>
            <a href="${process.env.APP_URL || 'http://localhost:5173'}" class="button">Acessar a Plataforma</a>
            <p>Se você tiver alguma dúvida, não hesite em entrar em contato conosco.</p>
            <p>Atenciosamente,<br>Equipe Mapa do Glow Up</p>
          </div>
          <div class="footer">
            <p>Este é um email automático, por favor não responda.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return await this.sendEmail({
      to: email,
      subject: 'Bem-vindo ao Mapa do Glow Up! 🎉',
      html,
    });
  }

  /**
   * Envia email de redefinição de senha
   */
  async sendPasswordResetEmail(email: string, resetLink: string): Promise<{ success: boolean; error?: string }> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 5px 5px; }
          .button { display: inline-block; padding: 12px 30px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .warning { background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 12px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Redefinição de Senha 🔐</h1>
          </div>
          <div class="content">
            <p>Olá!</p>
            <p>Recebemos uma solicitação para redefinir a senha da sua conta.</p>
            <p>Clique no botão abaixo para criar uma nova senha:</p>
            <a href="${resetLink}" class="button">Redefinir Senha</a>
            <div class="warning">
              <strong>⚠️ Atenção:</strong> Este link expira em 1 hora por motivos de segurança.
            </div>
            <p>Se você não solicitou a redefinição de senha, pode ignorar este email com segurança.</p>
            <p>Atenciosamente,<br>Equipe Mapa do Glow Up</p>
          </div>
          <div class="footer">
            <p>Este é um email automático, por favor não responda.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return await this.sendEmail({
      to: email,
      subject: 'Redefinição de Senha - Mapa do Glow Up',
      html,
    });
  }

  /**
   * Envia email de confirmação de email
   */
  async sendEmailConfirmation(email: string, confirmationLink: string): Promise<{ success: boolean; error?: string }> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 5px 5px; }
          .button { display: inline-block; padding: 12px 30px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Confirme seu Email ✉️</h1>
          </div>
          <div class="content">
            <p>Olá!</p>
            <p>Obrigado por se registrar no Mapa do Glow Up!</p>
            <p>Para completar seu cadastro, confirme seu email clicando no botão abaixo:</p>
            <a href="${confirmationLink}" class="button">Confirmar Email</a>
            <p>Se você não criou esta conta, pode ignorar este email.</p>
            <p>Atenciosamente,<br>Equipe Mapa do Glow Up</p>
          </div>
          <div class="footer">
            <p>Este é um email automático, por favor não responda.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return await this.sendEmail({
      to: email,
      subject: 'Confirme seu Email - Mapa do Glow Up',
      html,
    });
  }
}

export const emailService = new EmailService();
