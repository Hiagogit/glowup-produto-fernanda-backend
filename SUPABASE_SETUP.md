# 🔧 Configuração do Supabase - Passo a Passo

## Problema Identificado
A página de relatório não consegue acessar os dados do banco porque o **Row Level Security (RLS)** está ativado mas não há políticas de acesso configuradas.

## ✅ Solução: Configurar Políticas de Acesso

### Passo 1: Acessar o Supabase Dashboard
1. Acesse: https://supabase.com/dashboard
2. Faça login com sua conta
3. Selecione o projeto: **nmrqbogsosnsvxjwtuxn**

### Passo 2: Abrir o SQL Editor
1. No menu lateral esquerdo, clique em **SQL Editor**
2. Clique em **New Query** (+ Nova Consulta)

### Passo 3: Executar o Script de Configuração
1. Abra o arquivo `supabase-setup.sql` (está na pasta mapadoglowup-backend)
2. **Copie TODO o conteúdo** do arquivo
3. **Cole** no SQL Editor do Supabase
4. Clique em **Run** (ou pressione Ctrl+Enter / Cmd+Enter)

### Passo 4: Verificar a Configuração
Após executar o script, você deve ver no resultado:

```
3 policies created successfully:
- Allow public read access by slug
- Allow service role to insert
- Allow service role to update
```

## 🎯 O que esse script faz?

1. ✅ **Cria a tabela `reports`** (se não existir)
2. ✅ **Cria índice no campo `slug`** para buscas rápidas
3. ✅ **Ativa o Row Level Security** (RLS)
4. ✅ **Cria política de LEITURA pública** - permite que qualquer pessoa leia relatórios pelo slug
5. ✅ **Cria política de INSERÇÃO** - apenas o backend (service role) pode criar relatórios
6. ✅ **Cria política de ATUALIZAÇÃO** - apenas o backend pode atualizar relatórios
7. ✅ **Cria trigger** para atualizar automaticamente o campo `updated_at`

## 🔒 Segurança

- ✅ **Leitura**: Qualquer pessoa pode ler relatórios (necessário para funcionar)
- ✅ **Escrita**: Apenas o backend com service_role pode criar/atualizar relatórios
- ✅ **Sem autenticação**: Não é necessário login para ver relatórios (by design)

## 🧪 Testar

Após executar o SQL:

1. **Reinicie a página** do relatório no navegador (F5)
2. Ou acesse: http://localhost:8082/relatorio/hiagonovo-1769015226606
3. O relatório deve carregar sem erro!

## ❌ Se ainda não funcionar

1. Verifique se o SQL foi executado sem erros
2. Verifique se as 3 políticas foram criadas:
   - No Supabase Dashboard → Authentication → Policies → Tabela "reports"
3. Verifique os logs do console do navegador (F12)

## 📝 Notas Importantes

- **NÃO remova o RLS** - ele é importante para segurança
- As políticas permitem acesso público APENAS para LEITURA
- CREATE/UPDATE só funcionam com a Service Role Key (usada pelo backend)
- A coluna `slug` é única - garante que cada relatório tenha um link único

---

**Próximo passo**: Depois de executar o SQL, teste o fluxo completo:
1. Preencha o formulário na página inicial
2. Aguarde a geração do relatório
3. Você será redirecionado para a página de sucesso com o link do relatório
4. Clique no link e visualize seu relatório completo! ✨
