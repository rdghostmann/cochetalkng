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