type Building = "Telematika" | "Arsip" | "Eksploitasi I" | "Forum Teknologi"; // comming soon.

export type DataColumn = {
  id: string;
  nomorInduk: number;
  namaLengkap: string;
  password: string;
  gedung: Building;
  pembimbing?: string;
  mulaiMagang?: string;
  selesaiMagang?: string;
};

export const dataColumnIntern: DataColumn[] = [
  {
    id: "m5gr84i9",
    nomorInduk: 2022071064,
    namaLengkap: "Daarel Safa Fatillah",
    password: "daarel123",
    gedung: "Telematika",
    pembimbing: "Yasdi Pramesti",
    mulaiMagang: "12-02-2024",
    selesaiMagang: "12-04-2025",
  },
  {
    id: "3u1reuv4",
    nomorInduk: 2022071012,
    namaLengkap: "Dika Arnanda Putra",
    password: "dika123",
    gedung: "Telematika",
    pembimbing: "Yasdi Pramesti",
    mulaiMagang: "12-02-2024",
    selesaiMagang: "12-04-2025",
  },
  {
    id: "derv1ws0",
    nomorInduk: 2022071014,
    namaLengkap: "Gregorius Rizcy Orlando Pradana",
    password: "grego123",
    gedung: "Telematika",
    pembimbing: "Yasdi Pramesti",
    mulaiMagang: "12-02-2024",
    selesaiMagang: "12-04-2025",
  },
  {
    id: "5kma53ae",
    nomorInduk: 20324329223,
    namaLengkap: "M Bagas",
    password: "bagas123",
    gedung: "Telematika",
    pembimbing: "Yasdi Pramesti",
    mulaiMagang: "12-02-2024",
    selesaiMagang: "12-04-2025",
  },
  {
    id: "bhqecj4p",
    nomorInduk: 2022242342,
    namaLengkap: "John Doe",
    password: "john123",
    gedung: "Telematika",
    pembimbing: "Yasdi Pramesti",
    mulaiMagang: "12-02-2024",
    selesaiMagang: "12-04-2025",
  },
];

export const dataColumnSupervisor: DataColumn[] = [
  {
    id: "m5gr84i91",
    nomorInduk: 2022071064,
    namaLengkap: "Daarel Safa Fatillah",
    password: "daarel123",
    gedung: "Telematika",
  },
  {
    id: "3u1reuv41",
    nomorInduk: 2022071012,
    namaLengkap: "Dika Arnanda Putra",
    password: "dika123",
    gedung: "Telematika",
  },
  {
    id: "derv1ws01",
    nomorInduk: 2022071014,
    namaLengkap: "Gregorius Rizcy Orlando Pradana",
    password: "grego123",
    gedung: "Telematika",
  },
  {
    id: "5kma53ae1",
    nomorInduk: 20324329223,
    namaLengkap: "M Bagas",
    password: "bagas123",
    gedung: "Telematika",
  },
  {
    id: "bhqecj4p1",
    nomorInduk: 2022242342,
    namaLengkap: "John Doe",
    password: "john123",
    gedung: "Telematika",
  },
];
