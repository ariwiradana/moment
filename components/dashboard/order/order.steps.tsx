import { useMemo } from "react";
import OrderLinkPackages from "./components/information";
import OrderEvents from "./components/events";
import OrderGroom from "./components/groom";
import OrderBride from "./components/bride";
import OrderMedia from "./components/media";
import OrderGift from "./components/gift";
import OrderOpeningClosing from "./components/opening.closing";
import useOrderStore from "@/store/useOrderStore";
import {
  BiCalendar,
  BiImage,
  BiGift,
  BiMessageSquareDetail,
  BiCreditCard,
  BiLayout,
  BiMaleSign,
  BiFemaleSign,
} from "react-icons/bi";
import OrderPayment from "./components/payment";

export default function useSteps() {
  const store = useOrderStore();
  const pkgName = store.pkg?.name;

  const steps = useMemo(() => {
    const baseSteps = [
      {
        stepTitle: "Informasi Undangan",
        stepDescription: "Atur informasi undanganmu.",
        title: "Atur Informasi Undanganmu",
        description:
          "Isi nama dan nomor WhatsApp yang bisa dihubungi, tentukan link undanganmu, lalu pilih paket yang paling sesuai dengan gaya acara spesialmu.",
        component: <OrderLinkPackages />,
        icon: <BiLayout />,
      },
      {
        stepTitle: "Detail Acara",
        stepDescription: "Isi tanggal dan lokasi acara.",
        title: "Lengkapi Detail Acara",
        description: `Bagikan detail penting acara. Isi tanggal, waktu, dan lokasi agar tamu tahu kapan dan di mana acara berlangsung.${
          store.pkg
            ? ` Kamu bisa menambahkan ${store.pkg.max_events} acara pada undanganmu.`
            : ""
        }`,
        component: <OrderEvents />,
        icon: <BiCalendar />,
      },
      {
        stepTitle: "Mempelai Pria",
        stepDescription: "Lengkapi data mempelai pria.",
        title: "Data Mempelai Pria",
        description:
          "Perkenalkan sang mempelai pria. Lengkapi nama, foto, dan informasi singkat mempelai pria.",
        component: <OrderGroom />,
        icon: <BiMaleSign />,
      },
      {
        stepTitle: "Mempelai Wanita",
        stepDescription: "Lengkapi data mempelai wanita.",
        title: "Data Mempelai Wanita",
        description:
          "Kini giliran sang mempelai wanita. Lengkapi data mempelai wanita agar undanganmu terasa lebih personal.",
        component: <OrderBride />,
        icon: <BiFemaleSign />,
      },
      {
        stepTitle: "Media Pendukung",
        stepDescription: "Unggah media pendukung.",
        title: "Tambahkan Media Pendukung",
        description: `Tambahkan sentuhan visual. Kamu dapat menambahkan hingga ${
          store.pkg?.max_gallery_photos
        } foto ${
          pkgName !== "Basic" ? `dan ${store.pkg?.max_videos} video` : ""
        } untuk paket yang kamu pilih.`,
        component: <OrderMedia />,
        icon: <BiImage />,
      },
    ];

    if (pkgName !== "Basic") {
      baseSteps.push({
        stepTitle: "Amplop Digital",
        stepDescription: "Aktifkan fitur hadiah online.",
        title: "Aktifkan Amplop Digital",
        description:
          "Beri kemudahan bagi tamu. Aktifkan fitur amplop digital agar tamu bisa memberi hadiah dengan mudah.",
        component: <OrderGift />,
        icon: <BiGift />,
      });
    }

    baseSteps.push(
      {
        stepTitle: "Pembuka & Penutup",
        stepDescription: "Salam pembuka & penutup.",
        title: "Tambahkan Salam Pembuka & Penutup",
        description:
          "Kamu dapat menyesuaikan kalimat pembuka dan penutup undangan sesuai keinginan.",
        component: <OrderOpeningClosing />,
        icon: <BiMessageSquareDetail />,
      },
      {
        stepTitle: "Pembayaran",
        stepDescription: "Lanjutkan ke Pembayaran.",
        title: "Pembayaran",
        description:
          "Langkah terakhir sebelum undanganmu aktif! 💌 Tenang, kamu masih bisa revisi nanti — dan kamu akan dihubungi setelah pembayaran berhasil.",
        component: <OrderPayment />,
        icon: <BiCreditCard />,
      }
    );

    return baseSteps;
  }, [store.pkg]);

  return steps;
}
