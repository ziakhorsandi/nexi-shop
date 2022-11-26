import Link from 'next/link';
import React from 'react';
import { useSignOut, useUser } from '../hooks/user';

function Navbar() {
  const user = useUser();
  const signOut = useSignOut();

  // console.log('[Navbar] user:', user);
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
            <li>
              <Link href='/cart'>
                <a>Cart</a>
              </Link>
            </li>
            <li>{user.name}</li>
            <li>
              <button onClick={signOut}>Sign Out</button>
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
