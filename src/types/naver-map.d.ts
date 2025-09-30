export {};

declare global {
  namespace naver.maps {
    class LatLng {
      constructor(lat: number, lng: number);
    }
    class Map {
      constructor(el: HTMLElement, opts?: any);
      setCenter(latlng: LatLng): void;
      setZoom(z: number): void;
    }
    class Marker {
      constructor(opts: any);
    }
    const Event: { trigger(target: any, name: string): void };
  }

  interface Window {
    naver?: any;
  }
  const naver: any;
}
