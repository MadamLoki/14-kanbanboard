import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TO DO: return the decoded token
    return jwtDecode(this.getToken());
  }

  loggedIn() {
    // TO DO: return a value that indicates if the user is logged in
    return this.getToken() ? true : false;
  }
  
  isTokenExpired(token: string) {
    // TO DO: return a value that indicates if the token is expired
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : false;
  }

  getToken(): string {
    // TO DO: return the token
    return localStorage.getItem('token') || '';
  }

  login(idToken: string) {
    // TO DO: set the token to localStorage
    localStorage.setItem('token', idToken);
    // TO DO: redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // TO DO: remove the token from localStorage
    localStorage.removeItem('token');
    // TO DO: redirect to the login page
    window.location.assign('/login');
  }
}

export default new AuthService();
