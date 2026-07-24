-- Enable UUID generation (optional if not already enabled)
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,

    full_name text not null,

    email text not null unique,

    avatar_url text,

    role text not null default 'Car Owner',

    created_at timestamptz default now(),

    updated_at timestamptz default now()
);

alter table public.profiles
enable row level security;

create policy "Users can view own profile"
on public.profiles
for select
using (
    auth.uid() = id
);

create policy "Users can insert own profile"
on public.profiles
for insert
with check (
    auth.uid() = id
);

create policy "Users can update own profile"
on public.profiles
for update
using (
    auth.uid() = id
);

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create trigger profiles_updated_at
before update on public.profiles
for each row
execute function public.handle_updated_at();