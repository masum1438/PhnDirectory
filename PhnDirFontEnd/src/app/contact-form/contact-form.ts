import { Component, inject, OnInit } from '@angular/core';
import { CreateContact } from '../../models/create-contact';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactForm {
  contact: CreateContact = {
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    group: '',
    balance: 0
  };
  private toastr = inject(ToastrService);

  constructor(private contactService: ContactService) {}
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  onSubmit() {
    this.contactService.createContact(this.contact).subscribe(() => {
      this.toastr.success('✅ Contact created successfully.');
      this.contact = { name: '', email: '', phoneNumber: '', address: '', group: '', balance: 0 };
    });
  }
}
