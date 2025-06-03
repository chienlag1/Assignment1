import ProductForm from '@/app/components/ProductForm';

export default async function EditProduct({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_BASE_URL}/api/products/${searchParams.id}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Không tìm thấy sản phẩm!');
  }

  const product = await res.json();

  return (
    <div className='max-w-xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Chỉnh Sửa Sản Phẩm</h1>
      <ProductForm product={product} />
    </div>
  );
}
