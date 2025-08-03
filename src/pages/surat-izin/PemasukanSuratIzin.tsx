import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, TrendingUp, FileText } from "lucide-react";
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

const dummyPemasukan = [
  {
    id: 1,
    tanggal: "2024-01-15",
    siswa: "Ahmad Fauzi",
    nis: "2024001",
    jenisSurat: "Izin Keluar",
    biaya: 25000,
    keterangan: "Izin keluar pesantren untuk keperluan keluarga",
    status: "Lunas"
  },
  {
    id: 2,
    tanggal: "2024-01-16",
    siswa: "Muhammad Ali",
    nis: "2024002", 
    jenisSurat: "Izin Pulang",
    biaya: 50000,
    keterangan: "Izin pulang kampung halaman",
    status: "Lunas"
  },
  {
    id: 3,
    tanggal: "2024-01-17",
    siswa: "Abdul Rahman",
    nis: "2024003",
    jenisSurat: "Izin Sakit",
    biaya: 15000,
    keterangan: "Izin berobat ke rumah sakit",
    status: "Lunas"
  }
];

export const PemasukanSuratIzin = () => {
  const [pemasukan] = useState(dummyPemasukan);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPemasukan = pemasukan.filter(item =>
    item.siswa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nis.includes(searchTerm) ||
    item.jenisSurat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPemasukan = pemasukan.reduce((total, item) => total + item.biaya, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pemasukan Surat Izin</h1>
        <p className="text-muted-foreground">
          Kelola pemasukan dari biaya surat izin siswa
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Pemasukan</p>
                <p className="text-xl font-bold">Rp {totalPemasukan.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Jumlah Surat</p>
                <p className="text-xl font-bold">{pemasukan.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Bulan Ini</p>
              <p className="text-xl font-bold">Rp {totalPemasukan.toLocaleString('id-ID')}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Rata-rata</p>
              <p className="text-xl font-bold">Rp {Math.round(totalPemasukan / pemasukan.length).toLocaleString('id-ID')}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Pemasukan</CardTitle>
              <CardDescription>
                Total {filteredPemasukan.length} transaksi pemasukan
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Cari siswa atau jenis surat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Tambah Pemasukan
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Tambah Pemasukan Surat Izin</DialogTitle>
                    <DialogDescription>
                      Catat pemasukan dari biaya surat izin siswa
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
                      <label className="text-sm font-medium">Jenis Surat Izin</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis surat" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="keluar">Izin Keluar - Rp 25.000</SelectItem>
                          <SelectItem value="pulang">Izin Pulang - Rp 50.000</SelectItem>
                          <SelectItem value="sakit">Izin Sakit - Rp 15.000</SelectItem>
                          <SelectItem value="darurat">Izin Darurat - Rp 30.000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Biaya</label>
                      <Input type="number" placeholder="25000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Keterangan</label>
                      <Textarea placeholder="Jelaskan keperluan izin..." />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Batal</Button>
                    <Button>Simpan Pemasukan</Button>
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
                  <TableHead>Jenis Surat</TableHead>
                  <TableHead>Biaya</TableHead>
                  <TableHead>Keterangan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPemasukan.map((item, index) => (
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
                    <TableCell className="font-medium">{item.jenisSurat}</TableCell>
                    <TableCell>Rp {item.biaya.toLocaleString('id-ID')}</TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={item.keterangan}>
                        {item.keterangan}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
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