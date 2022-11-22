import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { fetchJson } from '../lib/api';

function Navbar() {
  const [user, setUser] = useState();
  useEffect(() => {
    (async () => {
      try {
        const user = await fetchJson(`/api/user`);
        setUser(user);
      } catch (err) {
        //Not signed ih
      }
    })();
  }, []);

  const signoutHandler = async () => {
    await fetchJson('/api/logout');
    setUser(undefined);
  };

  console.log('[Navbar] user:', user);
  return (
    <nav className='px-2 py-1 text-sm'>
      <ul className='flex gap-2'>
        <li className='text-lg font-extrabold'>
          <Link href='/'>
            <a>Next Shop</a>
          </Link>
        </li>
        <li role='seperator' className='flex-1'></li>
        {user ? (
          <>
            <li>{user.name}</li>
            <li>
              <button onClick={signoutHandler}>Sign Out</button>
            </li>
          </>
        ) : (
          <li>
            <Link href='/sign-in'>
              <a>Sign In</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
