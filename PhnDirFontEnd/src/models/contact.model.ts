export interface Contact {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  group: string;
  status: boolean;
  balance: number;
  createdAt: Date;
  updatedAt?: Date;
}
