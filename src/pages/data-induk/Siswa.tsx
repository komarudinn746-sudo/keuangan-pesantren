import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Download, Upload, Edit, Trash2 } from "lucide-react";
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

// Dummy data siswa
const dummyStudents = [
  {
    id: 1,
    nama: "Ahmad Fauzi",
    nis: "2024001",
    tempatLahir: "Jakarta",
    tanggalLahir: "2008-05-15",
    namaAyah: "Abdullah Fauzi",
    namaIbu: "Siti Khadijah",
    noWhatsapp: "081234567890",
    kamar: "Al-Ikhlas 1",
    lembaga: "MTs Putra",
  },
  {
    id: 2,
    nama: "Muhammad Ali",
    nis: "2024002",
    tempatLahir: "Bandung",
    tanggalLahir: "2008-03-22",
    namaAyah: "Umar Ali",
    namaIbu: "Fatimah Zahra",
    noWhatsapp: "081234567891",
    kamar: "Al-Ikhlas 2",
    lembaga: "MA Putra",
  },
  {
    id: 3,
    nama: "Abdul Rahman",
    nis: "2024003",
    tempatLahir: "Surabaya",
    tanggalLahir: "2009-01-10",
    namaAyah: "Muhammad Rahman",
    namaIbu: "Aisyah Rahman",
    noWhatsapp: "081234567892",
    kamar: "Al-Ikhlas 1",
    lembaga: "MTs Putra",
  },
];

export const Siswa = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students] = useState(dummyStudents);

  const filteredStudents = students.filter(student =>
    student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nis.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Data Siswa</h1>
        <p className="text-muted-foreground">
          Kelola data siswa pesantren dengan mudah
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Siswa</CardTitle>
              <CardDescription>
                Total {students.length} siswa terdaftar
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Import
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Tambah Siswa
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Tambah Siswa Baru</DialogTitle>
                    <DialogDescription>
                      Lengkapi form berikut untuk menambah siswa baru
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nama Lengkap</label>
                      <Input placeholder="Masukkan nama lengkap" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">NIS</label>
                      <Input placeholder="Nomor Induk Siswa" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tempat Lahir</label>
                      <Input placeholder="Kota kelahiran" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tanggal Lahir</label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nama Ayah</label>
                      <Input placeholder="Nama ayah kandung" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nama Ibu</label>
                      <Input placeholder="Nama ibu kandung" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">No. WhatsApp</label>
                      <Input placeholder="08xxxxxxxxxx" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Kamar</label>
                      <Input placeholder="Pilih kamar" />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <label className="text-sm font-medium">Lembaga Pendidikan</label>
                      <Input placeholder="Pilih lembaga pendidikan" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Batal</Button>
                    <Button>Simpan</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari nama atau NIS siswa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>NIS</TableHead>
                  <TableHead>Tempat, Tanggal Lahir</TableHead>
                  <TableHead>Orang Tua</TableHead>
                  <TableHead>WhatsApp</TableHead>
                  <TableHead>Kamar</TableHead>
                  <TableHead>Lembaga</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student, index) => (
                  <TableRow key={student.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{student.nama}</TableCell>
                    <TableCell>{student.nis}</TableCell>
                    <TableCell>
                      {student.tempatLahir}, {new Date(student.tanggalLahir).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <div>Ayah: {student.namaAyah}</div>
                        <div>Ibu: {student.namaIbu}</div>
                      </div>
                    </TableCell>
                    <TableCell>{student.noWhatsapp}</TableCell>
                    <TableCell>{student.kamar}</TableCell>
                    <TableCell>{student.lembaga}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
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