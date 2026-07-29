-- Rotaract Club NIET — Supabase schema
-- Run this in the Supabase SQL editor (or `supabase db push`) to create
-- every table the site's CMS-style content depends on.
--
-- After creating these tables, an admin can manage all site content from
-- the Supabase Table Editor without touching code. To wire a table into
-- the front-end, replace the static arrays in `src/data/content.ts` with
-- a fetch against the matching table (see comments in that file).

create extension if not exists "pgcrypto";

-- ---------- Members ----------
create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  department text,
  year text,
  email text,
  phone text,
  joined_at date default current_date,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ---------- Board Members ----------
create table if not exists board_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  photo_url text,
  linkedin_url text,
  instagram_url text,
  email text,
  display_order int default 0,
  created_at timestamptz default now()
);

-- ---------- Events ----------
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date not null,
  location text,
  cover_image_url text,
  gallery_image_urls text[],
  created_at timestamptz default now()
);

-- ---------- Projects (Featured Projects / Avenues of Service work) ----------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  avenue_of_service text,
  project_date date,
  location text,
  cover_image_url text,
  excerpt text,
  body text,
  created_at timestamptz default now()
);

-- ---------- Gallery ----------
create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt_text text,
  category text check (category in ('Community', 'Leadership', 'Meetings', 'Service', 'Celebrations')),
  created_at timestamptz default now()
);

-- ---------- Announcements ----------
create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  is_published boolean default true,
  published_at timestamptz default now()
);

-- ---------- Testimonials ----------
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  quote text not null,
  testimonial_type text check (testimonial_type in ('Member', 'Faculty', 'Rotarian', 'Sponsor')),
  is_published boolean default true,
  created_at timestamptz default now()
);

-- ---------- Join Requests (from the "Join Rotaract" form) ----------
create table if not exists join_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  department text,
  year text,
  email text not null,
  phone text,
  reason text,
  status text default 'new' check (status in ('new', 'contacted', 'accepted', 'declined')),
  created_at timestamptz default now()
);

-- ---------- Row Level Security ----------
-- Public (anon) can read published content and INSERT join requests only.
-- Writing/editing everything else should go through the Supabase dashboard
-- (as an authenticated admin) or a service-role key on the server.

alter table members enable row level security;
alter table board_members enable row level security;
alter table events enable row level security;
alter table projects enable row level security;
alter table gallery enable row level security;
alter table announcements enable row level security;
alter table testimonials enable row level security;
alter table join_requests enable row level security;

create policy "Public can read board members" on board_members for select using (true);
create policy "Public can read events" on events for select using (true);
create policy "Public can read projects" on projects for select using (true);
create policy "Public can read gallery" on gallery for select using (true);
create policy "Public can read published announcements" on announcements for select using (is_published = true);
create policy "Public can read published testimonials" on testimonials for select using (is_published = true);

create policy "Public can submit join requests" on join_requests for insert with check (true);
-- Note: no select policy on join_requests for anon — only admins (via dashboard) should read applications.
