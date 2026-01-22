import axios from 'axios';

const KLIVO_API_URL = 'https://api.klivopay.com.br/public';
const KLIVO_API_TOKEN = process.env.KLIVO_API_TOKEN || 'qIA6MaRT2FyLJxF1aISCWzGqkhkcq3CB5sdLSDT8LfNABx0bzTBHNAgvLXFH';

interface CreateTransactionPayload {
  amount: number;
  description: string;
  customer: {
    name: string;
    email: string;
    cpf?: string;
  };
  metadata?: Record<string, any>;
}

interface KlivoTransactionResponse {
  id: string;
  token: string;
  status: 'processing' | 'authorized' | 'paid' | 'refunded' | 'waiting_payment' | 'refused' | 'antifraud' | 'chargedback';
  method: 'credit_card' | 'billet' | 'pix';
  amount: number; // em centavos
  url: string;
  pix?: {
    code: string;
    url: string;
    expires_at: string | null;
  };
  billet?: {
    url: string | null;
    barcode: string;
    expires_at: string | null;
  };
  created_at: string;
  paid_at?: string;
}

export class KlivoService {
  private api = axios.create({
    baseURL: KLIVO_API_URL,
    params: {
      api_token: KLIVO_API_TOKEN,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * Cria uma nova transação PIX
   */
  async createTransaction(payload: CreateTransactionPayload): Promise<KlivoTransactionResponse> {
    try {
      console.log('🔄 Criando transação na Klivo Pay...');
      
      const response = await this.api.post('/transactions', {
        amount: payload.amount,
        description: payload.description,
        customer: payload.customer,
        payment_method: 'pix',
        metadata: payload.metadata,
      });

      console.log('✅ Transação criada com sucesso:', response.data.id);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erro ao criar transação na Klivo Pay:', error.response?.data || error.message);
      throw new Error(`Erro ao criar transação: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Consulta o status de uma transação
   */
  async getTransaction(transactionId: string): Promise<KlivoTransactionResponse> {
    try {
      const response = await this.api.get(`/transactions/${transactionId}`);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erro ao consultar transação:', error.response?.data || error.message);
      throw new Error(`Erro ao consultar transação: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Verifica se uma transação foi paga
   */
  async isTransactionPaid(transactionId: string): Promise<boolean> {
    try {
      const transaction = await this.getTransaction(transactionId);
      return transaction.status === 'paid';
    } catch (error) {
      return false;
    }
  }

  /**
   * Cancela uma transação
   */
  async cancelTransaction(transactionId: string): Promise<void> {
    try {
      await this.api.post(`/transactions/${transactionId}/cancel`);
      console.log('✅ Transação cancelada com sucesso');
    } catch (error: any) {
      console.error('❌ Erro ao cancelar transação:', error.response?.data || error.message);
      throw new Error(`Erro ao cancelar transação: ${error.response?.data?.message || error.message}`);
    }
  }
}

export const klivoService = new KlivoService();
