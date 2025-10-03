-- Create tasks table
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  budget TEXT,
  duration TEXT,
  requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID,
  status TEXT NOT NULL DEFAULT 'open',
  images TEXT[]
);

-- Enable Row Level Security
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Allow everyone (including unauthenticated users) to view all tasks
CREATE POLICY "Anyone can view tasks"
ON public.tasks
FOR SELECT
USING (true);

-- Allow everyone (including unauthenticated users) to create tasks
CREATE POLICY "Anyone can create tasks"
ON public.tasks
FOR INSERT
WITH CHECK (true);

-- Allow task creators to update their own tasks
CREATE POLICY "Users can update their own tasks"
ON public.tasks
FOR UPDATE
USING (
  created_by IS NULL OR 
  auth.uid() = created_by
);

-- Allow task creators to delete their own tasks
CREATE POLICY "Users can delete their own tasks"
ON public.tasks
FOR DELETE
USING (
  created_by IS NULL OR 
  auth.uid() = created_by
);

-- Create index for better performance
CREATE INDEX idx_tasks_category ON public.tasks(category);
CREATE INDEX idx_tasks_created_by ON public.tasks(created_by);
CREATE INDEX idx_tasks_status ON public.tasks(status);