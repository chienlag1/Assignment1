'use client'; // Đánh dấu đây là Client Component

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    // Hiển thị một số trang xung quanh trang hiện tại
    const maxPagesToShow = 5; // Số nút trang tối đa để hiển thị
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Điều chỉnh nếu chúng ta ở gần cuối
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className='flex justify-center items-center space-x-2 my-8'>
      {/* Nút Previous */}
      <Link
        href={createPageURL(currentPage - 1)}
        className={`px-4 py-2 border rounded-lg ${
          currentPage <= 1
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        aria-disabled={currentPage <= 1}
        tabIndex={currentPage <= 1 ? -1 : undefined}
      >
        Trước
      </Link>

      {/* Các nút số trang */}
      {pageNumbers.map((pageNumber, index) => (
        <span key={index}>
          {pageNumber === '...' ? (
            <span className='px-4 py-2'>...</span>
          ) : (
            <Link
              href={createPageURL(pageNumber)}
              className={`px-4 py-2 border rounded-lg ${
                pageNumber === currentPage
                  ? 'bg-blue-700 text-white font-bold'
                  : 'bg-white text-blue-700 hover:bg-blue-100'
              }`}
            >
              {pageNumber}
            </Link>
          )}
        </span>
      ))}

      {/* Nút Next */}
      <Link
        href={createPageURL(currentPage + 1)}
        className={`px-4 py-2 border rounded-lg ${
          currentPage >= totalPages
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        aria-disabled={currentPage >= totalPages}
        tabIndex={currentPage >= totalPages ? -1 : undefined}
      >
        Tiếp
      </Link>
    </div>
  );
}
