'use client';

import { useState } from 'react';
import { Product } from '@/types';

export default function ProductForm({ product }: { product?: Product }) {
  const [form, setForm] = useState<Product>(
    product || { name: '', description: '', price: 0, image: '' }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const baseUrl =
      process.env.NEXT_PUBLIC_NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const url = product
      ? `${baseUrl}/api/products/${product.id}`
      : `${baseUrl}/api/products`;

    const method = product ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Lỗi API:', errorData);
        alert(`Lỗi: ${errorData.error || 'Đã xảy ra lỗi!'}`);
        return;
      }

      window.location.href = '/';
    } catch (error) {
      console.error('Lỗi Fetch:', error);
      alert('Lỗi mạng hoặc sự cố khi kết nối với máy chủ.');
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-4'
    >
      <h2 className='text-2xl font-bold mb-4 text-gray-800'>
        {product ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm mới'}
      </h2>

      <div className='flex flex-col'>
        <label
          htmlFor='name'
          className='text-sm font-medium text-gray-600 mb-1'
        >
          Tên sản phẩm
        </label>
        <input
          id='name'
          className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Tên sản phẩm'
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>

      <div className='flex flex-col'>
        <label
          htmlFor='description'
          className='text-sm font-medium text-gray-600 mb-1'
        >
          Mô tả
        </label>
        <textarea
          id='description'
          className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Mô tả sản phẩm'
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
      </div>

      <div className='flex flex-col'>
        <label
          htmlFor='price'
          className='text-sm font-medium text-gray-600 mb-1'
        >
          Giá
        </label>
        <input
          id='price'
          type='number'
          className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Giá sản phẩm'
          value={form.price || ''}
          onChange={(e) => {
            const value = e.target.value;
            setForm({
              ...form,
              price: value === '' ? 0 : parseFloat(value),
            });
          }}
          required
        />
      </div>

      <div className='flex flex-col'>
        <label
          htmlFor='image'
          className='text-sm font-medium text-gray-600 mb-1'
        >
          URL Ảnh
        </label>
        <input
          id='image'
          className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='https://...'
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
      </div>

      <button
        type='submit'
        className='w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition'
      >
        {product ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm mới'}
      </button>
    </form>
  );
}
