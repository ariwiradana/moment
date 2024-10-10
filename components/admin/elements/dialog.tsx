// components/Dialog.tsx
import React from "react";
import ButtonPrimary from "./button.primary";
import { BiX } from "react-icons/bi";
import { montserrat } from "@/lib/fonts";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode; // Optional children
}

const Dialog: React.FC<DialogProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ease-in-out duration-500 ${
        open ? "visible opacity-100 delay-200" : "invisible opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b">
          <h2 className={`text-lg font-semibold ${montserrat.className}`}>{title}</h2>
        </div>
        <div className="p-4">{children}</div>
        <div className="p-4 border-t flex justify-end">
          <ButtonPrimary
            icon={<BiX />}
            size="small"
            title="Close"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default Dialog;
