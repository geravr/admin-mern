const TOKEN_KEY_ACCESS = "tknacc";
const TOKEN_KEY_REFRESH = "tknref";

export const setTokenLS = (token) => {
  localStorage.setItem(TOKEN_KEY_ACCESS, token.access);
  if (token.refresh !== undefined) {
    localStorage.setItem(TOKEN_KEY_REFRESH, token.refresh);
  }
};

export const getAccessTokenLS = () => {
  return localStorage.getItem(TOKEN_KEY_ACCESS);
};

export const getRefreshTokenLS = () => {
  return localStorage.getItem(TOKEN_KEY_REFRESH);
};

export const deleteTokenLS = () => {
  localStorage.removeItem(TOKEN_KEY_ACCESS);
  localStorage.removeItem(TOKEN_KEY_REFRESH);
};