import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Roleassign } from './roleassign/roleassign';
import { ContactForm } from './contact-form/contact-form';
import { ContactList } from './contact-list/contact-list';
import { FileImportExport } from './file-import-export/file-import-export';
import { BulkOperation } from './bulk-operation/bulk-operation';
import { ContactDetails } from './contact-details/contact-details';
import { EditContact } from './edit-contact/edit-contact';

export const routes: Routes = [
   
   
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'roleassign', component: Roleassign },
   { path: 'contact-form', component: ContactForm },
    { path: 'contact-list', component: ContactList },
        { path: 'contact-details/:id', component: ContactDetails},
  { path: 'edit-contact/:id', component: EditContact },

     { path: 'file-import-export', component: FileImportExport},
          { path: 'bulk-operation', component: BulkOperation },

  {path:'', component: ContactList }
  //

];
