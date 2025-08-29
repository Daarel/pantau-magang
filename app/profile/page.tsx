import { Card, CardContent } from "@/components/Card";
import LayoutWrapper from "@/dump/LayoutWrapper";
import Image from "next/image";

import placeholder from "@/public/landscape-placeholder.svg";

interface PeriodeMagang {
  start: Date;
  end: Date;
}

interface Person {
  namaLengkap: string;
  nomorInduk: number;
}

interface Intern extends Person {
  universitas: string;
  pembimbing: string;
  periodeMagang: PeriodeMagang;
}

interface Supervisor extends Person {
  gedung: string;
}

interface Admin extends Person {
  gedung: string;
}

export default function Profile() {
  const intern: Intern = {
    namaLengkap: "Ani",
    nomorInduk: 2022071064,
    universitas: "Universitas Pembangunan Jaya",
    pembimbing: "Yasdi Pramesti",
    periodeMagang: { start: new Date(2025, 11, 4), end: new Date(2025, 12, 4) },
  };
  const supervisor: Supervisor = {
    namaLengkap: "Budi",
    nomorInduk: 12345678,
    gedung: "Telematika",
  };
  const admin: Admin = {
    namaLengkap: "Mia",
    nomorInduk: 123456,
    gedung: "Pendukung",
  };

  return (
    <LayoutWrapper>
      <h1 className='title_header text-black'>Profil</h1>
      <p className='text-gray-500'>Informasi tentang saya</p>
      <div className='flex justify-center items-center flex-col'>
        <Card>
          <CardContent className='flex flex-col justify-center items-center'>
            <Image
              src={placeholder}
              width='300'
              height='300'
              alt='foto profil Anda'
            />
            <div className='flex flex-row mt-5 gap-10'>
              <ul className='flex flex-col items-start'>
                <li>
                  <p>Nama Lengkap: </p>
                  <p>Nomor Induk: </p>
                  <p>Universitas: </p>
                  <p>Pembimbing: </p>
                  <p>Periode Magang:</p>
                </li>
              </ul>
              <ul>
                <li>
                  <p>{intern.namaLengkap}</p>
                  <p>{intern.nomorInduk}</p>
                  <p>{intern.universitas}</p>
                  <p>{intern.pembimbing}</p>
                  <p>
                    {intern.periodeMagang.start.toDateString()} -{" "}
                    {intern.periodeMagang.end.toDateString()}
                  </p>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutWrapper>
  );
}
