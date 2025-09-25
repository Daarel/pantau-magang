export type DataColumn = {
  id: string;
  nomor_induk: number;
  email: string;
  role?: string,
  full_name: string;
  department: string;
  institution?: string;
  supervisor_id?: string;
  intern_start_date?: Date;
  intern_end_date?: Date;
};