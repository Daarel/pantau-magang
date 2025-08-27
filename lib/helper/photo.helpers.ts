export const uploadPhoto = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    resolve(objectUrl);
  });
};