import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='bg-blue-600 text-white p-4 flex justify-between'>
      <Link href='/' className='font-bold'>
        E-Commerce
      </Link>
      <div>
        <Link href='/' className='mr-4'>
          Home
        </Link>
        <Link href='/products/create' className='mr-4'>
          Thêm Sản Phẩm
        </Link>
      </div>
    </nav>
  );
}
