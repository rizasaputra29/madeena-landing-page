export type Gender = "MALE" | "FEMALE";

export interface FoundationMember {
  id: string;
  name: string;
  gender: Gender;
  role: string;
  imageUrl: string | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFoundationBody {
  name: string;
  gender: Gender;
  role: string;
  imageUrl?: string;
  isActive?: boolean;
}

export interface UpdateFoundationBody {
  name?: string;
  gender?: Gender;
  role?: string;
  imageUrl?: string;
  isActive?: boolean;
  order?: number;
}
