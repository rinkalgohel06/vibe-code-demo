import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseRouteHandlerClient } from '@/lib/supabase/route-handler';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const nextPath = requestUrl.searchParams.get('next');
  const safeNext = nextPath && nextPath.startsWith('/') ? nextPath : '/dashboard';

  if (!code) {
    return NextResponse.redirect(`${requestUrl.origin}/auth/sign-in?error=missing_code`);
  }

  const supabase = createSupabaseRouteHandlerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${requestUrl.origin}/auth/sign-in?error=callback`);
  }

  return NextResponse.redirect(`${requestUrl.origin}${safeNext}`);
}
