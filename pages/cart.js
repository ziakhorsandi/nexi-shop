import { VALID_LOADERS } from 'next/dist/shared/lib/image-config';
import React, { useEffect, useRef } from 'react';
import { useMutation, useQuery } from 'react-query';
import Page from '../components/Page';
import { fetchJson } from '../lib/api';

function formatCurrency(val) {
  return '$' + val.toFixed(2);
}

function cartItemsCalculate(cartItems) {
  let retVal = { items: [], total: 0.0 };
  cartItems.map((item) => {
    const itemTotal =
      parseFloat(item.product.price) * parseFloat(item.quantity);
    retVal.items = [...retVal.items, { ...item, total: itemTotal }];
    retVal.total += itemTotal;
  });
  return retVal;
}

function CartItemsTable({ cartItems }) {
  const cart = cartItemsCalculate(cartItems);
  return (
    <table>
      <thead>
        <tr>
          <th className='px-4 py2'>Product</th>
          <th className='px-4 py2'>Price</th>
          <th className='px-4 py2'>Quantity</th>
          <th className='px-4 py2'>Total</th>
        </tr>
      </thead>
      <tbody>
        {cart.items.map((cItem) => (
          <tr key={cItem.id}>
            <td className='px-4 py2'>{cItem.product.title}</td>
            <td className='px-4 py2 text-right'>
              {formatCurrency(cItem.product.price)}
            </td>
            <td className='px-4 py2 text-right'>{cItem.quantity}</td>
            <td className='px-4 py2 text-right'>
              {formatCurrency(cItem.total)}
            </td>
          </tr>
        ))}
        <tr>
          <td className='px-4 py2'>Total</td>
          <td className='px-4 py2'></td>
          <td className='px-4 py2'></td>
          <td className='px-4 py2 text-right'>{formatCurrency(cart.total)}</td>
        </tr>
      </tbody>
    </table>
  );
}

function Cart() {
  const { data: cartItems } = useQuery(
    'cartItems',
    async () => await fetchJson(`/api/cart`)
  );

  return (
    <Page title='Cart'>
      {cartItems && <CartItemsTable cartItems={cartItems} />}
    </Page>
  );
}

export default Cart;
