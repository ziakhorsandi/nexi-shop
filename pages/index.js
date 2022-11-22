import { getProducts } from '../lib/products';
import ProductCard from '../components/ProductCard';
import Page from '../components/Page';

export async function getStaticProps() {
  console.log('[Home page] getStaticProps() ');
  const products = await getProducts();
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),
  };
}

export default function HomePage({ products }) {
  console.log(`[HomePage] render: `, products);
  return (
    <Page title='Indoor Plants'>
      <ul className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Page>
  );
}
