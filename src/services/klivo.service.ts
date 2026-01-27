import axios from 'axios';

const KLIVO_API_URL = 'https://api.klivopay.com.br';
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
  tracking?: {
    src?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
  };
}

interface KlivoTransactionResponse {
  id: number;
  hash: string;
  token: string;
  event: string;
  payment_status: 'processing' | 'authorized' | 'paid' | 'refunded' | 'waiting_payment' | 'refused' | 'antifraud' | 'chargedback' | 'failed';
  payment_method: 'credit_card' | 'billet' | 'pix';
  amount: number;
  amount_total: number;
  amount_liquid: number;
  url?: string;
  pix?: {
    pix_url: string | null;
    pix_qr_code: string | null;
    qr_code_base64: string | null;
  };
  billet?: {
    url: string | null;
    barcode: string;
    expires_at: string | null;
  };
  customer: any;
  offer: any;
  product: any;
  items: any[];
  created_at: string;
  updated_at: string;
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
   * Cria um produto na Klivo
   */
  async createProduct(title: string, amount: number): Promise<string> {
    try {
      console.log('📦 Criando produto na Klivo:', title);
      
      const response = await this.api.post('/api/public/v1/products', {
        title: title,
        cover: 'https://via.placeholder.com/450x300?text=Mapa+Glow+Up',
        sale_page: 'https://jovemmistica.com',
        payment_type: 1,
        product_type: 'digital',
        delivery_type: 1,
        id_category: 1,
        amount: amount,
      });

      const productHash = response.data.hash || response.data.product_hash || response.data.id;
      console.log('✅ Produto criado com hash:', productHash);
      return productHash;
    } catch (error: any) {
      console.error('❌ Erro ao criar produto:', error.response?.data || error.message);
      throw new Error(`Erro ao criar produto: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Cria uma oferta na Klivo
   */
  async createOffer(productHash: string, title: string, amount: number): Promise<string> {
    try {
      console.log('🎁 Criando oferta na Klivo para produto:', productHash);
      
      const response = await this.api.post(`/api/public/v1/products/${productHash}/offers`, {
        title: title,
        cover: 'https://via.placeholder.com/450x300?text=Mapa+Glow+Up',
        price: amount, // API pede "price" não "amount"
      });

      const offerHash = response.data.hash || response.data.offer_hash || response.data.id;
      console.log('✅ Oferta criada com hash:', offerHash);
      return offerHash;
    } catch (error: any) {
      console.error('❌ Erro ao criar oferta:', error.response?.data || error.message);
      throw new Error(`Erro ao criar oferta: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Cria uma nova transação PIX
   */
  async createTransaction(payload: CreateTransactionPayload): Promise<KlivoTransactionResponse> {
    try {
      console.log('🔄 Criando transação na Klivo Pay...');
      console.log('💰 Valor:', payload.amount / 100, 'R$');
      
      // Usando produto e oferta FIXOS
      const PRODUCT_HASH = '1vuddx4es3';
      const OFFER_HASH = 'ad70imkfyt';
      
      const requestBody: Record<string, any> = {
        amount: payload.amount,
        offer_hash: OFFER_HASH,
        payment_method: 'pix',
        installments: 1,
        customer: {
          name: payload.customer.name,
          email: payload.customer.email,
          phone_number: '11987654321', // Telefone válido
          document: '08080306125', // CPF válido para teste
        },
        cart: [
          {
            product_hash: PRODUCT_HASH,
            title: payload.description,
            price: payload.amount,
            quantity: 1,
            operation_type: 1,
            tangible: false,
          }
        ],
      };

      if (payload.tracking) {
        requestBody.tracking = payload.tracking;
      }
      
      console.log('📤 Request body:', JSON.stringify(requestBody, null, 2));
      
      const response = await this.api.post('/api/public/v1/transactions', requestBody);

      console.log('✅ Transação criada!');
      console.log('📦 Hash:', response.data.hash);
      console.log('📦 Status:', response.data.payment_status);
      
      return response.data;
    } catch (error: any) {
      console.error('❌ Erro ao criar transação:', error.response?.data || error.message);
      throw new Error(`Erro ao criar transação: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Consulta o status de uma transação
   */
  async getTransaction(transactionId: string): Promise<KlivoTransactionResponse> {
    try {
      const response = await this.api.get(`/api/public/v1/transactions/${transactionId}`);
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
      await this.api.post(`/api/public/v1/transactions/${transactionId}/cancel`);
      console.log('✅ Transação cancelada com sucesso');
    } catch (error: any) {
      console.error('❌ Erro ao cancelar transação:', error.response?.data || error.message);
      throw new Error(`Erro ao cancelar transação: ${error.response?.data?.message || error.message}`);
    }
  }
}

export const klivoService = new KlivoService();
