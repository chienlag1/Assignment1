// app/components/DeleteButton.tsx
'use client';

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    if (!confirm('Bạn chắc chắn xoá chứ?')) return;

    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) {
      window.location.href = '/';
    } else {
      alert('Xoá thất bại!');
    }
  };

  return (
    <button
      type='button'
      onClick={handleDelete}
      className='inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition'
    >
      🗑️ Xoá
    </button>
  );
}
