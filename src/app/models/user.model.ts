import {DiagnosisDto} from "./diagnosis.model";

export interface UserCreateDto {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UserUpdateDto {
  firstname?: string;
  lastname?: string;
  email?: string;
}

export interface UserUpdatePasswordDto {
  lastPassword: string;
  newPassword: string;
}
export interface UserDto {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

export interface DoctorDto extends UserDto {
  myPatientsDiagnoses: DiagnosisDto[];
}

export interface PatientDto extends UserDto {
  myDiagnoses: DiagnosisDto[];
}

export interface UserDeleteDto {
  id: number;
}

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserJWtTokenDto {
  expiresIn: string;
  accessToken: string;
}


export interface UserJwtSessionDto {
  id: number;
  email: string;
  role: string;
}

