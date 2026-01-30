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
