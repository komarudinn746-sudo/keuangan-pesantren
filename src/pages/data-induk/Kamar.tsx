import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Building, Plus, Edit, Trash2 } from "lucide-react";
import { useKamar, type Kamar as KamarType } from "@/hooks/useKamar";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Kamar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingKamar, setEditingKamar] = useState<KamarType | null>(null);
  const [formData, setFormData] = useState<Omit<KamarType, 'id'>>({
    nomor: "",
    kapasitas: 4,
    penghuni: 0,
    status: 'Tersedia',
    keterangan: ""
  });

  const { kamar, loading, addKamar, updateKamar, deleteKamar } = useKamar();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingKamar) {
        await updateKamar(editingKamar.id!, formData);
      } else {
        await addKamar(formData);
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving kamar:', error);
    }
  };

  const handleEdit = (kamarItem: KamarType) => {
    setEditingKamar(kamarItem);
    setFormData({
      nomor: kamarItem.nomor,
      kapasitas: kamarItem.kapasitas,
      penghuni: kamarItem.penghuni,
      status: kamarItem.status || 'Tersedia',
      keterangan: kamarItem.keterangan || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data kamar ini?')) {
      await deleteKamar(id);
    }
  };

  const resetForm = () => {
    setFormData({
      nomor: "",
      kapasitas: 4,
      penghuni: 0,
      status: 'Tersedia',
      keterangan: ""
    });
    setEditingKamar(null);
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Data Kamar</h1>
          <p className="text-muted-foreground">Kelola data kamar santri</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" onClick={handleAddNew}>
              <Plus className="h-4 w-4" />
              Tambah Kamar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingKamar ? 'Edit Kamar' : 'Tambah Kamar Baru'}</DialogTitle>
              <DialogDescription>
                Lengkapi form berikut untuk {editingKamar ? 'mengupdate' : 'menambah'} data kamar
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nomor">Nomor Kamar</Label>
                  <Input
                    id="nomor"
                    value={formData.nomor}
                    onChange={(e) => setFormData(prev => ({ ...prev, nomor: e.target.value }))}
                    placeholder="Contoh: A-101"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="kapasitas">Kapasitas</Label>
                    <Input
                      id="kapasitas"
                      type="number"
                      min="1"
                      value={formData.kapasitas}
                      onChange={(e) => setFormData(prev => ({ ...prev, kapasitas: parseInt(e.target.value) || 0 }))}
                      placeholder="Jumlah tempat tidur"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="penghuni">Jumlah Penghuni</Label>
                    <Input
                      id="penghuni"
                      type="number"
                      min="0"
                      value={formData.penghuni}
                      onChange={(e) => setFormData(prev => ({ ...prev, penghuni: parseInt(e.target.value) || 0 }))}
                      placeholder="Penghuni saat ini"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: 'Tersedia' | 'Penuh' | 'Maintenance') => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status kamar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tersedia">Tersedia</SelectItem>
                      <SelectItem value="Penuh">Penuh</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keterangan">Keterangan</Label>
                  <Input
                    id="keterangan"
                    value={formData.keterangan}
                    onChange={(e) => setFormData(prev => ({ ...prev, keterangan: e.target.value }))}
                    placeholder="Keterangan tambahan (opsional)"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                <Button type="submit">{editingKamar ? 'Update' : 'Simpan'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Daftar Kamar
          </CardTitle>
          <CardDescription>
            Total {kamar.length} kamar terdaftar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search">Cari Kamar</Label>
            <Input
              id="search"
              placeholder="Masukkan nomor kamar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="text-muted-foreground">Memuat data...</div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {kamar.filter(k => k.nomor.toLowerCase().includes(searchTerm.toLowerCase())).map((kamarItem) => (
                <Card key={kamarItem.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{kamarItem.nomor}</h3>
                      <Badge variant={kamarItem.status === "Penuh" ? "destructive" : kamarItem.status === "Maintenance" ? "secondary" : "default"}>
                        {kamarItem.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Penghuni: {kamarItem.penghuni}/{kamarItem.kapasitas} orang
                    </p>
                    {kamarItem.keterangan && (
                      <p className="text-xs text-muted-foreground mb-3">{kamarItem.keterangan}</p>
                    )}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(kamarItem)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(kamarItem.id!)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {kamar.filter(k => k.nomor.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  {searchTerm ? 'Tidak ada data yang sesuai dengan pencarian' : 'Belum ada data kamar'}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};