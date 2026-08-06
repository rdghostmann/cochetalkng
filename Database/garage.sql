-- ============================================================================
-- CocheTalkNG
-- Schema: garages.sql
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.garages (

    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id uuid NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,

    make text NOT NULL,

    model text NOT NULL,

    year integer NOT NULL,

    type text,

    vin text,

    mileage integer,

    created_at timestamptz NOT NULL DEFAULT now()

);

BEGIN;

INSERT INTO public.garages
(
    user_id,
    make,
    model,
    year,
    type,
    vin,
    mileage
)

VALUES

(
'ca07fe1a-011d-4f7e-b980-5769039bdcd6',
'Toyota',
'Camry',
2012,
'Sedan',
'4T1BF1FK0CU123456',
142000
),

(
'ca07fe1a-011d-4f7e-b980-5769039bdcd6',
'Toyota',
'Corolla',
2008,
'Sedan',
'2T1BU40E18C654321',
193500
),

(
'069d2f50-3981-40e5-90f8-8a9f05602cd0',
'Honda',
'Accord',
2014,
'Sedan',
'1HGCR2F89EA112233',
186000
),

(
'069d2f50-3981-40e5-90f8-8a9f05602cd0',
'Lexus',
'RX350',
2010,
'SUV',
'2T2BK1BA5AC987654',
159000
);

COMMIT;