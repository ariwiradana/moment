import useOrderStore from "@/store/useOrderStore";
import React from "react";
import { BiCheck } from "react-icons/bi";
import ButtonSecondary from "../../elements/button.secondary";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const defaultMessage = `<p>Om Swastiastu,</p><p>Dengan Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/Tuhan Yang Maha Esa, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir pada Upacara Manusa Yadnya Pawiwahan (Pernikahan) Putra dan Putri kami.</p><p><br></p><p>Merupakan suatu kebahagiaan dan kehormatan bagi kami jika Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu. Atas kehadiran dan doa restunya, kami sampaikan terima kasih.</p><p>Om Shanti Shanti Shanti Om.</p><p><br></p><p>Undangan dapat dilihat dengan klik link dibawah ini :</p>`;

const OrderSocialDescription = () => {
  const store = useOrderStore();

  const handleUseTemplate = () => {
    store.setFullForm({ ...store.form, social_description: defaultMessage });
    window.scrollBy({ top: 500, behavior: "smooth" });
  };

  return (
    <>
      <div className="border border-dashboard-dark/10 p-4 mb-6">
        <div className="w-3 h-3 rounded-full aspect-square absolute z-10 -top-1 -right-1 animate-ping bg-red-500"></div>
        <p className="text-dashboard-dark/80 text-base">
          <span className="font-semibold text-dashboard-dark">
            Contoh Kalimat: <br />
          </span>
          <br />
          <p>
            <span>Om Swastiastu,</span>
          </p>
          <p>
            <span>
              Dengan Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/Tuhan
              Yang Maha Esa, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk
              hadir pada Upacara Manusa Yadnya Pawiwahan (Pernikahan) Putra dan
              Putri kami.
            </span>
          </p>
          <p>
            <br />
          </p>
          <p>
            <span>
              Merupakan suatu kebahagiaan dan kehormatan bagi kami jika
              Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
              Atas kehadiran dan doa restunya, kami sampaikan terima kasih.
            </span>
          </p>
          <p>
            <span>Om Shanti Shanti Shanti Om.</span>
          </p>
          <p>
            <br />
          </p>
          <p>
            <span>Undangan dapat dilihat dengan klik link dibawah ini :</span>
          </p>
        </p>
        <ButtonSecondary
          className="mt-4"
          icon={<BiCheck />}
          size="small"
          title="Gunakan ini"
          type="button"
          onClick={handleUseTemplate}
        />
      </div>

      <div>
        <label className="block text-dashboard-dark/60 mb-1 text-sm">
          Kalimat
        </label>
        <ReactQuill
          modules={{ toolbar: false }}
          theme="snow"
          value={store.form.social_description}
          onChange={(value) => store.setForm("social_description", value)}
        />
      </div>
    </>
  );
};

export default OrderSocialDescription;
