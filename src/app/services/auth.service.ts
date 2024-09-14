import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http:HttpClient )   { }

    // BehaviorSubject to track login status
    private loggedIn = new BehaviorSubject<boolean>(false);
    private roles = new BehaviorSubject<string | null>(null);
    
    public roles$ = this.roles.asObservable()
    public isLoggedIn$ = this.loggedIn.asObservable();

    
      // Helper method to check if localStorage is available
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  register(signupDetails:any){ 
    return this.http.post("http://localhost:8087/api/v1/secondprojects/register",signupDetails );
  }

  login(loginDetails:any){
    return this.http.post("http://localhost:8087/api/v1/secondprojects/login",loginDetails ).pipe(
      catchError(this.handleError)
    );
  }

    // This method is called when login is successful
    handleLoginSuccess(token: string) {
      if (this.isBrowser()) {
        // Store the token in localStorage
        localStorage.setItem('authToken', token);

        const decodedToken: any = jwtDecode(token);

        // Get the first role from the 'roles' array
        const role = decodedToken?.roles?.[0] || null; // Safely extract the role
        this.roles.next(role);
        // Update the login status
        this.loggedIn.next(true);
      }
    }
  
    // This method is used to log the user out
    logout() {
      // Remove the token from localStorage
      localStorage.removeItem('authToken');

      this.roles.next(null);
      // Update the login status
      this.loggedIn.next(false);
    }
  
    // This method checks if a user is already logged in (based on stored token)
    checkAuthStatus() {
      if (this.isBrowser()) {
        const token = localStorage.getItem('authToken');
        if (token) {
          // If a token exists, set the login status to true
          this.loggedIn.next(true);

          const decodedToken: any = jwtDecode(token);
          const role = decodedToken?.roles?.[0] || null; // Safely extract the role
          this.roles.next(role); // Update the role in the BehaviorSubject
        }
      } 
    }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 403) {
        errorMessage = 'Incorrect credentials. Please try again.';
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }
}
