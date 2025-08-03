import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Car, Plus, Edit, Trash2 } from "lucide-react";

export const PemasukanInfaq = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const pemasukanData = [
    { id: 1, tanggal: "2024-01-15", keterangan: "Infaq Parkir Harian", jumlah: 50000, sumber: "Pengunjung" },
    { id: 2, tanggal: "2024-01-14", keterangan: "Parkir Event", jumlah: 150000, sumber: "Acara Khusus" },
    { id: 3, tanggal: "2024-01-13", keterangan: "Infaq Parkir Mingguan", jumlah: 75000, sumber: "Pengunjung" },
  ];

  const totalPemasukan = pemasukanData.reduce((sum, item) => sum + item.jumlah, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pemasukan Infaq Parkir</h1>
          <p className="text-muted-foreground">Kelola data pemasukan infaq parkir</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Tambah Pemasukan
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pemasukan</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {totalPemasukan.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Daftar Pemasukan
          </CardTitle>
          <CardDescription>
            Total {pemasukanData.length} transaksi pemasukan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search">Cari Pemasukan</Label>
            <Input
              id="search"
              placeholder="Masukkan keterangan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {pemasukanData.map((item) => (
              <Card key={item.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{item.keterangan}</h3>
                      <p className="text-sm text-muted-foreground">
                        Tanggal: {item.tanggal}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{item.sumber}</Badge>
                        <span className="font-bold text-green-600">
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