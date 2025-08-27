import {
  FaUser,
  FaUserTie,
  FaIdCardAlt,
  FaBuilding,
  FaLock,
  FaCalendarAlt,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { DataColumn } from "./dummy";

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

// Untuk data intern table di admin/user
export const columns: ColumnDef<DataColumn>[] = [
  {
    accessorKey: "nomorInduk",
    header: "Nomor Induk",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("nomorInduk")}</div>
    ),
  },
  {
    accessorKey: "namaLengkap",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Lengkap
          <LuArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='lowercase'>{row.getValue("namaLengkap")}</div>
    ),
  },
  {
    accessorKey: "password",
    header: "Password",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("password")}</div>
    ),
  },
  {
    accessorKey: "gedung",
    header: "Gedung",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("gedung")}</div>
    ),
  },
  {
    accessorKey: "pembimbing",
    header: "Pembimbing",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("pembimbing")}</div>
    ),
  },
  {
    accessorKey: "mulaiMagang",
    header: "Mulai Magang",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("mulaiMagang")}</div>
    ),
  },
  {
    accessorKey: "selesaiMagang",
    header: "Selesai Magang",
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue("selesaiMagang")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <RiMoreFill />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>
              <RiEdit2Line />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RiDeleteBin6Fill className="text-red-500"/>
              <span className="text-red-500">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


export { supervisorModalInput, internModalInput };
