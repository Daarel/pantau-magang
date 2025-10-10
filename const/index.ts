import {
  FaUser,
  FaUserTie,
  FaIdCardAlt,
  FaBuilding,
  FaLock,
  FaCalendarAlt,
} from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsHouse } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";
import { PiPassword } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { HiDocumentChartBar } from "react-icons/hi2";

import type { IconType } from "react-icons";

type InputType = "text" | "number" | "date";

type ModalField = {
  name: string;
  label: string;
  placeholder: string;
  type?: InputType;
  Icon: IconType;
};

// Untuk input modal di admin/supervisor
const supervisorModalInput: ModalField[] = [
  {
    name: "nama",
    label: "Nama Supervisor",
    placeholder: "Masukkan nama",
    Icon: FaUser,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Masukkan Email",
    Icon: MdEmail,
  },
  {
    name: "nomorIndukPerusahaan",
    label: "NIP",
    placeholder: "Masukkan nomor induk perusahaan",
    type: "number",
    Icon: FaIdCardAlt,
  },
  {
    name: "gedung",
    label: "Gedung",
    placeholder: "Masukkan gedung",
    Icon: FaBuilding,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Masukkan password",
    Icon: FaLock,
  },
];

// Untuk input modal di admin/user
const internModalInput: ModalField[] = [
  {
    name: "nama",
    label: "Nama User",
    placeholder: "Masukkan nama lengkap",
    Icon: FaUser,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Masukkan Email",
    Icon: MdEmail,
  },
  {
    name: "nomorInduk",
    label: "NIM/NIS",
    placeholder: "Masukkan nomor induk",
    type: "number",
    Icon: FaIdCardAlt,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Masukkan password",
    Icon: FaLock,
  },
  {
    name: "gedung",
    label: "Gedung",
    placeholder: "Masukkan gedung",
    Icon: FaBuilding,
  },
  {
    name: "pembimbing",
    label: "Pembimbing",
    placeholder: "Masukkan Pembimbing",
    Icon: FaUserTie,
  },
  {
    name: "mulaiMagang",
    label: "Mulai Magang",
    placeholder: "Masukkan tanggal masuk magang",
    type: "date",
    Icon: FaCalendarAlt,
  },
  {
    name: "selesaiMagang",
    label: "Selesai Magang",
    placeholder: "Masukkan tanggal selesai magang",
    type: "date",
    Icon: FaCalendarAlt,
  },
];

type MenuByRole = {
  title: string;
  path: string;
  Icon: IconType;
};

// untuk menu sidebar intern
const internMenu: MenuByRole[] = [
  { title: "Dashboard", path: "/intern/dashboard", Icon: BsHouse },
  // { title: "Attendance", path: "/intern/attendance", Icon: AiOutlineClockCircle,},
  { title: "History", path: "/intern/history", Icon: FiCalendar },
  { title: "Record", path: "/intern/record", Icon: IoDocumentTextOutline },
];

// untuk menu sidebar supervisor
const supervisorMenu: MenuByRole[] = [
  { title: "Dashboard", path: "/supervisor/dashboard", Icon: BsHouse },
  {
    title: "Attendance",
    path: "/supervisor/attendance",
    Icon: AiOutlineClockCircle,
  },
  { title: "Inbox", path: "/supervisor/inbox", Icon: FaRegFileAlt },
];

// untuk menu sidebar admin
const adminMenu: MenuByRole[] = [
  { title: "Dashboard", path: "/admin/dashboard", Icon: BsHouse },
  { title: "Intern", path: "/admin/intern", Icon: FaUser },
  { title: "Supervisor", path: "/admin/supervisor", Icon: FaUserTie },
  { title: "Histori Perubahan", path: "/admin/histori-perubahan", Icon: HiDocumentChartBar },
];

export type Gedung =
  | "Aplikasi 1"
  | "Aplikasi 2"
  | "Aplikasi 3"
  | "Arsip"
  | "BBSP"
  | "Eksplorasi 1"
  | "Eksplorasi 2"
  | "Eksplorasi 3"
  | "Eksploitasi"
  | "Forum Teknologi"
  | "Klinik"
  | "Pendukung"
  | "Proses"
  | "Sarana Litbang"
  | "Teknologi Gas"
  | "Telematika";

export type selectGedung = {
  value: string;
  label: Gedung;
};

const pilihanGedung: selectGedung[] = [
  {
    value: "aplikasi 1",
    label: "Aplikasi 1",
  },
  {
    value: "aplikasi 2",
    label: "Aplikasi 2",
  },
  {
    value: "aplikasi 3",
    label: "Aplikasi 3",
  },
  {
    value: "arsip",
    label: "Arsip",
  },
  {
    value: "bbsp",
    label: "BBSP",
  },
  {
    value: "eksplorasi 1",
    label: "Eksplorasi 1",
  },
  {
    value: "eksplorasi 2",
    label: "Eksplorasi 2",
  },
  {
    value: "eksplorasi 3",
    label: "Eksplorasi 3",
  },
  {
    value: "eksploitasi",
    label: "Eksploitasi",
  },
  {
    value: "forum teknologi",
    label: "Forum Teknologi",
  },
  {
    value: "klinik",
    label: "Klinik",
  },
  {
    value: "pendukung",
    label: "Pendukung",
  },
  {
    value: "proses",
    label: "Proses",
  },
  {
    value: "sarana litbang",
    label: "Sarana Litbang",
  },
  {
    value: "teknologi gas",
    label: "Teknologi Gas",
  },
  {
    value: "telematika",
    label: "Telematika",
  },
];

export {
  supervisorModalInput,
  internModalInput,
  internMenu,
  supervisorMenu,
  adminMenu,
  pilihanGedung,
};
