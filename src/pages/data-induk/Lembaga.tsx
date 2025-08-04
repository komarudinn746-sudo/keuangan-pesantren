import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Plus, Edit, Trash2 } from "lucide-react";
import { useLembaga, type Lembaga as LembagaType } from "@/hooks/useLembaga";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Lembaga = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLembaga, setEditingLembaga] = useState<LembagaType | null>(null);
  const [formData, setFormData] = useState<Omit<LembagaType, 'id'>>({
    nama: "",
    kepala: "",
    jumlah_siswa: 0,
    alamat: "",
    telepon: ""
  });

  const { lembaga, loading, addLembaga, updateLembaga, deleteLembaga } = useLembaga();
  const { toast } = useToast();

  const filteredLembaga = lembaga.filter(l => 
    l.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingLembaga) {
        await updateLembaga(editingLembaga.id!, formData);
      } else {
        await addLembaga(formData);
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving lembaga:', error);
    }
  };

  const handleEdit = (lembagaItem: LembagaType) => {
    setEditingLembaga(lembagaItem);
    setFormData({
      nama: lembagaItem.nama,
      kepala: lembagaItem.kepala || "",
      jumlah_siswa: lembagaItem.jumlah_siswa || 0,
      alamat: lembagaItem.alamat || "",
      telepon: lembagaItem.telepon || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data lembaga ini?')) {
      await deleteLembaga(id);
    }
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      kepala: "",
      jumlah_siswa: 0,
      alamat: "",
      telepon: ""
    });
    setEditingLembaga(null);
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lembaga Pendidikan</h1>
          <p className="text-muted-foreground">Kelola data lembaga pendidikan</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" onClick={handleAddNew}>
              <Plus className="h-4 w-4" />
              Tambah Lembaga
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingLembaga ? 'Edit Lembaga' : 'Tambah Lembaga Baru'}</DialogTitle>
              <DialogDescription>
                Lengkapi form berikut untuk {editingLembaga ? 'mengupdate' : 'menambah'} data lembaga
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lembaga</Label>
                  <Input
                    id="nama"
                    value={formData.nama}
                    onChange={(e) => setFormData(prev => ({ ...prev, nama: e.target.value }))}
                    placeholder="Contoh: Madrasah Tsanawiyah"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kepala">Kepala Lembaga</Label>
                  <Input
                    id="kepala"
                    value={formData.kepala}
                    onChange={(e) => setFormData(prev => ({ ...prev, kepala: e.target.value }))}
                    placeholder="Nama kepala lembaga"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jumlah_siswa">Jumlah Siswa</Label>
                  <Input
                    id="jumlah_siswa"
                    type="number"
                    min="0"
                    value={formData.jumlah_siswa}
                    onChange={(e) => setFormData(prev => ({ ...prev, jumlah_siswa: parseInt(e.target.value) || 0 }))}
                    placeholder="Jumlah siswa terdaftar"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telepon">Nomor Telepon</Label>
                  <Input
                    id="telepon"
                    value={formData.telepon}
                    onChange={(e) => setFormData(prev => ({ ...prev, telepon: e.target.value }))}
                    placeholder="Nomor telepon lembaga"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alamat">Alamat</Label>
                  <Input
                    id="alamat"
                    value={formData.alamat}
                    onChange={(e) => setFormData(prev => ({ ...prev, alamat: e.target.value }))}
                    placeholder="Alamat lengkap lembaga"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                <Button type="submit">{editingLembaga ? 'Update' : 'Simpan'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Daftar Lembaga
          </CardTitle>
          <CardDescription>
            Total {lembaga.length} lembaga pendidikan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search">Cari Lembaga</Label>
            <Input
              id="search"
              placeholder="Masukkan nama lembaga..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="text-muted-foreground">Memuat data...</div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLembaga.map((lembagaItem) => (
                <Card key={lembagaItem.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{lembagaItem.nama}</h3>
                        <p className="text-sm text-muted-foreground">
                          Kepala: {lembagaItem.kepala || '-'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Jumlah Siswa: {lembagaItem.jumlah_siswa || 0} orang
                        </p>
                        {lembagaItem.telepon && (
                          <p className="text-sm text-muted-foreground">
                            Telepon: {lembagaItem.telepon}
                          </p>
                        )}
                        {lembagaItem.alamat && (
                          <p className="text-sm text-muted-foreground">
                            Alamat: {lembagaItem.alamat}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(lembagaItem)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(lembagaItem.id!)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredLembaga.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  {searchTerm ? 'Tidak ada data yang sesuai dengan pencarian' : 'Belum ada data lembaga'}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};