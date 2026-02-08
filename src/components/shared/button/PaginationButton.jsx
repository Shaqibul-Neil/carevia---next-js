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
import { generatePagination } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React from "react";

const PaginationButton = ({ totalPage, currentPage }) => {
  //const totalPage = 20;
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const handlePagination = (page) => {
    if (page === "....") return;
    if (page < 1 || page > totalPage) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`${pathName}?${params}`, { scroll: false });
  };
  const pages = generatePagination(currentPage, totalPage);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage !== 1 && (
            <PaginationPrevious
              onClick={() => handlePagination(currentPage - 1)}
              disabled={currentPage === 1}
            />
          )}
        </PaginationItem>
        {pages.map((page, i) => {
          return (
            <PaginationItem key={i}>
              {page === "...." ? (
                <PaginationEllipsis></PaginationEllipsis>
              ) : (
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => handlePagination(page)}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          );
        })}

        <PaginationItem>
          {currentPage < totalPage && (
            <PaginationNext
              onClick={() => handlePagination(currentPage + 1)}
              disabled={currentPage === totalPage}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationButton;
