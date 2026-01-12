"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { ImageUploader } from "~/components/ui/image-uploader";
import type { Staff } from "~/types/staff";

const formSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  gender: z.enum(["MALE", "FEMALE"]),
  role: z.string().min(1, "Jabatan wajib diisi"),
  department: z.string().min(1, "Departemen wajib dipilih"),
  imageUrl: z.string().optional(),

  isActive: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

interface StaffFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Staff | null;
  onSuccess: () => void;
}

const DEPARTMENTS = [
  { value: "preschool", label: "Preschool" },
  { value: "primary", label: "Primary" },
];

export function StaffFormDialog({
  open,
  onOpenChange,
  initialData,
  onSuccess,
}: StaffFormDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: "MALE",
    role: "",
    department: "",
    imageUrl: "",
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (initialData) {
        setFormData({
          name: initialData.name,
          gender: initialData.gender as "MALE" | "FEMALE",
          role: initialData.role,
          department: initialData.department,
          imageUrl: initialData.imageUrl ?? "",
          isActive: initialData.isActive,
        });
      } else {
        setFormData({
          name: "",
          gender: "MALE",
          role: "",
          department: "",
          imageUrl: "",
          isActive: true,
        });
      }
    }
  }, [open, initialData]);

  const handleChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const validation = formSchema.safeParse(formData);
    if (!validation.success) {
      toast.error("Data tidak valid");
      setIsLoading(false);
      return;
    }

    try {
      const url = initialData
        ? `/api/admin/staff/${initialData.id}`
        : "/api/admin/staff";
      const method = initialData ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Gagal menyimpan data");
      }

      toast.success(
        initialData ? "Data staff diperbarui" : "Staff berhasil ditambahkan",
      );
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Terjadi kesalahan sistem",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Data Staff" : "Tambah Staff Baru"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Nama Lengkap<span className="-ml-1.5 text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Contoh: Budi Santoso, S.Pd"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>
                Jenis Kelamin<span className="-ml-1.5 text-red-500">*</span>
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(val) =>
                  // PERBAIKAN 4: Casting value ke tipe spesifik Enum
                  handleChange("gender", val as "MALE" | "FEMALE")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Laki-laki</SelectItem>
                  <SelectItem value="FEMALE">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>
                Departemen<span className="-ml-1.5 text-red-500">*</span>
              </Label>
              <Select
                value={formData.department}
                onValueChange={(val) => handleChange("department", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Departemen" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">
              Jabatan / Posisi<span className="-ml-1.5 text-red-500">*</span>
            </Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              placeholder="Contoh: Kepala Sekolah / Guru Matematika"
              required
            />
          </div>

          {/* --- Media & Profile --- */}
          <div className="space-y-2">
            <Label>Foto Profil</Label>
            <ImageUploader
              value={formData.imageUrl ?? ""}
              onChange={(url) => handleChange("imageUrl", url)}
            />
            <p className="text-muted-foreground text-xs">
              Disarankan rasio 3:4 atau 1:1. Jika kosong, akan menggunakan
              avatar default sesuai gender.
            </p>
          </div>

          {/* --- Status --- */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Status Aktif</Label>
              <p className="text-muted-foreground text-xs">
                Non-aktifkan untuk menyembunyikan staff ini dari halaman publik.
              </p>
            </div>
            <Switch
              checked={formData.isActive}
              onCheckedChange={(val) => handleChange("isActive", val)}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Data
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
