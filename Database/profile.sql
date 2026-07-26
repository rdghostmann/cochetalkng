create table profiles (
    id uuid primary key references auth.users(id) on delete cascade,

    email text not null unique,

    full_name text not null,

    avatar_url text,

    phone text,

    role text default 'buyer',

    created_at timestamptz default now(),

    updated_at timestamptz default now()
);

create table public.profiles (

    id uuid primary key references auth.users(id) on delete cascade,

    full_name text not null,

    email text unique,

    role text not null,

    avatar_url text,

    bio text,

    location text,

    whatsapp_number text,

    is_verified boolean default false,

    rating numeric(2,1),

    review_count integer default 0,

    created_at timestamptz default now()

);

-- ============================================================================
-- CocheTalkNG
-- Seed File: 01_profiles.sql
-- ============================================================================
-- Replace the UUIDs below with your actual Supabase Auth user IDs.
--
-- SELECT id,email FROM auth.users;
--
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

(
    '11111111-1111-1111-1111-111111111111',

    'Bisi Adebayo',

    'bisi@cochetalk.ng',

    'Car Owner',

    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',

    'Toyota enthusiast based in Ikeja. Loves preventive maintenance and genuine spare parts.',

    'Ikeja, Lagos',

    '+2348011111111',

    FALSE,

    NULL,

    0,

    NOW()
),

(
    '22222222-2222-2222-2222-222222222222',

    'Ada Okafor',

    'ada@cochetalk.ng',

    'Car Owner',

    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',

    'Daily Honda Accord owner interested in reliable mechanics and maintenance tips.',

    'Gwarinpa, Abuja',

    '+2348022222222',

    TRUE,

    NULL,

    0,

    NOW()
),

(
    '33333333-3333-3333-3333-333333333333',

    'Engr. Jose AutoWorks',

    'jose@cochetalk.ng',

    'Service Provider',

    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',

    'Certified automotive diagnostic specialist with over 12 years of workshop experience.',

    'Lekki Phase 1, Lagos',

    '+2348033333333',

    TRUE,

    4.9,

    34,

    NOW()
),

(
    '44444444-4444-4444-4444-444444444444',

    'Samson AutoParts',

    'samson@cochetalk.ng',

    'Service Provider',

    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',

    'Dealer in imported Tokunbo engines, gearboxes and genuine suspension components.',

    'Bodija, Ibadan',

    '+2348044444444',

    FALSE,

    4.5,

    18,

    NOW()
),

(
    '55555555-5555-5555-5555-555555555555',

    'CocheTalk Admin',

    'admin@cochetalk.ng',

    'Admin',

    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',

    'Platform administrator responsible for moderation, CMS management and verified provider approvals.',

    'Victoria Island, Lagos',

    '+2348055555555',

    TRUE,

    5.0,

    0,

    NOW()
);

COMMIT;