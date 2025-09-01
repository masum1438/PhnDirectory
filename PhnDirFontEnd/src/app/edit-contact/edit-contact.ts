import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { CreateContact } from '../../models/create-contact';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-contact',
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './edit-contact.html',
  styleUrl: './edit-contact.css'
})
export class EditContact implements OnInit {
    private toastr = inject(ToastrService);

  contactId!: number;
  contact: CreateContact = {
    
    name: '',
    email: '',
    balance: 0,
    phoneNumber: '',
     group: '',
    address: ''
  };
 
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadContact();
  }

  loadContact() {
    this.contactService.getContactById(this.contactId).subscribe({
      next: (data) => (this.contact = data),
      error: (err) => console.error('Error loading contact', err)
    });
  }

  updateContact() {
    this.contactService.updateContact(this.contactId, this.contact).subscribe({
      next: () => {
        this.toastr.success('✅ Contact updated successfully');
        this.router.navigate(['/contact-list']); // redirect back to list
      },
      error: (err) => console.error('Error updating contact', err)
    });
  }
}

