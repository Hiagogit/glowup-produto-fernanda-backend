-- SQL Setup for Supabase
-- Execute this in your Supabase SQL Editor

-- 1. Create reports table (if not exists)
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  primeiro_nome TEXT NOT NULL,
  sobrenome TEXT,
  email TEXT,
  signo TEXT NOT NULL,
  idade INTEGER NOT NULL,
  ano_pessoal INTEGER NOT NULL,
  data_nascimento DATE NOT NULL,
  arcano_pessoal_nome TEXT NOT NULL,
  arcano_2026_nome TEXT NOT NULL,
  portal_mes TEXT,
  relatorio_completo_html TEXT,
  amostra_html TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_reports_slug ON reports(slug);

-- 3. Enable Row Level Security
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies (if any)
DROP POLICY IF EXISTS "Allow public read access by slug" ON reports;
DROP POLICY IF EXISTS "Allow backend insert with service role" ON reports;
DROP POLICY IF EXISTS "Allow backend update with service role" ON reports;

-- 5. Create policy for PUBLIC READ access by slug
-- This allows anyone to read reports if they have the slug
CREATE POLICY "Allow public read access by slug"
  ON reports
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 6. Create policy for INSERT (only service role can insert)
CREATE POLICY "Allow service role to insert"
  ON reports
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- 7. Create policy for UPDATE (only service role can update)
CREATE POLICY "Allow service role to update"
  ON reports
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 8. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 9. Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_reports_updated_at ON reports;
CREATE TRIGGER update_reports_updated_at
    BEFORE UPDATE ON reports
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Verify setup
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'reports';
