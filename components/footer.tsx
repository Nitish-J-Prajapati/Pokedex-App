import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface FooterProps {
  currentPage: number;
  totalPages: number;
  searchParams: { [key: string]: string | string[] };
  onPageChange: (page: number) => void;
}

export default function Footer({ currentPage, totalPages, searchParams, onPageChange }: FooterProps) {
  // Helper to generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };
  const pageNumbers = getPageNumbers();

  return (
    <footer className="px-4 sm:px-6 py-2 flex justify-center items-center bg-white border-t w-full">
      <div className="w-full max-w-screen-xl mx-auto">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="bg-transparent border-none p-0 m-0"
              >
                <PaginationPrevious />
              </button>
            </PaginationItem>
            {pageNumbers[0] > 1 && (
              <>
                <PaginationItem>
                  <button onClick={() => onPageChange(1)} className="bg-transparent border-none p-0 m-0">
                    <PaginationLink isActive={1 === currentPage}>1</PaginationLink>
                  </button>
                </PaginationItem>
                {pageNumbers[0] > 2 && <PaginationEllipsis />}
              </>
            )}
            {pageNumbers.map((page) => (
              <PaginationItem key={page}>
                <button onClick={() => onPageChange(page)} className="bg-transparent border-none p-0 m-0">
                  <PaginationLink isActive={page === currentPage}>{page}</PaginationLink>
                </button>
              </PaginationItem>
            ))}
            {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <>
                {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <PaginationEllipsis />}
                <PaginationItem>
                  <button onClick={() => onPageChange(totalPages)} className="bg-transparent border-none p-0 m-0">
                    <PaginationLink isActive={totalPages === currentPage}>{totalPages}</PaginationLink>
                  </button>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="bg-transparent border-none p-0 m-0"
              >
                <PaginationNext />
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </footer>
  );
}
