import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { fetchJson } from '../lib/api';
import Button from './Button';

function AddToCartWidget({ productId }) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const mutation = useMutation(({ productId, quantity }) =>
    fetchJson('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity }),
    })
  );

  const handleClick = async () => {
    try {
      await mutation.mutateAsync({ productId, quantity });
      router.push('/cart');
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <input
        type='number'
        className='border border-green-500 mr-2 px-2 py-2 rounded w-16 text-left'
        min='0'
        value={quantity.toString()}
        onChange={(e) => {
          setQuantity(parseInt(e.target.value));
        }}
      />
      {mutation.isLoading ? (
        <div>Loading...</div>
      ) : (
        <Button onClick={handleClick}>Add To Cart</Button>
      )}
    </>
  );
}

export default AddToCartWidget;
