export type Gender = "MALE" | "FEMALE";

export interface Staff {
  id: string;
  name: string;
  nip: string;
  gender: Gender;
  role: string;
  department: string;
  imageUrl: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStaffBody {
  name: string;
  gender: Gender;
  role: string;
  department: string;
  imageUrl?: string;
  isActive?: boolean;
}

export interface UpdateStaffBody {
  name?: string;
  gender?: Gender;
  role?: string;
  department?: string;
  imageUrl?: string;
  isActive?: boolean;
  order?: number;
}

export interface ReorderStaffItem {
  id: string;
  order: number;
}

export interface ReorderStaffBody {
  items: ReorderStaffItem[];
}
