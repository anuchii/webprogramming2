
export class StateManager {


  static setToken(token: string | null) {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }

  static getToken(): string | null {
    return sessionStorage.getItem("token");
  }

  
  static setUserId(uid: string | null) {
    if (uid) {
      sessionStorage.setItem("userId", uid);
    } else {
      sessionStorage.removeItem("userId");
    }
  }


  static getUserId(): string | null {
    return sessionStorage.getItem("userId");
  }


  static isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

 
  static clear() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
  }
}
