import {UserDto} from "./user.model";
import {DiagnosisDto} from "./diagnosis.model";

export interface MessageDto {
    id: number;
    content: string;
    createdAt: Date;
    author: UserDto;
    diagnosis: DiagnosisDto;
}


export interface MessageSocketPrinterDto{
  content: string;
  authorFirstname: string;
}
export interface MessageSocketDto{
  authorId: number;
  content: string;
  diagnosisId: number;
  authorFirstname: string;
  destinationId: number;
}
