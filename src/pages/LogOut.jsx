export const LogOut = () => {
  localStorage.clear("karg_atelier_token");
  window.location.replace("/login");
};
