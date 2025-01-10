export interface Patient {
  id?: number;
  name: string;
  diseases: string[];
  allergies: string[];
  roomNumber: string;
  bedNumber: string;
  floorNumber: string;
  age: number;
  gender: string;
  contactInfo: string;
  emergencyContact: string;
}

export interface PatientFormData {
  name: string;
  diseases: string;
  allergies: string;
  roomNumber: string;
  bedNumber: string;
  floorNumber: string;
  age: string;
  gender: string;
  contactInfo: string;
  emergencyContact: string;
}

