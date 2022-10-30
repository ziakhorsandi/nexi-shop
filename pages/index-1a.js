// Option 1a: fetch the products on the server side (in getStaticProps)

import Head from 'next/head';
import Title from '../components/Title';
import { getProducts } from '../lib/products';

export async function getStaticProps() {
  console.log('[Home page] getStaticProps() ');
  const products = await getProducts();
  return { props: { products } };
}

export default function HomePage({ products }) {
  console.log(`[HomePage] render: `, products);
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className='px-6 py-4'>
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
