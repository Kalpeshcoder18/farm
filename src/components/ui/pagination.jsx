// src/components/Pagination.jsx
import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

/** tiny cn helper */
const cn = (...classes) => classes.filter(Boolean).join(" ");

export function Pagination({ className, children, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    >
      {children}
    </nav>
  );
}

export function PaginationContent({ className, children, ...props }) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    >
      {children}
    </ul>
  );
}

export function PaginationItem({ children, ...props }) {
  return (
    <li data-slot="pagination-item" {...props}>
      {children}
    </li>
  );
}

/* PaginationLink implemented as forwardRef so refs work and props are forwarded */
export const PaginationLink = React.forwardRef(function PaginationLink(
  { children, isActive = false, size = "icon", className, ...props },
  ref
) {
  const base =
    "inline-flex items-center justify-center rounded-md px-2 py-1 text-sm transition-colors";
  const active = isActive
    ? "bg-gray-200 text-gray-900 font-semibold"
    : "bg-transparent text-gray-700 hover:bg-gray-100";
  const sizeClass = size === "default" ? "h-9 min-w-[3.5rem]" : "h-8 w-8";

  return (
    <a
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive ? "true" : "false"}
      className={cn(base, active, sizeClass, className)}
      {...props}
    >
      {children}
    </a>
  );
});

/* convenience previous/next components */
export function PaginationPrevious({ className, children = null, ...props }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeft className="w-4 h-4" />
      <span className="hidden sm:inline">Previous</span>
    </PaginationLink>
  );
}

export function PaginationNext({ className, children = null, ...props }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:inline">Next</span>
      <ChevronRight className="w-4 h-4" />
    </PaginationLink>
  );
}

export function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="w-4 h-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}
