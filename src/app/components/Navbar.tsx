export default function Navbar() {
  return (
    <nav className='bg-blue-600 text-white p-4 flex justify-between'>
      <a href='/' className='font-bold'>
        E-Commerce
      </a>
      <div>
        <a href='/' className='mr-4'>
          Home
        </a>
        <a href='/products/create' className='mr-4'>
          Thêm Sản Phẩm
        </a>
      </div>
    </nav>
  );
}
