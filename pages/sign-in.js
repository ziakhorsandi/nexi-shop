import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from '../components/Button';
import Field from '../components/Field';
import Input from '../components/Input';
import Page from '../components/Page';
import { fetchJson } from '../lib/api';

//For making delay
// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    // await sleep(2000);
    try {
      const response = await fetchJson('api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      setLoading(false);
      console.log('Sign-in: ', response);
      router.push('/');
    } catch (error) {
      setError(true);
      setLoading(false);
    }
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
        {error && (
          <div className='text-sm text-red-500'>Invalid credential</div>
        )}
        {loading ? (
          <div className='text-sm'>Loading ...</div>
        ) : (
          <Button type='submit'>Sign In</Button>
        )}
      </form>
    </Page>
  );
}

export default SignInPage;
