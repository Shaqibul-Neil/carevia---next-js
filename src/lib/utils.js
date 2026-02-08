import { clsx } from "clsx";
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Loading Alert
export const showLoadingAlert = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: "info",
    iconColor: "#16a34a",
    background: "#fff",
    color: "#1e293b",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
    customClass: {
      popup: "rounded-3xl shadow-2xl border border-green-100",
      title: "text-slate-800 font-bold",
      htmlContainer: "text-slate-600",
    },
  });
};

// Success Alert
export const showSuccessAlert = (title, text) => {
  return Swal.fire({
    title: title || "Success!",
    text: text || "",
    icon: "success",
    iconColor: "#16a34a",
    confirmButtonColor: "#16a34a",
    background: "#ffffff",
    color: "#1e293b",
    customClass: {
      popup: "rounded-3xl shadow-2xl border border-green-100",
      title: "text-slate-800 font-bold",
      confirmButton: "rounded-xl px-6 py-3 font-bold",
    },
  });
};

// Error Alert
export const showErrorAlert = (title, text) => {
  return Swal.fire({
    title: title || "Error!",
    text: text || "Something went wrong",
    icon: "error",
    iconColor: "#ef4444",
    confirmButtonColor: "#16a34a",
    background: "#ffffff",
    color: "#1e293b",
    customClass: {
      popup: "rounded-3xl shadow-2xl border border-red-100",
      title: "text-slate-800 font-bold",
      confirmButton: "rounded-xl px-6 py-3 font-bold",
    },
  });
};

//Calculating total price
export const calculateTotalPrice = ({
  durationType,
  quantity,
  division,
  service,
}) => {
  if (!durationType || !quantity) return 0;

  let basePrice = 0;

  if (durationType === "days") {
    basePrice = parseInt(quantity) * service.price.perDay;
  }

  if (durationType === "hours") {
    basePrice = parseInt(quantity) * service.price.perHour;
  }

  const isOutsideCoverage =
    division && !service.locationCoverage.supportedDivisions.includes(division);

  return isOutsideCoverage ? basePrice + 500 : basePrice;
};

//pagination logic
export const generatePagination = (currentPage, totalPage) => {
  let pages = [];
  // Always show page 1
  pages.push(1);
  if (currentPage >= 1) {
    // If we are on any valid page
    // Loop starts from page 2
    // It goes until (currentPage + 1)
    for (let i = 2; i <= currentPage + 1; i++) {
      // If total pages are more than 2
      // And current loop page does not exceed total pages
      if (i <= totalPage) {
        pages.push(i);
      }
    }
  }
  // Get the last page number we added so far
  const lastNumber = pages[pages.length - 1];

  // If there is a gap between current pages and last page
  // Show ellipsis to indicate skipped pages
  if (lastNumber < totalPage - 1) {
    pages.push("....");
  }
  // Always show the last page
  // But only if it's not already added
  if (!pages.includes(totalPage) && currentPage < totalPage) {
    pages.push(totalPage);
  }
  return pages;
};
