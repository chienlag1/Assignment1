import ProductCard from './components/ProductCard';

export default async function Home() {
  const res = await fetch(`${process.env.BASE_URL}/api/products`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Failed to fetch products:', res.status, await res.text());
    // Fallback to empty array or show error
    return <div>Failed to load products</div>;
  }

  const products = await res.json();

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
