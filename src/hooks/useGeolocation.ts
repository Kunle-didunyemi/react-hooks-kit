import { useEffect, useState } from "react";

/** Tracks geolocation position and errors. */
export function useGeolocation(options?: PositionOptions) {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(setPosition, setError, options);
    return () => navigator.geolocation.clearWatch(watchId);
  }, [options]);
  return { position, error };
}
