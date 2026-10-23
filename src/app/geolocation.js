/**
 * Follows the device location (navigator.geolocation.watchPosition, high
 * accuracy). The browser asks for permission the first time. Errors are
 * reported as 'denied' (permission refused) or 'unavailable' (no location
 * hardware, no fix, insecure page); the watch keeps running after a timeout.
 *
 * @param {(fix: { lat: number, lng: number, accuracy: number, heading: number | null, speed: number | null, time: number }) => void} onFix
 * @param {(error: 'denied' | 'unavailable') => void} onError
 * @returns {() => void} stops watching
 */
export function watchLocation(onFix, onError) {
  const geo = typeof navigator !== 'undefined' ? navigator.geolocation : null;
  if (!geo || (typeof isSecureContext !== 'undefined' && !isSecureContext)) {
    queueMicrotask(() => onError('unavailable'));
    return () => {};
  }
  const id = geo.watchPosition(
    ({ coords, timestamp }) =>
      onFix({
        lat: coords.latitude,
        lng: coords.longitude,
        accuracy: coords.accuracy,
        // degrees clockwise from north, only while moving
        heading: Number.isFinite(coords.heading) && coords.speed > 0.3 ? coords.heading : null,
        speed: coords.speed,
        time: timestamp,
      }),
    (err) => onError(err.code === err.PERMISSION_DENIED ? 'denied' : 'unavailable'),
    { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 },
  );
  return () => geo.clearWatch(id);
}
