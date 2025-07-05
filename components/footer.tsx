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
}

export default function Footer({ currentPage, totalPages, searchParams }: FooterProps) {
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

  // Helper to build href with all params, only changing page
  const buildPageHref = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key === 'page') return; // We'll set it below
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value) {
        params.set(key, value);
      }
    });
    params.set('page', page.toString());
    return `?${params.toString()}`;
  };

  return (
    <footer className="px-4 sm:px-6 py-2 flex justify-center items-center bg-white border-t w-full">
      <div className="w-full max-w-screen-xl mx-auto">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={buildPageHref(Math.max(1, currentPage - 1))}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            {pageNumbers[0] > 1 && (
              <>
            <PaginationItem>
                  <PaginationLink href={buildPageHref(1)}>1</PaginationLink>
            </PaginationItem>
                {pageNumbers[0] > 2 && <PaginationEllipsis />}
              </>
            )}
            {pageNumbers.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={buildPageHref(page)}
                  isActive={page === currentPage}
                >
                  {page}
              </PaginationLink>
            </PaginationItem>
            ))}
            {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <>
                {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <PaginationEllipsis />}
            <PaginationItem>
                  <PaginationLink href={buildPageHref(totalPages)}>
                    {totalPages}
                  </PaginationLink>
            </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationNext
                href={buildPageHref(Math.min(totalPages, currentPage + 1))}
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </footer>
  );
}
