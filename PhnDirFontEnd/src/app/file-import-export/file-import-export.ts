import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-file-import-export',
  imports: [CommonModule,FormsModule],
  templateUrl: './file-import-export.html',
  styleUrl: './file-import-export.css'
})
export class FileImportExport {
 selectedFile: File | null = null;
  message: string = '';
  private toastr = inject(ToastrService);

  constructor(private http: HttpClient, private authService: AuthService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  importExcel() {
    if (!this.selectedFile) {
      this.message = "⚠️ Please select a file first";
      return;
    }

    const formData = new FormData();
    formData.append("file", this.selectedFile);

    this.http.post(`${environment.apiUrl}/Contact/import`, formData, {
      headers: { "Authorization": `Bearer ${this.authService.getToken()}` }
    }).subscribe({
      next: () => this.toastr.success("✅ Import successful") ,
      error: () => this.toastr.error("❌ Import failed") 
    });
  }

  exportExcel() {
    this.http.get(`${environment.apiUrl}/Contact/export`, {
      headers: { "Authorization": `Bearer ${this.authService.getToken()}` },
      responseType: 'blob'
    }).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "contacts.xlsx";
      a.click();
      this.toastr.success("✅ Export successful") ;
    });
  }
}
