
export function Logout() {
  localStorage.removeItem('token');

  window.location = "/auth/sigin";
}

export default Logout;
