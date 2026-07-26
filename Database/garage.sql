CREATE TABLE public.garages (

    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id uuid NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,

    make text NOT NULL,

    model text NOT NULL,

    year integer NOT NULL,

    trim text,

    engine text,

    transmission text,

    fuel_type text,

    drivetrain text,

    vin text,

    plate_number text,

    colour text,

    mileage integer DEFAULT 0,

    purchase_year integer,

    nickname text,

    created_at timestamptz DEFAULT now()

);

-- ============================================================================
-- CocheTalkNG
-- Seed File: 02_garages.sql
-- ============================================================================

BEGIN;

INSERT INTO public.garages (
    id,
    user_id,
    make,
    model,
    year,
    trim,
    engine,
    transmission,
    fuel_type,
    drivetrain,
    vin,
    plate_number,
    colour,
    mileage,
    purchase_year,
    nickname,
    created_at
)

VALUES

(
    gen_random_uuid(),

    '11111111-1111-1111-1111-111111111111',

    'Toyota',

    'Camry',

    2012,

    'XLE',

    '2.5L 2AR-FE',

    'Automatic',

    'Petrol',

    'FWD',

    '4T1BF1FK0CU123456',

    'LND-247KL',

    'Silver',

    142000,

    2021,

    'Daily Driver',

    NOW()
),

(
    gen_random_uuid(),

    '11111111-1111-1111-1111-111111111111',

    'Toyota',

    'Corolla',

    2008,

    'LE',

    '1.8L 2ZR-FE',

    'Automatic',

    'Petrol',

    'FWD',

    '2T1BU40E18C654321',

    'APP-501AB',

    'Black',

    196400,

    2023,

    'Family Car',

    NOW()
),

(
    gen_random_uuid(),

    '22222222-2222-2222-2222-222222222222',

    'Honda',

    'Accord',

    2014,

    'EX-L',

    '2.4L K24',

    'Automatic',

    'Petrol',

    'FWD',

    '1HGCR2F89EA112233',

    'RSH-884AA',

    'White',

    186300,

    2022,

    'Ada Accord',

    NOW()
),

(
    gen_random_uuid(),

    '22222222-2222-2222-2222-222222222222',

    'Lexus',

    'RX350',

    2010,

    'Luxury',

    '3.5L V6',

    'Automatic',

    'Petrol',

    'AWD',

    '2T2BK1BA5AC987654',

    'ABJ-765RX',

    'Pearl White',

    158500,

    2024,

    'Weekend SUV',

    NOW()
);

COMMIT;