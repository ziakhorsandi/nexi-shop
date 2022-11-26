import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from '../components/Button';
import Field from '../components/Field';
import Input from '../components/Input';
import Page from '../components/Page';
import { useSignIn } from '../hooks/user';

//For making delay
// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { signIn, signInErr, signInLoading } = useSignIn();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await sleep(2000);
    const valid = await signIn(email, password);
    if (valid) router.push('/');
  };

  return (
    <Page title='Sign In'>
      <form onSubmit={handleSubmit}>
        <Field label='Name'>
          <Input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>
        <Field label='Password'>
          <Input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>
        {signInErr && (
          <div className='text-sm text-red-500'>Invalid credential</div>
        )}
        {signInLoading ? (
          <div className='text-sm'>Loading ...</div>
        ) : (
          <Button type='submit'>Sign In</Button>
        )}
      </form>
    </Page>
  );
}

export default SignInPage;
