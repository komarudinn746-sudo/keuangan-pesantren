import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Download, Upload, Edit, Trash2 } from "lucide-react";
import { useSiswa, type Siswa as SiswaType } from "@/hooks/useSiswa";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

export const Siswa = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSiswa, setEditingSiswa] = useState<SiswaType | null>(null);
  const [formData, setFormData] = useState<Omit<SiswaType, 'id'>>({
    nis: "",
    nama: "",
    kelas: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: undefined,
    alamat: "",
    nama_wali: "",
    telepon_wali: ""
  });

  const { siswa, loading, addSiswa, updateSiswa, deleteSiswa } = useSiswa();
  const { toast } = useToast();

  const filteredStudents = siswa.filter(student => 
    student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nis.includes(searchTerm)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSiswa) {
        await updateSiswa(editingSiswa.id!, formData);
      } else {
        await addSiswa(formData);
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving siswa:', error);
    }
  };

  const handleEdit = (student: SiswaType) => {
    setEditingSiswa(student);
    setFormData({
      nis: student.nis,
      nama: student.nama,
      kelas: student.kelas,
      tempat_lahir: student.tempat_lahir || "",
      tanggal_lahir: student.tanggal_lahir || "",
      jenis_kelamin: student.jenis_kelamin,
      alamat: student.alamat || "",
      nama_wali: student.nama_wali || "",
      telepon_wali: student.telepon_wali || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
      await deleteSiswa(id);
    }
  };

  const resetForm = () => {
    setFormData({
      nis: "",
      nama: "",
      kelas: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      jenis_kelamin: undefined,
      alamat: "",
      nama_wali: "",
      telepon_wali: ""
    });
    setEditingSiswa(null);
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const exportData = () => {
    const csvContent = [
      ['NIS', 'Nama', 'Kelas', 'Tempat Lahir', 'Tanggal Lahir', 'Jenis Kelamin', 'Alamat', 'Nama Wali', 'Telepon Wali'],
      ...siswa.map(s => [s.nis, s.nama, s.kelas, s.tempat_lahir || '', s.tanggal_lahir || '', s.jenis_kelamin || '', s.alamat || '', s.nama_wali || '', s.telepon_wali || ''])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data-siswa.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast({
      title: "Berhasil",
      description: "Data siswa berhasil diekspor"
    });
  };

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
                Total {siswa.length} siswa terdaftar
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2" disabled>
                <Upload className="h-4 w-4" />
                Import
              </Button>
              <Button variant="outline" className="gap-2" onClick={exportData}>
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2" onClick={handleAddNew}>
                    <Plus className="h-4 w-4" />
                    Tambah Siswa
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingSiswa ? 'Edit Siswa' : 'Tambah Siswa Baru'}</DialogTitle>
                    <DialogDescription>
                      Lengkapi form berikut untuk {editingSiswa ? 'mengupdate' : 'menambah'} data siswa
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="nama">Nama Lengkap</Label>
                        <Input
                          id="nama"
                          value={formData.nama}
                          onChange={(e) => setFormData(prev => ({ ...prev, nama: e.target.value }))}
                          placeholder="Masukkan nama lengkap"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nis">NIS</Label>
                        <Input
                          id="nis"
                          value={formData.nis}
                          onChange={(e) => setFormData(prev => ({ ...prev, nis: e.target.value }))}
                          placeholder="Nomor Induk Siswa"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="kelas">Kelas</Label>
                        <Input
                          id="kelas"
                          value={formData.kelas}
                          onChange={(e) => setFormData(prev => ({ ...prev, kelas: e.target.value }))}
                          placeholder="Kelas siswa"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                        <Select value={formData.jenis_kelamin} onValueChange={(value: 'L' | 'P') => setFormData(prev => ({ ...prev, jenis_kelamin: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis kelamin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="L">Laki-laki</SelectItem>
                            <SelectItem value="P">Perempuan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tempat_lahir">Tempat Lahir</Label>
                        <Input
                          id="tempat_lahir"
                          value={formData.tempat_lahir}
                          onChange={(e) => setFormData(prev => ({ ...prev, tempat_lahir: e.target.value }))}
                          placeholder="Kota kelahiran"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
                        <Input
                          id="tanggal_lahir"
                          type="date"
                          value={formData.tanggal_lahir}
                          onChange={(e) => setFormData(prev => ({ ...prev, tanggal_lahir: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nama_wali">Nama Wali</Label>
                        <Input
                          id="nama_wali"
                          value={formData.nama_wali}
                          onChange={(e) => setFormData(prev => ({ ...prev, nama_wali: e.target.value }))}
                          placeholder="Nama wali/orang tua"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telepon_wali">No. Telepon Wali</Label>
                        <Input
                          id="telepon_wali"
                          value={formData.telepon_wali}
                          onChange={(e) => setFormData(prev => ({ ...prev, telepon_wali: e.target.value }))}
                          placeholder="08xxxxxxxxxx"
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="alamat">Alamat</Label>
                        <Input
                          id="alamat"
                          value={formData.alamat}
                          onChange={(e) => setFormData(prev => ({ ...prev, alamat: e.target.value }))}
                          placeholder="Alamat lengkap"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                      <Button type="submit">{editingSiswa ? 'Update' : 'Simpan'}</Button>
                    </div>
                  </form>
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

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="text-muted-foreground">Memuat data...</div>
            </div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>NIS</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Jenis Kelamin</TableHead>
                    <TableHead>Tempat, Tanggal Lahir</TableHead>
                    <TableHead>Wali</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{student.nama}</TableCell>
                      <TableCell>{student.nis}</TableCell>
                      <TableCell>{student.kelas}</TableCell>
                      <TableCell>{student.jenis_kelamin === 'L' ? 'Laki-laki' : student.jenis_kelamin === 'P' ? 'Perempuan' : '-'}</TableCell>
                      <TableCell>
                        {student.tempat_lahir && student.tanggal_lahir
                          ? `${student.tempat_lahir}, ${new Date(student.tanggal_lahir).toLocaleDateString('id-ID')}`
                          : '-'
                        }
                      </TableCell>
                      <TableCell>
                        <div className="text-xs">
                          <div>{student.nama_wali || '-'}</div>
                          <div className="text-muted-foreground">{student.telepon_wali || '-'}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(student)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(student.id!)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredStudents.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        {searchTerm ? 'Tidak ada data yang sesuai dengan pencarian' : 'Belum ada data siswa'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};