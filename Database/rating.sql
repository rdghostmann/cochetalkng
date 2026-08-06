CREATE TABLE IF NOT EXISTS public.ratings (

    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    provider_id uuid NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,

    rater_id uuid NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,

    rating_value integer NOT NULL
        CHECK (rating_value BETWEEN 1 AND 5),

    feedback text,

    created_at timestamptz DEFAULT now()

);

BEGIN;

INSERT INTO public.ratings
(
    provider_id,
    rater_id,
    rating_value,
    feedback,
    created_at
)

VALUES

(
'aa5f8e5f-6d5a-4c97-a838-7df34aab562e',
'ca07fe1a-011d-4f7e-b980-5769039bdcd6',
5,
'Very accurate diagnosis. My Camry now runs perfectly.',
NOW()-interval '10 days'
),

(
'aa5f8e5f-6d5a-4c97-a838-7df34aab562e',
'069d2f50-3981-40e5-90f8-8a9f05602cd0',
5,
'Professional mechanic. Explained everything clearly.',
NOW()-interval '7 days'
),

(
'e1f3eec2-3756-4c54-8a4d-4d70013854ba',
'ca07fe1a-011d-4f7e-b980-5769039bdcd6',
4,
'Fixed my suspension issue quickly.',
NOW()-interval '6 days'
),

(
'6749c02c-4b06-4fca-87d5-8551a2f1d166',
'069d2f50-3981-40e5-90f8-8a9f05602cd0',
5,
'Purchased genuine brake pads exactly as advertised.',
NOW()-interval '5 days'
),

(
'bf60dd3c-5181-4a2a-b2f4-1e68b1ce39bd',
'ca07fe1a-011d-4f7e-b980-5769039bdcd6',
4,
'Excellent oil service and vehicle detailing.',
NOW()-interval '3 days'
);

COMMIT;