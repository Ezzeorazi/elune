-- Run this in your Supabase SQL editor
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS price numeric DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS includes text[] DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS options jsonb DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS artisanal_note text DEFAULT NULL;
