export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(key, token) {
  return localStorage.setItem(key, token);
}

export function removeToken() {
  return localStorage.removeItem("token");
}
