import Image from 'next/image';
import AddToCartWidget from '../../components/AddToCartWidget';
import Page from '../../components/Page';
import { useUser } from '../../hooks/user';
import { ApiError } from '../../lib/api';
import { getProduct, getProducts } from '../../lib/products';

export async function getStaticPaths() {
  const products = await getProducts();
  return {
    paths: products.map((product) => ({
      params: { id: product.id.toString() },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params: { id } }) {
  try {
    const product = await getProduct(id);
    return {
      props: { product },
      revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { notFound: true };
    }
    throw error;
  }
}

export default function ProductPage({ product }) {
  const user = useUser();
  console.log(`[ProductPage] render: `, product);
  return (
    <Page title={product.title}>
      <div className='flex flex-col lg:flex-row gap-4 '>
        <div>
          <Image src={product.picUrl} width={640} height={480} alt='' />
        </div>
        <div className='flex-1'>
          <p className='text-sm'>{product.description}</p>

          <p className='text-lg font-bold mt-2'>{product.price}</p>
        </div>
      </div>
      {user && <AddToCartWidget productId={product.id} />}
    </Page>
  );
}
