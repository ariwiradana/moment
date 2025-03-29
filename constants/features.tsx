import { ReactNode } from "react";
import {
  TbCalendar,
  TbCalendarPlus,
  TbClock,
  TbGift,
  TbGraph,
  TbMap,
  TbMusic,
  TbPencilPlus,
  TbPictureInPictureTop,
  TbSocial,
  TbTextCaption,
  TbTimelineEventText,
  TbUsersGroup,
  TbVideo,
} from "react-icons/tb";

export type Feature = {
  title: string;
  icon: ReactNode;
  description: string;
};

export const features: Feature[] = [
  {
    title: "Revisi Tidak Terbatas",
    icon: <TbPencilPlus />,
    description: "Bebas melakukan revisi tanpa batasan pada undangan kamu.",
  },
  {
    title: "Tamu Tidak Terbatas",
    icon: <TbUsersGroup />,
    description: "Bebas menambahkan tamu sebanyak yang kamu inginkan.",
  },
  {
    title: "Kalimat Pembuka & Penutup",
    icon: <TbTextCaption />,
    description:
      "Kustomisasi kalimat pembuka & penutup seperti yang kamu inginkan.",
  },
  {
    title: "Acara Tak Terbatas",
    icon: <TbTimelineEventText />,
    description: "Kelola hinga 3 acara dalam satu undangan tanpa batas.",
  },
  {
    title: "Hitung Mundur Waktu",
    icon: <TbClock />,
    description: "Fitur hitung mundur waktu berdasarkan tanggal acaramu.",
  },
  {
    title: "Galeri Foto",
    icon: <TbGraph />,
    description: "Unggah hingga 20 foto untuk menambah estetika undangan kamu.",
  },
  {
    title: "Rekaman Video",
    icon: <TbVideo />,
    description: "Sertakan hingga 2 video untuk menambahkan momen undanganmu.",
  },
  {
    title: "Kontak Media Sosial",
    icon: <TbSocial />,
    description: "Integrasikan akun media sosial pada undanganmu.",
  },
  {
    title: "Musik Latar",
    icon: <TbMusic />,
    description: "Tambahkan musik latar untuk meningkatkan suasana undangan.",
  },
  {
    title: "RSVP & Ucapan",
    icon: <TbCalendar />,
    description: "Fasilitasi tamu untuk memberikan kehadiran dan ucapan.",
  },
  {
    title: "Terintegrasi Google Maps",
    icon: <TbMap />,
    description: "Tampilkan lokasi acara dengan integrasi Google Maps.",
  },
  {
    title: "Fitur Tambahkan ke Kalender",
    icon: <TbCalendarPlus />,
    description: "Izinkan tamu untuk menambahkan acara ke kalender mereka.",
  },
  {
    title: "Pilih Cover Foto Undangan",
    icon: <TbPictureInPictureTop />,
    description: "Pilih foto cover yang sesuai dengan tema undanganmu.",
  },
  {
    title: "Amplop Digital",
    icon: <TbGift />,
    description: "Tambahkan fitur hadiah digital dalam undanganmu.",
  },
];
