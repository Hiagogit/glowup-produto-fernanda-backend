import dotenv from 'dotenv';
import app from './app';

// Carrega variáveis de ambiente
dotenv.config();

const PORT = process.env.PORT || 3001;

// Inicia o servidor apenas se não estiver rodando em ambiente serverless
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`
  ╔═══════════════════════════════════════════════════════════╗
  ║                                                           ║
  ║   🚀 Servidor rodando na porta ${PORT}                     ║
  ║                                                           ║
  ║   📍 API: http://localhost:${PORT}/api                     ║
  ║   🏥 Health Check: http://localhost:${PORT}/api/health     ║
  ║                                                           ║
  ║   Ambiente: ${process.env.NODE_ENV || 'development'}                                   ║
  ║                                                           ║
  ╚═══════════════════════════════════════════════════════════╝
    `);
  });

  // Tratamento de erros não capturados
  process.on('unhandledRejection', (reason: any) => {
    console.error('Unhandled Rejection:', reason);
  });

  process.on('uncaughtException', (error: Error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
  });
}
