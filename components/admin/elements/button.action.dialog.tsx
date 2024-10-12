import React, { FC, ReactNode, useState, useEffect, useRef } from "react";
import ButtonSecondaryIcon from "./button.secondary.icon";
import { BiDotsVertical } from "react-icons/bi";

interface Props {
  children?: ReactNode;
}

const ButtonActionDialog: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDivElement>(null); // Create a ref for the dialog

  // Effect to handle click outside the dialog
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close the dialog if the click is outside
      }
    };

    // Attach event listener to document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex">
      <div className="relative">
        <ButtonSecondaryIcon
          onClick={() => setIsOpen((prevState) => !prevState)}
          size="extrasmall"
          title="Action"
          icon={<BiDotsVertical className="text-base" />}
        />
        {isOpen && (
          <div
            ref={dialogRef} // Attach the ref to the dialog
            className="bg-white absolute top-10 right-0 rounded border z-20 shadow flex flex-col divide-y"
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default ButtonActionDialog;
