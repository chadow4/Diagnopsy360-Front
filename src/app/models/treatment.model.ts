export interface TreatmentModelDto {
  name: string;
}

export interface TreatmentUpdateDto {
  name?: string;
}

export interface TreatmentDeleteDto {
  id: number;
}

export interface TreatmentDto {
  id: number;
  name: string
}
