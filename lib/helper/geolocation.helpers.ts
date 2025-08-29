import { toast } from "sonner";

export interface OfficeCoordinates {
  latitude: number;
  longitude: number;
  radius: number;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  address: string;
}

export const checkIfWithinRadius = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  radius: number
): boolean => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  const radiusInKm = radius * 111;
  return distance <= radiusInKm;
};

type FormLocation = {
  latitude: number;
  longitude: number;
  address: string;
  approved: boolean;
};

export const getCurrentLocation = async (
  officeCoordinates: OfficeCoordinates,
  setUserLocation: (location: UserLocation) => void,
  setLocationStatus: (
    status: "idle" | "fetching" | "success" | "error" | "approved"
  ) => void,
  setFormLocation: (location: FormLocation) => void
): Promise<void> => {
  if (!navigator.geolocation) {
    toast.error("Geolocation tidak didukung oleh browser Anda");
    return;
  }

  setLocationStatus("fetching");

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({
        latitude,
        longitude,
        address: "Sedang mendapatkan alamat...",
      });

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        const address = data.display_name || "Alamat tidak ditemukan";

        setUserLocation({ latitude, longitude, address });
        setLocationStatus("success");

        const isWithinRadius = checkIfWithinRadius(
          latitude,
          longitude,
          officeCoordinates.latitude,
          officeCoordinates.longitude,
          officeCoordinates.radius
        );

        if (isWithinRadius) {
          setLocationStatus("approved");
          setFormLocation({
            latitude,
            longitude,
            address,
            approved: true,
          });
          toast.success("Lokasi disetujui! Anda berada di area kantor.");
        } else {
          setFormLocation({
            latitude,
            longitude,
            address,
            approved: false,
          });
          toast.error("Lokasi tidak sesuai. Anda berada di luar area kantor.");
        }
      } catch (error) {
        console.error("Error getting address:", error);
        setLocationStatus("error");
        toast.error("Gagal mendapatkan alamat");
      }
    },
    (error) => {
      console.error("Error getting location:", error);
      setLocationStatus("error");
      toast.error("Gagal mendapatkan lokasi");
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    }
  );
};
