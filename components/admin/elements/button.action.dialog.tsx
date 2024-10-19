import React, { FC, ReactNode, useState, useEffect, useRef } from "react";
import ButtonSecondaryIcon from "./button.secondary.icon";
import { BiDotsVertical } from "react-icons/bi";

interface Props {
  children?: ReactNode;
}

const ButtonActionDialog: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChildClick = () => {
    setIsOpen(false);
  };

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
            ref={dialogRef}
            className="bg-white absolute top-10 right-0 rounded border z-20 shadow flex flex-col divide-y"
          >
            <div
              className="relative z-50 w-full flex flex-col"
              onClick={handleChildClick}
            >
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ButtonActionDialog;
