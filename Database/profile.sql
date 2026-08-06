-- ============================================================================
-- CocheTalkNG
-- Schema: profiles.sql
-- Description: User Profiles
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.profiles (

    id uuid PRIMARY KEY
        REFERENCES auth.users(id)
        ON DELETE CASCADE,

    full_name text NOT NULL,

    email text NOT NULL UNIQUE,

    role text NOT NULL DEFAULT 'Car Owner'
        CHECK (
            role IN (
                'Car Owner',
                'Service Provider',
                'Admin'
            )
        ),

    avatar_url text,

    bio text,

    location text,

    whatsapp_number text,

    is_verified boolean NOT NULL DEFAULT FALSE,

    rating numeric(2,1)
        CHECK (rating >= 0 AND rating <= 5),

    review_count integer NOT NULL DEFAULT 0
        CHECK (review_count >= 0),

    created_at timestamptz NOT NULL DEFAULT now(),

    updated_at timestamptz NOT NULL DEFAULT now()

);

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_updated_at
ON public.profiles;

CREATE TRIGGER profiles_updated_at
BEFORE UPDATE
ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.profiles
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by authenticated users"

ON public.profiles

FOR SELECT

TO authenticated

USING (true);

CREATE POLICY "Users can insert own profile"

ON public.profiles

FOR INSERT

TO authenticated

WITH CHECK (
    auth.uid() = id
);


CREATE POLICY "Users can update own profile"

ON public.profiles

FOR UPDATE

TO authenticated

USING (
    auth.uid() = id
)

WITH CHECK (
    auth.uid() = id
);
-- ============================================================================
-- CocheTalkNG
-- Seed File: 01_profiles.sql
-- Description: Seed user profiles
-- ============================================================================
-- Replace the UUIDs below with the IDs from:
--
-- SELECT id,email FROM auth.users;
-- ============================================================================

BEGIN;

INSERT INTO public.profiles (
    id,
    full_name,
    email,
    role,
    avatar_url,
    bio,
    location,
    whatsapp_number,
    is_verified,
    rating,
    review_count,
    created_at
)

VALUES

-- ============================================================================
-- CAR OWNERS
-- ============================================================================

(
    'ca07fe1a-011d-4f7e-b980-5769039bdcd6',
    'Bisi Adebayo',
    'bisi@cochetalk.ng',
    'Car Owner',
    'https://i.pravatar.cc/300?img=12',
    'Toyota enthusiast who enjoys preventive vehicle maintenance.',
    'Ikeja, Lagos',
    '+2348011111111',
    FALSE,
    NULL,
    0,
    NOW()
),

(
    '069d2f50-3981-40e5-90f8-8a9f05602cd0',
    'Ada Okafor',
    'ada@cochetalk.ng',
    'Car Owner',
    'https://i.pravatar.cc/300?img=47',
    'Honda Accord owner interested in reliable mechanics and maintenance tips.',
    'Gwarinpa, Abuja',
    '+2348022222222',
    TRUE,
    NULL,
    0,
    NOW()
),

-- ============================================================================
-- VERIFIED MECHANICS
-- ============================================================================

(
    'aa5f8e5f-6d5a-4c97-a838-7df34aab562e',
    'Engr. Jose AutoWorks',
    'jose@cochetalk.ng',
    'Service Provider',
    'https://i.pravatar.cc/300?img=14',
    'Certified automotive diagnostic technician with over 12 years of workshop experience.',
    'Lekki Phase 1, Lagos',
    '+2348033333333',
    TRUE,
    4.9,
    41,
    NOW()
),

(
    'e1f3eec2-3756-4c54-8a4d-4d70013854ba',
    'Chinedu Motors',
    'chinedu@cochetalk.ng',
    'Service Provider',
    'https://i.pravatar.cc/300?img=15',
    'Specialist in suspension, steering systems and wheel alignment.',
    'Port Harcourt, Rivers',
    '+2348044444444',
    TRUE,
    4.8,
    29,
    NOW()
),

-- ============================================================================
-- SERVICE PROVIDERS
-- ============================================================================

(
    '6749c02c-4b06-4fca-87d5-8551a2f1d166',
    'Samson AutoParts',
    'samson@cochetalk.ng',
    'Service Provider',
    'https://i.pravatar.cc/300?img=18',
    'Supplier of genuine Toyota, Honda and Lexus spare parts.',
    'Ibadan, Oyo',
    '+2348055555555',
    FALSE,
    4.6,
    17,
    NOW()
),

(
    'bf60dd3c-5181-4a2a-b2f4-1e68b1ce39bd',
    'Emeka Auto Care',
    'emeka@cochetalk.ng',
    'Service Provider',
    'https://i.pravatar.cc/300?img=19',
    'Vehicle servicing centre offering oil service, detailing and preventive maintenance.',
    'Enugu, Enugu',
    '+2348066666666',
    FALSE,
    4.5,
    11,
    NOW()
),

-- ============================================================================
-- ADMIN
-- ============================================================================

(
    '23fab2e1-264b-43bd-95f2-16c0071b0610',
    'CocheTalk Admin',
    'admin@cochetalk.ng',
    'Admin',
    'https://i.pravatar.cc/300?img=60',
    'Platform administrator responsible for moderation, verification and CMS management.',
    'Victoria Island, Lagos',
    '+2348077777777',
    TRUE,
    5.0,
    0,
    NOW()
);

COMMIT;