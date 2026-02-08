"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React from "react";

const PaginationButton = ({ totalPage, currentPage }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const handlePagination = (page) => {
    if (page < 1 || page > totalPage) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    console.log(params);
    router.push(`${pathName}?${params}`, { scroll: false });
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </PaginationItem>
        {[...Array(totalPage)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={currentPage === pageNum}
                onClick={() => handlePagination(pageNum)}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePagination(currentPage + 1)}
            disabled={currentPage === totalPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationButton;
