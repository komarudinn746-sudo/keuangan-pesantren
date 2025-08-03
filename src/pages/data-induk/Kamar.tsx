import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Building, Plus, Edit, Trash2 } from "lucide-react";

export const Kamar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - nanti bisa diganti dengan data dari Supabase
  const kamarData = [
    { id: 1, nomor: "A-101", kapasitas: 4, penghuni: 3, status: "Tersedia" },
    { id: 2, nomor: "A-102", kapasitas: 4, penghuni: 4, status: "Penuh" },
    { id: 3, nomor: "B-201", kapasitas: 6, penghuni: 5, status: "Tersedia" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Data Kamar</h1>
          <p className="text-muted-foreground">Kelola data kamar santri</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Tambah Kamar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Daftar Kamar
          </CardTitle>
          <CardDescription>
            Total {kamarData.length} kamar terdaftar
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

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {kamarData.map((kamar) => (
              <Card key={kamar.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{kamar.nomor}</h3>
                    <Badge variant={kamar.status === "Penuh" ? "destructive" : "default"}>
                      {kamar.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Penghuni: {kamar.penghuni}/{kamar.kapasitas} orang
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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