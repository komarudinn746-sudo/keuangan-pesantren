import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Plus, Edit, Trash2 } from "lucide-react";

export const PengeluaranDenda = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const pengeluaranData = [
    { id: 1, tanggal: "2024-01-15", keterangan: "Biaya Administrasi Denda", jumlah: 200000, kategori: "Admin" },
    { id: 2, tanggal: "2024-01-10", keterangan: "Perbaikan Fasilitas", jumlah: 500000, kategori: "Maintenance" },
    { id: 3, tanggal: "2024-01-05", keterangan: "ATK Pencatatan", jumlah: 75000, kategori: "Operasional" },
  ];

  const totalPengeluaran = pengeluaranData.reduce((sum, item) => sum + item.jumlah, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pengeluaran Denda</h1>
          <p className="text-muted-foreground">Kelola pengeluaran dari dana denda santri</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Tambah Pengeluaran
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {totalPengeluaran.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengeluaran</CardTitle>
          <CardDescription>
            Total {pengeluaranData.length} transaksi pengeluaran
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search">Cari Pengeluaran</Label>
            <Input
              id="search"
              placeholder="Masukkan keterangan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {pengeluaranData.map((item) => (
              <Card key={item.id} className="border-l-4 border-l-destructive">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{item.keterangan}</h3>
                      <p className="text-sm text-muted-foreground">
                        Tanggal: {item.tanggal}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{item.kategori}</Badge>
                        <span className="font-bold text-destructive">
                          Rp {item.jumlah.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};