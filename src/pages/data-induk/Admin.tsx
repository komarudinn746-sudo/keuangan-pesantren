import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Edit, Trash2, UserCheck } from "lucide-react";
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

const dummyAdmin = [
  {
    id: 1,
    nama: "Ustadz Ahmad Syafii",
    email: "ahmad.syafii@pesantren.ac.id",
    jabatan: "Kepala Keuangan",
    role: "Admin",
    status: "Aktif",
    tanggalBergabung: "2023-01-15"
  },
  {
    id: 2,
    nama: "Ustadzah Fatimah",
    email: "fatimah@pesantren.ac.id", 
    jabatan: "Staff Keuangan",
    role: "Staff",
    status: "Aktif",
    tanggalBergabung: "2023-03-20"
  },
  {
    id: 3,
    nama: "Ustadz Muhammad Ridho",
    email: "ridho@pesantren.ac.id",
    jabatan: "Supervisor",
    role: "Supervisor", 
    status: "Aktif",
    tanggalBergabung: "2023-06-10"
  }
];

export const Admin = () => {
  const [admin] = useState(dummyAdmin);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAdmin = admin.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jabatan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleVariant = (role: string) => {
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Tambah Admin
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Tambah Admin Baru</DialogTitle>
                    <DialogDescription>
                      Tambahkan admin atau staff baru ke sistem
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nama Lengkap</label>
                      <Input placeholder="Ustadz Ahmad Syafii" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="ahmad@pesantren.ac.id" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Jabatan</label>
                      <Input placeholder="Kepala Keuangan" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Role</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="supervisor">Supervisor</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password Sementara</label>
                      <Input type="password" placeholder="Password123!" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Batal</Button>
                    <Button>Simpan Admin</Button>
                  </div>
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
                {filteredAdmin.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{item.nama}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.jabatan}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleVariant(item.role)}>
                        {item.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.status === "Aktif" ? "default" : "secondary"}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(item.tanggalBergabung).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};