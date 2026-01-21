"use client";

import Modal from "@mui/material/Modal";
import Cropper, { Area } from "react-easy-crop";
import { useState } from "react";
import { getCroppedImg } from "@/utils/cropImage";
import { redhat } from "@/lib/fonts";
import ButtonPrimary from "../elements/button.primary";
import ButtonSecondary from "../elements/button.secondary";
import { BiCheck, BiX, BiZoomIn, BiZoomOut } from "react-icons/bi";

type Props = {
  open: boolean;
  imageSrc: string | null;
  onClose: () => void;
  onSave: (result: string) => void;
};

export function ModalCropImage({ open, imageSrc, onClose, onSave }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  const handleSave = async () => {
    if (!imageSrc || !croppedArea) return;
    const cropped = await getCroppedImg(imageSrc, croppedArea);
    onSave(cropped);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center">
        {/* overlay */}

        {/* modal content */}
        <div className="relative bg-white max-w-md w-full rounded-xl p-4 z-10">
          <h3 className={`font-semibold mb-3 text-lg ${redhat.className}`}>
            Crop Foto
          </h3>

          <div className="relative w-full h-96 bg-dashboard-dark rounded">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="rect"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, area) => setCroppedArea(area)}
              />
            )}
          </div>

          <div className="flex justify-center gap-x-3 items-center mt-3">
            <BiZoomOut className="size-6 text-dashboard-dark" />
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-dashboard-primary"
            />
            <BiZoomIn className="size-6 text-dashboard-dark" />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <ButtonSecondary
              size="small"
              icon={<BiX />}
              title="Batal"
              onClick={onClose}
              type="button"
            />
            <ButtonPrimary
              size="small"
              icon={<BiCheck />}
              title="Simpan"
              onClick={handleSave}
              type="button"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
