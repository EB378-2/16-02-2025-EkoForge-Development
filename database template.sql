-- ===============================================================
-- 1. Create the Profiles Table (without policies yet)
-- ===============================================================
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone_number text,
  avatar_url text,
  ratings jsonb NOT NULL DEFAULT '[]'::jsonb,      
  flight_hours jsonb NOT NULL DEFAULT '[]'::jsonb,   -- e.g. [{"aircraft": "Cessna 172", "total_hours": 120.5}, ...]
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id)
      REFERENCES auth.users (id) ON DELETE CASCADE
);

-- ===============================================================
-- 2. Create the Admins Table with a foreign key to Profiles
-- ===============================================================
CREATE TABLE public.admins (
  id uuid PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT admins_profile_fkey FOREIGN KEY (id)
      REFERENCES public.profiles(id)
      ON DELETE CASCADE
);

-- ===============================================================
-- 3. Create Helper Function to Check Admin Status
-- ===============================================================
CREATE OR REPLACE FUNCTION public.is_admin() RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admins
    WHERE id = current_setting('app.current_user_id')::uuid
  );
END;
$$ LANGUAGE plpgsql STABLE;

-- ===============================================================
-- 4. Enable RLS and add Policies for the Profiles Table
-- ===============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY profiles_rls ON public.profiles
  FOR ALL
  USING (
    public.is_admin() OR
    id = current_setting('app.current_user_id')::uuid
  )
  WITH CHECK (
    public.is_admin() OR
    id = current_setting('app.current_user_id')::uuid
  );

-- ===============================================================
-- 5. Create the Notices Table and its RLS Policies
-- ===============================================================
CREATE TABLE IF NOT EXISTS public.notices (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    time_off_incident TIMESTAMP with time zone,  -- When the time off incident occurred
    submitted_by uuid NOT NULL,                    -- Profile/User who submitted the notice
    extra_parameters JSONB DEFAULT NULL,           -- Additional parameters stored as JSON
    created_at TIMESTAMP with time zone NOT NULL DEFAULT now(),
    updated_at TIMESTAMP with time zone NOT NULL DEFAULT now(),
    CONSTRAINT fk_notices_submitted_by FOREIGN KEY (submitted_by)
        REFERENCES public.profiles(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;

CREATE POLICY notices_rls ON public.notices
  FOR ALL
  USING (
    public.is_admin() OR
    submitted_by = current_setting('app.current_user_id')::uuid
  )
  WITH CHECK (
    public.is_admin() OR
    submitted_by = current_setting('app.current_user_id')::uuid
  );

-- ===============================================================
-- 6. Create the Instructors Table and its RLS Policies
-- ===============================================================
CREATE TABLE IF NOT EXISTS public.instructors (
    id SERIAL PRIMARY KEY,
    profile_id uuid NOT NULL,
    rating_level VARCHAR(50),      -- e.g., "CFI", "CFII", etc.
    availability TEXT,
    created_at TIMESTAMP with time zone NOT NULL DEFAULT now(),
    updated_at TIMESTAMP with time zone NOT NULL DEFAULT now(),
    CONSTRAINT fk_instructor_profile FOREIGN KEY (profile_id)
        REFERENCES public.profiles(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;

CREATE POLICY instructors_rls ON public.instructors
  FOR ALL
  USING (
    public.is_admin() OR
    profile_id = current_setting('app.current_user_id')::uuid
  )
  WITH CHECK (
    public.is_admin() OR
    profile_id = current_setting('app.current_user_id')::uuid
  );

-- ===============================================================
-- 7. Create the Resources Table and its RLS Policies
-- ===============================================================
CREATE TABLE IF NOT EXISTS public.resources (
    id SERIAL PRIMARY KEY,
    resource_type VARCHAR(50) NOT NULL CHECK (resource_type IN ('aircraft','simulator','classroom')),
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'available' CHECK (status IN ('available','maintenance','booked')),
    created_at TIMESTAMP with time zone NOT NULL DEFAULT now(),
    updated_at TIMESTAMP with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Allow all users to read resources.
CREATE POLICY resources_select_rls ON public.resources
  FOR SELECT
  USING (true);

-- Restrict modifications to admins only.
CREATE POLICY resources_write_rls ON public.resources
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ===============================================================
-- 8. Create the Logbook Table and its RLS Policies
-- ===============================================================
CREATE TABLE IF NOT EXISTS public.logbook (
    id SERIAL PRIMARY KEY,
    profile_id uuid NOT NULL,
    resource_id INT NOT NULL,    -- References public.resources.id
    flight_date DATE NOT NULL,
    flight_time DECIMAL(5,2) NOT NULL,  -- Flight time in hours
    notes TEXT,
    created_at TIMESTAMP with time zone NOT NULL DEFAULT now(),
    updated_at TIMESTAMP with time zone NOT NULL DEFAULT now(),
    CONSTRAINT fk_logbook_profile FOREIGN KEY (profile_id)
        REFERENCES public.profiles(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_logbook_resource FOREIGN KEY (resource_id)
        REFERENCES public.resources(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

ALTER TABLE public.logbook ENABLE ROW LEVEL SECURITY;

CREATE POLICY logbook_rls ON public.logbook
  FOR ALL
  USING (
    public.is_admin() OR
    profile_id = current_setting('app.current_user_id')::uuid
  )
  WITH CHECK (
    public.is_admin() OR
    profile_id = current_setting('app.current_user_id')::uuid
  );

-- ===============================================================
-- 9. Create the Flightplans Table and its RLS Policies
-- ===============================================================
CREATE TABLE IF NOT EXISTS public.flightplans (
    id SERIAL PRIMARY KEY,
    profile_id uuid NOT NULL,  -- Profile who created the plan
    route TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP with time zone NOT NULL DEFAULT now(),
    updated_at TIMESTAMP with time zone NOT NULL DEFAULT now(),
    CONSTRAINT fk_flightplan_creator FOREIGN KEY (profile_id)
        REFERENCES public.profiles(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

ALTER TABLE public.flightplans ENABLE ROW LEVEL SECURITY;

CREATE POLICY flightplans_rls ON public.flightplans
  FOR ALL
  USING (
    public.is_admin() OR
    profile_id = current_setting('app.current_user_id')::uuid
  )
  WITH CHECK (
    public.is_admin() OR
    profile_id = current_setting('app.current_user_id')::uuid
  );

-- ===============================================================
-- 10. Create the Bookings Table and its RLS Policies
-- ===============================================================
CREATE TABLE IF NOT EXISTS public.bookings (
    id SERIAL PRIMARY KEY,
    profile_id uuid NOT NULL,    -- The person making the booking
    resource_id INT NOT NULL,    -- References public.resources.id
    start_time TIMESTAMP with time zone NOT NULL,
    end_time TIMESTAMP with time zone NOT NULL,
    created_at TIMESTAMP with time zone NOT NULL DEFAULT now(),
    updated_at TIMESTAMP with time zone NOT NULL DEFAULT now(),
    CONSTRAINT fk_booking_profile FOREIGN KEY (profile_id)
        REFERENCES public.profiles(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_booking_resource FOREIGN KEY (resource_id)
        REFERENCES public.resources(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY bookings_rls ON public.bookings
  FOR ALL
  USING (
    public.is_admin() OR
    profile_id = current_setting('app.current_user_id')::uuid
  )
  WITH CHECK (
    public.is_admin() OR
    profile_id = current_setting('app.current_user_id')::uuid
  );

-- ===============================================================
-- 11. Create the Blogs Table and its RLS Policies
-- ===============================================================
CREATE TABLE IF NOT EXISTS public.blogs (
    id SERIAL PRIMARY KEY,
    profile_id uuid NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    published_at TIMESTAMP with time zone DEFAULT NULL,
    created_at TIMESTAMP with time zone NOT NULL DEFAULT now(),
    updated_at TIMESTAMP with time zone NOT NULL DEFAULT now(),
    CONSTRAINT fk_blog_author FOREIGN KEY (profile_id)
        REFERENCES public.profiles(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY blogs_rls ON public.blogs
  FOR ALL
  USING (
    public.is_admin() OR
    profile_id = current_setting('app.current_user_id')::uuid
  )
  WITH CHECK (
    public.is_admin() OR
    profile_id = current_setting('app.current_user_id')::uuid
  );
