-- Drop the overly permissive policy that exposes email addresses
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create a new policy: Users can only view their own complete profile (including email)
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Create a security definer function to get public profile data (excluding email)
CREATE OR REPLACE FUNCTION public.get_public_profile(profile_id uuid)
RETURNS TABLE (
  id uuid,
  name text,
  location text,
  description text,
  profile_image text,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, name, location, description, profile_image, created_at
  FROM public.profiles
  WHERE id = profile_id;
$$;

-- Grant execute permissions to authenticated and anonymous users
GRANT EXECUTE ON FUNCTION public.get_public_profile(uuid) TO authenticated, anon;

-- Add helpful comment
COMMENT ON FUNCTION public.get_public_profile IS 'Returns public profile data without exposing email addresses. Use this function to display other users profiles safely.';