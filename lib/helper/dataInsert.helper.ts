const formatDateToYMD = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const insertDataToLowerCase = <T extends Record<string, any>>(
  data: T
): T => {
  const lowercasedData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      typeof value === "string" ? value.toLowerCase() : value,
    ])
  ) as T;

  return {
    ...lowercasedData,
    ...(data.hasOwnProperty("intern_start_date") && {
      intern_start_date: formatDateToYMD(
        new Date((data as any).intern_start_date)
      ),
    }),
    ...(data.hasOwnProperty("intern_end_date") && {
      intern_end_date: formatDateToYMD(new Date((data as any).intern_end_date)),
    }),
  };
};