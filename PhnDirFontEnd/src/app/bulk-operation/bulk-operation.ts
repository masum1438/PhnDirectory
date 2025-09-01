import { Component, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bulk-operation',
  imports: [CommonModule, FormsModule],
  templateUrl: './bulk-operation.html',
  styleUrls: ['./bulk-operation.css']
})
export class BulkOperation {
  startId: number = 0;
  endId: number = 0;
  message: string = '';
  private toastr = inject(ToastrService);


  bulkInsertJson: string = `[
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phoneNumber": "+8801711111111",
      "address": "Dhaka",
      "group": "Friends",
      "balance": 200
    },
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phoneNumber": "+8801711111112",
      "address": "Chattogram",
      "group": "Work",
      "balance": 150
    }
  ]`;

 
  contactsToDelete: number = 10;
  deleteIntervalMinutes: number = 5;
  deleteOnlyInactive: boolean = true;
  // form values
  isAutoDeleteEnabled: boolean = false;

  constructor(private contactService: ContactService) {}

  bulkInsert() {
    try {
      const contacts = JSON.parse(this.bulkInsertJson);
      this.contactService.bulkInsert(contacts).subscribe({
        next: () => this.toastr.success(' Bulk insert successful'),
        error: () => this.toastr.error(' Failed bulk insert')
      });
    } catch (e) {
      this.toastr.warning(' Invalid JSON format!');
    }
    
  }

  bulkDelete() {
    this.contactService.bulkDelete([this.startId, this.endId]).subscribe({
      next: () => this.toastr.success(`Deleted contacts from ${this.startId} to ${this.endId}`),
      error: () => this.toastr.error(' Failed bulk delete') 
    });
  }

  bulkDisable() {
    this.contactService.bulkDisable([this.startId, this.endId]).subscribe({
      next: () =>this.toastr.success(`Disabled contacts from ${this.startId} to ${this.endId}`),
      error: () => this.toastr.error(' Failed bulk disable')
    });
  }

  startBulkAutoDelete() {
    const payload = {
      contactsToDelete: this.contactsToDelete,
      deleteIntervalMinutes: this.deleteIntervalMinutes,
      deleteOnlyInactive: this.deleteOnlyInactive
    };
 
    this.contactService.bulkAutoDelete(payload).subscribe({
      next:()  => this.toastr.success('Bulk Auto Delete configured successfully!'),
      error: err => this.toastr.error('Error: ' + err.message)
    });
  }

  toggleAutoDelete() {
    this.contactService.toggleAutoDelete(this.isAutoDeleteEnabled).subscribe({
      next: res => this.toastr.success(`Auto Delete ${this.isAutoDeleteEnabled ? 'enabled' : 'disabled'} successfully!`),
      error: err => this.toastr.error('Error: ' + err.message)
    });
  }
}
