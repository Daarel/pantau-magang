// export const uploadPhoto = async (file: File): Promise<string> => {
//   return new Promise((resolve) => {
//     const objectUrl = URL.createObjectURL(file);
//     resolve(objectUrl);
//   });
// };

// export const uploadFile = async (file: File): Promise<string> => {
//   return new Promise((resolve) => {
//     const objectUrl = URL.createObjectURL(file);
//     resolve(objectUrl);
//   });
// };
import {createClient} from '@/lib/supabase/client';

export const uploadPhoto = async (file: File): Promise<string> => {
  const supabase = createClient();
  const fileName = `${Date.now()}-${file.name}`;
  
  const { data, error } = await supabase.storage
    .from('attendance_file')
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('attendance_file')
    .getPublicUrl(fileName);

  return publicUrl;
};

export const uploadFile = async (file: File): Promise<string> => {
  const supabase = createClient();
  const fileName = `${Date.now()}-${file.name}`;
  
  const { data, error } = await supabase.storage
    .from('attendance_file')
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('attendance_file')
    .getPublicUrl(fileName);

  return publicUrl;
};