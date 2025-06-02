import ProductForm from '@/app/components/ProductForm';

export default function CreateProduct() {
  return (
    <div className='max-w-xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Thêm Sản Phẩm</h1>
      <ProductForm />
    </div>
  );
}
