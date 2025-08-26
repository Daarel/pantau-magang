import {
  FaUser,
  FaUserTie,
  FaIdCardAlt,
  FaBuilding,
  FaLock,
  FaCalendarAlt,
} from "react-icons/fa";
import { IconType } from "react-icons";

type InputType = "text" | "number" | "date";

type ModalField = {
  name: string;
  label: string;
  placeholder: string;
  type?: InputType;
  Icon: IconType;
};

const supervisorModalInput: ModalField[] = [
  {
    name: "nama",
    label: "Nama Supervisor",
    placeholder: "Masukkan nama",
    Icon: FaUser,
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

const internModalInput: ModalField[] = [
  {
    name: "nama",
    label: "Nama User",
    placeholder: "Masukkan nama lengkap",
    Icon: FaUser,
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
    Icon: FaCalendarAlt,
  },
  {
    name: "selesaiMagang",
    label: "Selesai Magang",
    placeholder: "Masukkan tanggal selesai magang",
    Icon: FaCalendarAlt,
  },
];

export { supervisorModalInput, internModalInput };
