export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

export function setRefreshToken(refreshToken: string) {
  localStorage.setItem("refreshToken", refreshToken);
  document.cookie = `accessToken=${localStorage.getItem("accessToken")}`;
}

export function deleteRefreshToken() {
  localStorage.removeItem("refreshToken");
}
