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
    description: "Bebas melakukan revisi tanpa batasan pada undangan Anda.",
  },
  {
    title: "Tamu Tidak Terbatas",
    icon: <TbUsersGroup />,
    description: "Tambahkan tamu sebanyak yang Anda inginkan tanpa batasan.",
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
    description:
      "Buat dan kelola berbagai acara dalam satu undangan tanpa batas.",
  },
  {
    title: "Hitung Mundur Waktu",
    icon: <TbClock />,
    description: "Fitur hitung mundur waktu berdasarkan tanggal acaramu.",
  },
  {
    title: "Galeri Foto",
    icon: <TbGraph />,
    description: "Unggah hingga 20 foto untuk mempercantik undangan Anda.",
  },
  {
    title: "Rekaman Video",
    icon: <TbVideo />,
    description: "Sertakan hingga 2 video untuk menambahkan elemen multimedia.",
  },
  {
    title: "Kontak Media Sosial",
    icon: <TbSocial />,
    description: "Integrasikan akun media sosial Anda untuk kemudahan akses.",
  },
  {
    title: "Musik Latar",
    icon: <TbMusic />,
    description: "Tambahkan musik latar untuk meningkatkan suasana undangan.",
  },
  {
    title: "RSVP & Ucapan",
    icon: <TbCalendar />,
    description: "Fasilitasi tamu untuk memberikan tanggapan dan ucapan.",
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
    description: "Pilih gambar penutup undangan yang sesuai dengan tema.",
  },
  {
    title: "Amplop Digital",
    icon: <TbGift />,
    description: "Kirim undangan dalam bentuk amplop digital yang menarik.",
  },
];
