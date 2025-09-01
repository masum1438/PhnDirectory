import { Component, inject, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-list',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactList implements OnInit{
 contacts: Contact[] = [];
  private toastr = inject(ToastrService);

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
    });
  }

  deleteContact(id: number) {
    if (confirm('Are you sure to delete this contact?')) {
      this.contactService.deleteContact(id).subscribe(() => {
        this.loadContacts();
        this.toastr.success(`Contact deleted successfully`);

      });
    }
  }

  toggleStatus(id: number) {
    if (confirm('Are you sure to change this status?')) {
    this.contactService.toggleStatus(id).subscribe(() => {
      this.loadContacts();
             this.toastr.success(`Status toggled successfully`);

    }); 
  }
  }
}
