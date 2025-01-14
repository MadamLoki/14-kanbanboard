import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      if (!decodedToken.exp) return true;
      return decodedToken.exp < Date.now() / 1000;
    } catch {
      return true;
    }
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token ? 'Token exists' : 'No token found');
    return token || '';
  }

  login(idToken: string) {
    localStorage.setItem('token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('token');
    window.location.assign('/login');
  }
}

export default new AuthService();