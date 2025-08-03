import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Plus, Edit, Trash2 } from "lucide-react";

export const Lembaga = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const lembagaData = [
    { id: 1, nama: "Madrasah Ibtidaiyah", kepala: "Ustadz Ahmad", siswa: 120 },
    { id: 2, nama: "Madrasah Tsanawiyah", kepala: "Ustadzah Fatimah", siswa: 85 },
    { id: 3, nama: "Madrasah Aliyah", kepala: "Ustadz Muhammad", siswa: 60 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lembaga Pendidikan</h1>
          <p className="text-muted-foreground">Kelola data lembaga pendidikan</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Tambah Lembaga
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Daftar Lembaga
          </CardTitle>
          <CardDescription>
            Total {lembagaData.length} lembaga pendidikan
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

          <div className="space-y-4">
            {lembagaData.map((lembaga) => (
              <Card key={lembaga.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{lembaga.nama}</h3>
                      <p className="text-sm text-muted-foreground">
                        Kepala: {lembaga.kepala}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Jumlah Siswa: {lembaga.siswa} orang
                      </p>
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