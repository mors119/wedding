export {};

declare global {
  interface Window {
    naver?: any;
    __NAVER_MAPS_LOADING__?: Promise<void>;
  }
  const naver: any;
}
