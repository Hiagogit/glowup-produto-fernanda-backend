import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import routes from './routes';

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração do CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:5173',
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:8082',
  'http://localhost:3000',
  'http://localhost:4173', // Vite preview
];

app.use(cors({
  origin: (origin, callback) => {
    // Permite requisições sem origin (como mobile apps, Postman, etc)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS bloqueou origem: ${origin}`);
      callback(null, true); // Temporariamente permite todas em dev
    }
  },
  credentials: true,
}));

// Middlewares de segurança
app.use(helmet());

// Rate limiting - previne ataques de força bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 1000, // limite de 1000 requisições por IP (aumentado para desenvolvimento)
  message: 'Muitas requisições deste IP, tente novamente mais tarde.',
});

app.use('/api/', limiter);

// Middlewares de parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger de requisições
app.use(morgan('dev'));

// Rotas
app.use('/api', routes);

// Rota raiz
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Mapa do Glow Up API',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

// Middleware de erro 404
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: `A rota ${req.method} ${req.path} não existe`,
  });
});

// Middleware global de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro não tratado:', err);
  
  res.status(500).json({
    error: 'Erro interno no servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Ocorreu um erro inesperado',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Inicia o servidor
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

export default app;
