-- Migration: Add Advanced Recovery Metrics
-- Description: Add CNS fatigue, grip fatigue, isometric strain, side pressure, and training intensity to recovery_logs
-- Date: 2026-06-05

-- Add new columns to recovery_logs table
ALTER TABLE recovery_logs 
ADD COLUMN IF NOT EXISTS recovery_score INTEGER DEFAULT 0 CHECK (recovery_score >= 0 AND recovery_score <= 100),
ADD COLUMN IF NOT EXISTS cns_fatigue INTEGER DEFAULT 0 CHECK (cns_fatigue >= 0 AND cns_fatigue <= 100),
ADD COLUMN IF NOT EXISTS grip_fatigue INTEGER DEFAULT 0 CHECK (grip_fatigue >= 0 AND grip_fatigue <= 100),
ADD COLUMN IF NOT EXISTS isometric_strain INTEGER DEFAULT 0 CHECK (isometric_strain >= 0 AND isometric_strain <= 100),
ADD COLUMN IF NOT EXISTS armwrestling_side_pressure INTEGER DEFAULT 0 CHECK (armwrestling_side_pressure >= 0 AND armwrestling_side_pressure <= 100),
ADD COLUMN IF NOT EXISTS training_intensity INTEGER DEFAULT 0 CHECK (training_intensity >= 0 AND training_intensity <= 100);

-- Add comments for documentation
COMMENT ON COLUMN recovery_logs.recovery_score IS 'Calculated recovery score (0-100) based on sleep and fatigue metrics';
COMMENT ON COLUMN recovery_logs.cns_fatigue IS 'Central nervous system fatigue level (0-100)';
COMMENT ON COLUMN recovery_logs.grip_fatigue IS 'Grip strength fatigue level (0-100)';
COMMENT ON COLUMN recovery_logs.isometric_strain IS 'Isometric strain level (0-100)';
COMMENT ON COLUMN recovery_logs.armwrestling_side_pressure IS 'Arm wrestling side pressure fatigue (0-100)';
COMMENT ON COLUMN recovery_logs.training_intensity IS 'Training intensity level (0-100)';

-- Create index on recovery_score for faster queries
CREATE INDEX IF NOT EXISTS idx_recovery_logs_score ON recovery_logs(recovery_score);
CREATE INDEX IF NOT EXISTS idx_recovery_logs_date ON recovery_logs(created_at DESC);

-- Update RLS policies to include new columns
-- Note: Existing policies should already cover these columns as they're part of the same table
