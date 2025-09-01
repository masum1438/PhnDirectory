export interface AutoDeleteSettings {
  isEnabled: boolean;
  deleteIntervalMinutes: number;
  contactsToDelete: number;
  deleteOnlyInactive: boolean;
}

export interface AutoDeleteRequest {
  contactsToDelete?: number;
}