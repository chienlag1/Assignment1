import DeleteButton from '@/app/components/DeleteButton';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
    { cache: 'no-store' }
  );

  if (!res.ok) return notFound();

  const product = await res.json();

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl'>
           {' '}
      <div className='flex flex-col items-center'>
               {' '}
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            // THÊM width VÀ height VÀO ĐÂY
            width={600} // Thay 600 bằng chiều rộng thực tế của ảnh
            height={400} // Thay 400 bằng chiều cao thực tế của ảnh
            className='w-full max-w-sm rounded mb-4'
          />
        )}
               {' '}
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>
                    {product.name}       {' '}
        </h1>
               {' '}
        <p className='text-gray-600 mb-4 text-center'>{product.description}</p> 
             {' '}
        <p className='text-xl font-semibold text-green-600 mb-6'>
                    ${product.price}       {' '}
        </p>
             {' '}
      </div>
           {' '}
      <div className='flex justify-center gap-4'>
               {' '}
        <a
          href={`/products/edit?id=${product.id}`}
          className='inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
        >
                    ✏️ Chỉnh sửa        {' '}
        </a>
                <DeleteButton id={product.id} />     {' '}
      </div>
         {' '}
    </div>
  );
}
