export const sessionStorageService = (() => {
  function setAccessToken(tokenObj) {
    sessionStorage.setItem("access_token", tokenObj);
  }
  function setCurrentRole(tokenObj) {
    sessionStorage.setItem("current_role", tokenObj);
  }
  function setRefreshToken(tokenObj) {
    sessionStorage.setItem("refresh_token", tokenObj);
  }
  function setLanguage(tokenObj) {
    sessionStorage.setItem("lang", tokenObj);
  }
  function getLanguage() {
    return sessionStorage.getItem("lang");
  }
  function getAccessToken() {
    return sessionStorage.getItem("access_token");
  }
  function getCurrentRole() {
    return sessionStorage.getItem("current_role");
  }
  function getRefreshToken() {
    return sessionStorage.getItem("refresh_token");
  }
  function clearToken() {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("current_role");
  }
  return {
    returnSetAccessToken: setAccessToken,
    returnSetRefreshToken: setRefreshToken,
    returnGetAccessToken: getAccessToken,
    returnGetRefreshToken: getRefreshToken,
    returnClearToken: clearToken,
    returnGetCurrentRole: getCurrentRole,
    returnSetCurrentRole: setCurrentRole,
    returnSetLanguage: setLanguage,
    returnGetLanguage: getLanguage,
  };
})();
