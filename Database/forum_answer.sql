CREATE TABLE IF NOT EXISTS public.forum_answers (

    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    question_id uuid NOT NULL
        REFERENCES public.forum_questions(id)
        ON DELETE CASCADE,

    author_id uuid NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,

    body text NOT NULL,

    upvotes integer DEFAULT 0,

    created_at timestamptz DEFAULT now()

);