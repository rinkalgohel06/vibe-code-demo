import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from './supabase/server';

export type UserRole = 'doctor' | 'patient';

type Profile = {
  id: string;
  full_name: string | null;
  role: UserRole;
};

export async function getUserProfile() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, profile: null, role: null };
  }

  const { data } = await supabase
    .from('profiles')
    .select('id, role, full_name')
    .eq('id', user.id)
    .maybeSingle();

  const profile = data as Profile | null;

  const role = (profile?.role ?? user.user_metadata?.role ?? null) as UserRole | null;

  return { user, profile, role };
}

export async function requireUser() {
  const { user } = await getUserProfile();

  if (!user) {
    redirect('/auth/sign-in');
  }

  return user;
}

export async function requireRole(expected: UserRole) {
  const { user, profile, role } = await getUserProfile();

  if (!user) {
    redirect('/auth/sign-in');
  }

  if (!role || role !== expected) {
    redirect('/dashboard?error=role');
  }

  return { user, profile, role };
}
