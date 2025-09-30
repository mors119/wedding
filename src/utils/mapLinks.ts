export function kakaoToLink(name: string, lat: number, lng: number) {
  // 카카오 길찾기(웹) – 앱 있으면 앱이 열리는 경우도 많음
  return `https://map.kakao.com/link/to/${encodeURIComponent(
    name,
  )},${lat},${lng}`;
}

export function googleDirections(lat: number, lng: number) {
  // 크로스플랫폼(안드로이드/데스크톱 모두 OK)
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
}

export function naverSearch(name: string) {
  // 정확한 placeId 없을 때는 검색 링크가 안전
  return `https://map.naver.com/v5/search/${encodeURIComponent(name)}`;
}

export function tDirections(name: string, lat: number, lng: number) {
  return `tmap://route?rGoName=${encodeURIComponent(
    name,
  )}&rGoX==${lat}&rGoY=${lng}`;
}
