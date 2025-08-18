-- Create the user_role enum type first
CREATE TYPE public.user_role AS ENUM ('working_professional', 'teacher', 'student', 'visitor');

-- Add role column to profiles table if it doesn't exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'visitor';

-- Add display_name column to profiles table if it doesn't exist  
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS display_name text;

-- Update the handle_new_user function to properly handle the enum
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, role)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'visitor'::user_role)
  );
  RETURN NEW;
END;
$function$

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();