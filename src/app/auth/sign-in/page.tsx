import { Suspense } from 'react';
import SignInForm from './SignInForm';

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="form">Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}
