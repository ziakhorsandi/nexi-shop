import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ProductCard({ product }) {
  return (
    <div className='border w-60 shadow hover:shadow-xl'>
      <Link href={`products/${product.id}`}>
        <a>
          <div className='p-2 flex justify-between items-baseline'>
            <h2 className='text-lg font-bold'>{product.title}</h2>
            <span>{product.price}</span>
          </div>
          <Image src={product.picUrl} width={320} height={240} alt='' />
        </a>
      </Link>
    </div>
  );
}

export default ProductCard;
