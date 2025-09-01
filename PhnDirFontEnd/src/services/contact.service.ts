import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Contact } from "../models/contact.model";
import { CreateContact } from "../models/create-contact";
import { environment } from "../environments/environment.development";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/Contact`; // your backend API

  constructor(private http: HttpClient, private authService: AuthService) {}

  // ✅ helper: get headers with token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) throw new Error("User not logged in");

    return new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    });
  }

  // GET all
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // GET by ID
  getContactById(id: number): Observable<Contact> {
  return this.http.get<Contact>(`${this.apiUrl}/${id}`,{ headers: this.getAuthHeaders() });
}


  // POST create
  createContact(contact: CreateContact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact, { headers: this.getAuthHeaders() });
  }

  // PUT update
  updateContact(id: number, contact: CreateContact): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, contact, { headers: this.getAuthHeaders() });
  }

  // DELETE
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // PATCH toggle status
  toggleStatus(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/disable`, {}, { headers: this.getAuthHeaders() });
  }

  // BULK insert
  // ==========================
  // BULK OPERATIONS
  // ==========================

  bulkInsert(contacts: CreateContact[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/bulk`, contacts, { headers: this.getAuthHeaders() });
  }

  bulkDelete(ids: number[]): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/bulk`, {
      headers: this.getAuthHeaders(),
      body: ids
    });
  }

  bulkDisable(ids: number[]): Observable<any> {
    return this.http.patch(`${this.apiUrl}/bulk/disable`, ids, { headers: this.getAuthHeaders() });
  }

  // ==========================
  // AUTO DELETE TOGGLE
  // ==========================
   // 1️⃣ Bulk Auto Delete API
  bulkAutoDelete(settings: { contactsToDelete: number; deleteIntervalMinutes: number; deleteOnlyInactive: boolean }): Observable<any> {
    return this.http.post(`${this.apiUrl}/bulk-delete-auto`, settings, {
      headers: this.getAuthHeaders()
    });
  }

  // 2️⃣ Toggle Auto Delete API
  toggleAutoDelete(isEnabled: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/toggle/${isEnabled}`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  // ==========================
  // EXCEL IMPORT / EXPORT
  // ==========================

  // Import Excel
  importExcel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post(`${this.apiUrl}/import`, formData, {
      headers: this.getAuthHeaders(),
    });
  }

  // Export Excel
  exportExcel(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export`, {
      headers: this.getAuthHeaders(),
      responseType: "blob"
    });
  }
}
