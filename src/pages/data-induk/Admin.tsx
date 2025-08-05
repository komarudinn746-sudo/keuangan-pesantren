import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Edit, Trash2, UserCheck } from "lucide-react";
import { useAdmin, type Admin as AdminType } from "@/hooks/useAdmin";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminType | null>(null);
  const [formData, setFormData] = useState<Omit<AdminType, 'id'>>({
    nama: "",
    email: "",
    jabatan: "",
    role: "Staff",
    status: "Aktif"
  });

  const { admin, loading, addAdmin, updateAdmin, deleteAdmin } = useAdmin();
  const { toast } = useToast();

  const filteredAdmin = admin.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.jabatan && item.jabatan.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAdmin) {
        await updateAdmin(editingAdmin.id!, formData);
      } else {
        await addAdmin(formData);
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving admin:', error);
    }
  };

  const handleEdit = (adminData: AdminType) => {
    setEditingAdmin(adminData);
    setFormData({
      nama: adminData.nama,
      email: adminData.email || "",
      jabatan: adminData.jabatan || "",
      role: adminData.role || "Staff",
      status: adminData.status || "Aktif"
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data admin ini?')) {
      await deleteAdmin(id);
    }
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      email: "",
      jabatan: "",
      role: "Staff",
      status: "Aktif"
    });
    setEditingAdmin(null);
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const getRoleVariant = (role?: string) => {
    switch (role) {
      case "Admin": return "default";
      case "Supervisor": return "secondary";
      case "Staff": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Data Admin</h1>
        <p className="text-muted-foreground">
          Kelola data admin dan staff sistem keuangan pesantren
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Admin</p>
                <p className="text-xl font-bold">{admin.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Admin</p>
              <p className="text-xl font-bold">{admin.filter(a => a.role === "Admin").length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Supervisor</p>
              <p className="text-xl font-bold">{admin.filter(a => a.role === "Supervisor").length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Staff</p>
              <p className="text-xl font-bold">{admin.filter(a => a.role === "Staff").length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Admin</CardTitle>
              <CardDescription>
                Total {filteredAdmin.length} admin terdaftar
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Cari admin..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2" onClick={handleAddNew}>
                    <Plus className="h-4 w-4" />
                    Tambah Admin
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{editingAdmin ? 'Edit Admin' : 'Tambah Admin Baru'}</DialogTitle>
                    <DialogDescription>
                      {editingAdmin ? 'Edit data admin' : 'Tambahkan admin atau staff baru ke sistem'}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="nama">Nama Lengkap</Label>
                        <Input
                          id="nama"
                          value={formData.nama}
                          onChange={(e) => setFormData(prev => ({ ...prev, nama: e.target.value }))}
                          placeholder="Ustadz Ahmad Syafii"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="ahmad@pesantren.ac.id"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jabatan">Jabatan</Label>
                        <Input
                          id="jabatan"
                          value={formData.jabatan}
                          onChange={(e) => setFormData(prev => ({ ...prev, jabatan: e.target.value }))}
                          placeholder="Kepala Keuangan"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Supervisor">Supervisor</SelectItem>
                            <SelectItem value="Staff">Staff</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Aktif">Aktif</SelectItem>
                            <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                      <Button type="submit">{editingAdmin ? 'Update' : 'Simpan'}</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Jabatan</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Bergabung</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Memuat data...
                    </TableCell>
                  </TableRow>
                ) : filteredAdmin.length > 0 ? (
                  filteredAdmin.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{item.nama}</TableCell>
                      <TableCell>{item.email || '-'}</TableCell>
                      <TableCell>{item.jabatan || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleVariant(item.role)}>
                          {item.role || 'Staff'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.status === "Aktif" ? "default" : "secondary"}>
                          {item.status || 'Aktif'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID') : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(item.id!)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      {searchTerm ? 'Tidak ada data yang sesuai dengan pencarian' : 'Belum ada data admin'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};