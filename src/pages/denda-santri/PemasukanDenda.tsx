import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, TrendingUp, AlertTriangle } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

const dummyDenda = [
  {
    id: 1,
    tanggal: "2024-01-15",
    siswa: "Ahmad Fauzi",
    nis: "2024001",
    jenisPelanggaran: "Terlambat Sholat",
    jumlahDenda: 10000,
    keterangan: "Terlambat sholat maghrib",
    status: "Lunas"
  },
  {
    id: 2,
    tanggal: "2024-01-16",
    siswa: "Muhammad Ali",
    nis: "2024002",
    jenisPelanggaran: "Tidak Mengaji",
    jumlahDenda: 15000,
    keterangan: "Tidak mengikuti mengaji ba'da maghrib",
    status: "Belum Lunas"
  },
  {
    id: 3,
    tanggal: "2024-01-17",
    siswa: "Abdul Rahman", 
    nis: "2024003",
    jenisPelanggaran: "Keluar Tanpa Izin",
    jumlahDenda: 25000,
    keterangan: "Keluar pesantren tanpa izin",
    status: "Lunas"
  }
];

export const PemasukanDenda = () => {
  const [denda] = useState(dummyDenda);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDenda = denda.filter(item =>
    item.siswa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nis.includes(searchTerm) ||
    item.jenisPelanggaran.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPemasukan = denda.filter(d => d.status === "Lunas").reduce((total, item) => total + item.jumlahDenda, 0);
  const totalBelumLunas = denda.filter(d => d.status === "Belum Lunas").reduce((total, item) => total + item.jumlahDenda, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pemasukan Denda Santri</h1>
        <p className="text-muted-foreground">
          Kelola pemasukan dari denda pelanggaran santri
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Terkumpul</p>
                <p className="text-xl font-bold">Rp {totalPemasukan.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Belum Lunas</p>
                <p className="text-xl font-bold">Rp {totalBelumLunas.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Kasus</p>
              <p className="text-xl font-bold">{denda.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Belum Bayar</p>
              <p className="text-xl font-bold">{denda.filter(d => d.status === "Belum Lunas").length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Denda</CardTitle>
              <CardDescription>
                Total {filteredDenda.length} kasus denda
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Cari siswa atau pelanggaran..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Tambah Denda
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Tambah Denda Santri</DialogTitle>
                    <DialogDescription>
                      Catat denda dari pelanggaran santri
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Siswa</label>
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
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Jenis Pelanggaran</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis pelanggaran" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sholat">Terlambat Sholat - Rp 10.000</SelectItem>
                          <SelectItem value="mengaji">Tidak Mengaji - Rp 15.000</SelectItem>
                          <SelectItem value="keluar">Keluar Tanpa Izin - Rp 25.000</SelectItem>
                          <SelectItem value="gaduh">Gaduh di Asrama - Rp 20.000</SelectItem>
                          <SelectItem value="lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Jumlah Denda</label>
                      <Input type="number" placeholder="10000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Keterangan</label>
                      <Textarea placeholder="Jelaskan detail pelanggaran..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lunas">Lunas</SelectItem>
                          <SelectItem value="belum">Belum Lunas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Batal</Button>
                    <Button>Simpan Denda</Button>
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
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Siswa</TableHead>
                  <TableHead>Jenis Pelanggaran</TableHead>
                  <TableHead>Jumlah Denda</TableHead>
                  <TableHead>Keterangan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDenda.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {new Date(item.tanggal).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.siswa}</div>
                        <div className="text-xs text-muted-foreground">{item.nis}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.jenisPelanggaran}</TableCell>
                    <TableCell>Rp {item.jumlahDenda.toLocaleString('id-ID')}</TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={item.keterangan}>
                        {item.keterangan}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "Lunas" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {item.status}
                      </span>
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