// app/components/ProductCard.tsx
import { Product } from '@/types';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className='bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden'>
      {product.image && (
        <div className='relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden'>
          <img
            src={product.image}
            alt={product.name}
            className='w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500 ease-in-out'
          />
        </div>
      )}
      <div className='p-5'>
        <h2 className='text-xl font-bold text-gray-800 mb-2 truncate'>
          {product.name}
        </h2>
        <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
          {product.description}
        </p>
        <p className='text-green-600 font-extrabold text-2xl mb-4'>
          ${product.price}
        </p>
        <div className='mt-auto flex justify-center'>
          <Link
            href={`/products/${product.id}`}
            className='w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300 text-center'
          >
            Chi tiết sản phẩm
          </Link>
        </div>
      </div>
    </div>
  );
}
