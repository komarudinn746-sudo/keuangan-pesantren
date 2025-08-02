import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, Building, GraduationCap, User } from "lucide-react";
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

const dummyTagihan = [
  {
    id: 1,
    namaTagihan: "Komite 2025",
    jumlah: 500000,
    target: "Semua Siswa",
    targetDetail: "450 siswa",
    status: "Aktif",
    tanggalBuat: "2024-01-15",
  },
  {
    id: 2,
    namaTagihan: "Komite Semester Genap",
    jumlah: 300000,
    target: "Kamar Al-Ikhlas",
    targetDetail: "120 siswa",
    status: "Aktif",
    tanggalBuat: "2024-01-20",
  },
];

export const TagihanKomite = () => {
  const [tagihan] = useState(dummyTagihan);
  const [targetType, setTargetType] = useState("semua");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tagihan Komite</h1>
        <p className="text-muted-foreground">
          Kelola tagihan komite untuk siswa pesantren
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Tagihan</CardTitle>
              <CardDescription>
                Total {tagihan.length} tagihan dibuat
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Buat Tagihan Baru
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Buat Tagihan Komite</DialogTitle>
                  <DialogDescription>
                    Buat tagihan baru untuk siswa pesantren
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nama Tagihan</label>
                    <Input placeholder="Contoh: Komite 2025" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Jumlah Tagihan</label>
                    <Input type="number" placeholder="500000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Target Siswa</label>
                    <Select value={targetType} onValueChange={setTargetType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih target siswa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="semua">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Semua Siswa
                          </div>
                        </SelectItem>
                        <SelectItem value="kamar">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            Berdasarkan Kamar
                          </div>
                        </SelectItem>
                        <SelectItem value="lembaga">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            Berdasarkan Lembaga
                          </div>
                        </SelectItem>
                        <SelectItem value="individu">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Siswa Tertentu
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {targetType === "kamar" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Pilih Kamar</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kamar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="al-ikhlas-1">Al-Ikhlas 1</SelectItem>
                          <SelectItem value="al-ikhlas-2">Al-Ikhlas 2</SelectItem>
                          <SelectItem value="al-fatah-1">Al-Fatah 1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {targetType === "lembaga" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Pilih Lembaga</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih lembaga" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mts-putra">MTs Putra</SelectItem>
                          <SelectItem value="ma-putra">MA Putra</SelectItem>
                          <SelectItem value="smp-putra">SMP Putra</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {targetType === "individu" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Pilih Siswa</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih siswa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ahmad">Ahmad Fauzi (2024001)</SelectItem>
                          <SelectItem value="muhammad">Muhammad Ali (2024002)</SelectItem>
                          <SelectItem value="abdul">Abdul Rahman (2024003)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Batal</Button>
                  <Button>Buat Tagihan</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama Tagihan</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal Dibuat</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tagihan.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{item.namaTagihan}</TableCell>
                    <TableCell>Rp {item.jumlah.toLocaleString('id-ID')}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.target}</div>
                        <div className="text-xs text-muted-foreground">{item.targetDetail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.status === "Aktif" ? "default" : "secondary"}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(item.tanggalBuat).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Detail
                      </Button>
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