-- FlyAI Supabase Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Travel searches (can be anonymous)
create table if not exists public.travel_searches (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  raw_prompt text not null,
  parsed_request jsonb not null,
  result_count int default 0,
  created_at timestamptz default now() not null
);

-- Saved flights
create table if not exists public.saved_flights (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  search_id uuid references public.travel_searches(id) on delete set null,
  flight_data jsonb not null,
  notes text,
  created_at timestamptz default now() not null
);

-- User preferences
create table if not exists public.user_preferences (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade unique,
  preferred_origin text,
  max_budget numeric(10, 2),
  preferred_currency text default 'EUR',
  preferred_trip_types text[] default '{}',
  preferred_airlines text[] default '{}',
  notifications_enabled boolean default true,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Price alerts (chollos internacionales)
create table if not exists public.price_alerts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  destination_city text not null,
  destination_country text not null,
  destination_airport_code text not null,
  max_price numeric(10, 2) not null,
  active boolean default true not null,
  created_at timestamptz default now() not null
);

-- Indexes
create index if not exists idx_travel_searches_user_id on public.travel_searches(user_id);
create index if not exists idx_travel_searches_created_at on public.travel_searches(created_at desc);
create index if not exists idx_saved_flights_user_id on public.saved_flights(user_id);
create index if not exists idx_price_alerts_user_id on public.price_alerts(user_id);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.travel_searches enable row level security;
alter table public.saved_flights enable row level security;
alter table public.user_preferences enable row level security;
alter table public.price_alerts enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Travel searches policies (authenticated users see own, anon can insert)
create policy "Users can view own searches"
  on public.travel_searches for select
  using (auth.uid() = user_id);

create policy "Anyone can insert a search"
  on public.travel_searches for insert
  with check (true);

-- Saved flights policies
create policy "Users can view own saved flights"
  on public.saved_flights for select
  using (auth.uid() = user_id);

create policy "Users can insert own saved flights"
  on public.saved_flights for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own saved flights"
  on public.saved_flights for delete
  using (auth.uid() = user_id);

-- User preferences policies
create policy "Users can view own preferences"
  on public.user_preferences for select
  using (auth.uid() = user_id);

create policy "Users can upsert own preferences"
  on public.user_preferences for all
  using (auth.uid() = user_id);

-- Price alerts policies
create policy "Users can view own alerts"
  on public.price_alerts for select
  using (auth.uid() = user_id);

create policy "Users can insert own alerts"
  on public.price_alerts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own alerts"
  on public.price_alerts for update
  using (auth.uid() = user_id);

create policy "Users can delete own alerts"
  on public.price_alerts for delete
  using (auth.uid() = user_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
