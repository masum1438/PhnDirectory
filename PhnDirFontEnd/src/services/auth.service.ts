import { Injectable } from '@angular/core';
//import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { RegisterRequest, LoginRequest, AuthResponse } from '../models/auth.model';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


export interface User {
  email: string;
  role: string[]; // always store as array for consistency
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Auto-load user from stored token
    const token = this.getToken();
    if (token) {
      this.decodeToken(token);
    }
  }

  // ✅ Register
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      map((res) => {
        this.saveToken(res.token, res.userRoles);
        this.decodeToken(res.token);
        return res;
      })
    )
  }

  // ✅ Login
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      map((res) => {
        this.saveToken(res.token, res.userRoles);
        this.decodeToken(res.token);
        return res;
      })
    );
  }

  // ✅ Logout
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRoles');
    this.currentUserSubject.next(null);
  }

  // ✅ Save token & roles
  public saveToken(token: string, roles: string[]) {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userRoles", JSON.stringify(roles));
  }

  // ✅ Get token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // ✅ Get roles
  getRoles(): string[] {
    const roles = localStorage.getItem('userRoles');
    return roles ? JSON.parse(roles) : [];
  }

  // ✅ Check login
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ✅ Assign role (Admin feature)
 assignRole(userEmail: string, role: string): Observable<any> {
  const token = this.getToken();
  if (!token) {
    throw new Error('User is not logged in');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  // If backend expects query params:
  const params = new HttpParams()
    .set('Email', userEmail)
    .set('userRole', role);

  // If backend expects body (like your curl example), you can also send JSON:
  const body = { email: userEmail, userRole: role };

  return this.http.post(`${this.apiUrl}/roleassign`, body, { headers });
}

  // ✅ Decode token & set current user
  private decodeToken(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      // Use correct role claim key from backend JWT
      const roleClaimKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

      const user: User = {
        email: payload['email'], // always available
        role: Array.isArray(payload[roleClaimKey])
          ? payload[roleClaimKey]       // multiple roles
          : [payload[roleClaimKey]]     // single role normalized to array
      };

      this.currentUserSubject.next(user);
    } catch (error) {
      console.error('Invalid token:', error);
      this.currentUserSubject.next(null);
    }
  }
}
