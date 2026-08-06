CREATE TABLE IF NOT EXISTS public.forum_questions (

    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id uuid NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,

    title text NOT NULL,

    description text NOT NULL,

    tags text[] DEFAULT '{}',

    garage_id uuid
        REFERENCES public.garages(id)
        ON DELETE SET NULL,

    is_private_ecosystem boolean DEFAULT FALSE,

    upvotes integer DEFAULT 0,

    answers_count integer DEFAULT 0,

    accepted_answer_id uuid,

    views integer DEFAULT 0,

    is_solved boolean DEFAULT FALSE,

    created_at timestamptz DEFAULT now()

);