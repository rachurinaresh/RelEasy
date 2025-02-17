import jwtDecode from "jwt-decode";
import { authClaims } from "../models/authentication/authClaims";

export class UserService {
  static get isLoggedIn(): boolean {
    return localStorage.getItem("access_token") ? true : false;
  }

  static get accessToken(): string | null {
    return localStorage.getItem("access_token");
  }

  static set accessToken(token: string | null) {
    token && localStorage.setItem("access_token", token);
  }

  static get getClaims(): authClaims | null {
    let token = localStorage.getItem("access_token");
    return token ? jwtDecode<authClaims>(token) : null;
  }

  static logOut() {
    localStorage.removeItem("access_token");
    window.location.replace("/login");
  }

  static logIn(tokenResponse: any) {
    this.accessToken = tokenResponse?.token;
  }
}
