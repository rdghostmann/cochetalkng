CREATE TABLE public.forum_comments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    answer_id uuid REFERENCES public.forum_answers(id) ON DELETE CASCADE,
    author_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    body text NOT NULL,
    created_at timestamptz DEFAULT now()
);

BEGIN;

INSERT INTO public.forum_comments
(
    answer_id,
    author_id,
    body,
    created_at
)

SELECT
a.id,
'ca07fe1a-011d-4f7e-b980-5769039bdcd6',
'Thank you. I will inspect the throttle body this weekend.',
NOW()-interval '8 days'
FROM public.forum_answers a
JOIN public.forum_questions q
ON q.id=a.question_id
WHERE q.title='Toyota Camry 2012 jerks while accelerating'
LIMIT 1;

INSERT INTO public.forum_comments
(
    answer_id,
    author_id,
    body,
    created_at
)

SELECT
a.id,
'069d2f50-3981-40e5-90f8-8a9f05602cd0',
'Cleaning the throttle body solved a similar issue on my Accord.',
NOW()-interval '7 days'
FROM public.forum_answers a
JOIN public.forum_questions q
ON q.id=a.question_id
WHERE q.title='Toyota Camry 2012 jerks while accelerating'
LIMIT 1;

INSERT INTO public.forum_comments
(
    answer_id,
    author_id,
    body,
    created_at
)

SELECT
a.id,
'ca07fe1a-011d-4f7e-b980-5769039bdcd6',
'I checked the refrigerant and it seems low.',
NOW()-interval '6 days'
FROM public.forum_answers a
JOIN public.forum_questions q
ON q.id=a.question_id
WHERE q.title='Honda Accord AC stops cooling after 20 minutes'
LIMIT 1;

INSERT INTO public.forum_comments
(
    answer_id,
    author_id,
    body,
    created_at
)

SELECT
a.id,
'aa5f8e5f-6d5a-4c97-a838-7df34aab562e',
'Please pressure-test the system before topping up gas.',
NOW()-interval '6 days'
FROM public.forum_answers a
JOIN public.forum_questions q
ON q.id=a.question_id
WHERE q.title='Honda Accord AC stops cooling after 20 minutes'
LIMIT 1;

COMMIT;