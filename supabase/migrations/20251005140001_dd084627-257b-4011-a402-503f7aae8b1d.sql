-- Drop the overly permissive policy that allows anonymous task creation
DROP POLICY IF EXISTS "Anyone can create tasks" ON public.tasks;

-- Delete existing tasks with NULL created_by (anonymous spam tasks)
DELETE FROM public.tasks WHERE created_by IS NULL;

-- Make created_by NOT NULL to enforce user accountability
ALTER TABLE public.tasks ALTER COLUMN created_by SET NOT NULL;

-- Create new policy: Only authenticated users can create tasks
CREATE POLICY "Authenticated users can create tasks"
ON public.tasks
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by AND created_by IS NOT NULL);

-- Add helpful comment
COMMENT ON POLICY "Authenticated users can create tasks" ON public.tasks IS 'Prevents anonymous spam by requiring authentication. Users can only create tasks as themselves.';