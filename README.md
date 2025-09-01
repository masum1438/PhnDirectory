#  Phone Directory Management System

A **full-stack web application** combining **Angular frontend** with **ASP.NET Core Web API backend** to efficiently manage contacts.  
The system supports **CRUD operations**, **bulk operations**, **role-based authentication**, and **automated background cleanup**.

---

##  Features

### Backend (ASP.NET Core Web API)

#### Authentication & Authorization
- JWT-based login  
- Admin/Client role management  

<img width="745" alt="jwt" src="https://github.com/user-attachments/assets/61df0f8f-49ec-4c21-850b-ba5b8530ccb8" />
<img width="745" alt="register" src="https://github.com/user-attachments/assets/f673e283-0f5c-41b1-90b9-ace285cfc76e" />
<img width="745" alt="login" src="https://github.com/user-attachments/assets/9add88d9-f6f6-46b4-8794-dd02d57136b4" />
<img width="745" alt="role-assign" src="https://github.com/user-attachments/assets/05cc1f09-4ec0-403f-a40c-9ed67e1f56f0" />

---

#### Contact Management
- Create, Read, Update, Delete contacts  
- Fields: Name, Email, Phone Number, Address, Group, Status, Balance, CreatedAt  

<img width="745" alt="post-contact" src="https://github.com/user-attachments/assets/20a7043b-ecf2-485e-8f42-2565ed338009" />
<img width="745" alt="update-id" src="https://github.com/user-attachments/assets/0482d217-e898-467e-998a-174e6855523f" />
<img width="745" alt="get-all-cantact" src="https://github.com/user-attachments/assets/f4b0d87d-a056-408f-b3a9-0508aa1e078a" />
<img width="745" alt="get-byId" src="https://github.com/user-attachments/assets/403fe124-fb07-4ece-ad9e-541da2c966af" />
<img width="745" alt="delete-id" src="https://github.com/user-attachments/assets/156496c1-49fc-4a6f-9d13-e988baae865d" />

---

#### Bulk Operations
- Upload Excel file to insert 200 contacts  
- Bulk delete 150 contacts or disable 100 contacts  

<img width="745" alt="bulk-json-insert" src="https://github.com/user-attachments/assets/6db0f694-6f83-4ea5-ba00-307847b47df6" />
<img width="745" alt="bulk-delete-range" src="https://github.com/user-attachments/assets/3af7b057-4daf-476c-aa23-8ecb37faa9d4" />
<img width="745" alt="bulk-disable-range" src="https://github.com/user-attachments/assets/de517ef4-73ae-4f9b-ab6e-735f9b435a10" />

---

#### Auto-Delete Background Service
- Admin-configurable intervals and number of contacts per cycle  
- Option to delete only inactive contacts  

<img width="745" alt="auto-delete-enable" src="https://github.com/user-attachments/assets/9d43e7b0-e074-4ef6-9c42-4277b71c0dd1" />
<img width="745" alt="auto-delete" src="https://github.com/user-attachments/assets/63caf5fb-e97c-4f69-9157-4469d83bf042" />

---

#### Import / Export Contacts
- Import contacts via Excel  
- Export contacts for reporting  

<img width="745" alt="import-cn" src="https://github.com/user-attachments/assets/cf6cf7da-099d-4dc4-b3d9-984589cbbc3b" />
<img width="745" alt="export-contact" src="https://github.com/user-attachments/assets/869b2262-41ab-45a6-8c97-6e2f9a780003" />

---

#### Notifications
- API returns operation status messages for frontend display (success, error, info)

---
### Frontend (Angular)

#### Authentication
- Login/Register forms with JWT  
- Protected routes based on roles  

<img width="1360" alt="register" src="https://github.com/user-attachments/assets/031b69d2-f15b-4f93-9698-464ae7709d23" />
<img width="1360" alt="login" src="https://github.com/user-attachments/assets/32afb223-bf19-491e-a9fe-dbacf61712a6" />

- **User/Client Role:** Can only view contact list

---

#### Contact Management
- Add, edit, delete, and view contacts  
- Table with pagination and search  

<img width="1360" alt="contact-list" src="https://github.com/user-attachments/assets/2aba71bd-7eef-43f6-85bb-67a650dc05f4" />
<img width="1360" alt="create-cn" src="https://github.com/user-attachments/assets/07bf9110-3ade-4450-ac8f-68fcc547f779" />
<img width="1360" alt="edit-cn" src="https://github.com/user-attachments/assets/9fee2a8e-c16d-4658-bf0f-3b42f723f7b8" />
<img width="1360" alt="details-cn" src="https://github.com/user-attachments/assets/d93796d4-8901-4c2c-85fe-797070f40008" />

---

#### Bulk Operations
- Excel upload for insert/delete/disable  
- Real-time progress notifications  

<img width="1360" alt="bulk-operation" src="https://github.com/user-attachments/assets/8182a52d-a6e8-4f4c-be11-cdea79f2bc2e" />

---

#### Admin Panel
- Configure auto-delete settings  
- Assign roles to users  

<img width="1360" alt="assign-role" src="https://github.com/user-attachments/assets/3624ba14-62bb-44ea-9365-6fec5a39bdd3" />

---

#### UI/UX
- Responsive design for desktop and mobile  
- Toast notifications for all operations  
- Fixed navbar for easy navigation

##  Tech Stack

- **Frontend:** Angular 18, Bootstrap 5, ngx-toastr  
- **Backend:** ASP.NET Core 8 Web API, Entity Framework Core, SQL Server  
- **Authentication:** ASP.NET Core Identity + JWT  
- **Background Services:** Bulk operations, ScheduledContactCleanupService

---
