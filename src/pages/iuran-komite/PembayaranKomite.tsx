import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Check, Clock, X } from "lucide-react";
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

const dummyPembayaran = [
  {
    id: 1,
    nama: "Ahmad Fauzi",
    nis: "2024001",
    namaTagihan: "Komite 2025",
    jumlahTagihan: 500000,
    jumlahBayar: 500000,
    tanggalBayar: "2024-01-20",
    status: "Lunas",
    metode: "Transfer Bank"
  },
  {
    id: 2,
    nama: "Muhammad Ali", 
    nis: "2024002",
    namaTagihan: "Komite 2025",
    jumlahTagihan: 500000,
    jumlahBayar: 300000,
    tanggalBayar: "2024-01-18",
    status: "Cicil",
    metode: "Tunai"
  },
  {
    id: 3,
    nama: "Abdul Rahman",
    nis: "2024003", 
    namaTagihan: "Komite Semester Genap",
    jumlahTagihan: 300000,
    jumlahBayar: 0,
    tanggalBayar: null,
    status: "Belum Bayar",
    metode: null
  }
];

export const PembayaranKomite = () => {
  const [pembayaran] = useState(dummyPembayaran);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPembayaran = pembayaran.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nis.includes(searchTerm) ||
    item.namaTagihan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Lunas": return <Check className="h-4 w-4" />;
      case "Cicil": return <Clock className="h-4 w-4" />;
      case "Belum Bayar": return <X className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Lunas": return "default";
      case "Cicil": return "secondary";
      case "Belum Bayar": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pembayaran Komite</h1>
        <p className="text-muted-foreground">
          Kelola pembayaran komite siswa pesantren
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Lunas</p>
                <p className="text-xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Cicil</p>
                <p className="text-xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <X className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Belum Bayar</p>
                <p className="text-xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Terkumpul</p>
              <p className="text-xl font-bold">Rp 800.000</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Pembayaran</CardTitle>
              <CardDescription>
                Total {filteredPembayaran.length} pembayaran
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Cari siswa atau tagihan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Catat Pembayaran
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Catat Pembayaran Komite</DialogTitle>
                    <DialogDescription>
                      Catat pembayaran komite dari siswa
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
                      <label className="text-sm font-medium">Tagihan</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tagihan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="komite-2025">Komite 2025 - Rp 500.000</SelectItem>
                          <SelectItem value="semester-genap">Komite Semester Genap - Rp 300.000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Jumlah Bayar</label>
                      <Input type="number" placeholder="500000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Metode Pembayaran</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih metode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tunai">Tunai</SelectItem>
                          <SelectItem value="transfer">Transfer Bank</SelectItem>
                          <SelectItem value="dana">DANA</SelectItem>
                          <SelectItem value="gopay">GoPay</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Batal</Button>
                    <Button>Simpan Pembayaran</Button>
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
                  <TableHead>Siswa</TableHead>
                  <TableHead>Tagihan</TableHead>
                  <TableHead>Jumlah Tagihan</TableHead>
                  <TableHead>Jumlah Bayar</TableHead>
                  <TableHead>Tanggal Bayar</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Metode</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPembayaran.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.nama}</div>
                        <div className="text-xs text-muted-foreground">{item.nis}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.namaTagihan}</TableCell>
                    <TableCell>Rp {item.jumlahTagihan.toLocaleString('id-ID')}</TableCell>
                    <TableCell>
                      {item.jumlahBayar > 0 ? `Rp ${item.jumlahBayar.toLocaleString('id-ID')}` : "-"}
                    </TableCell>
                    <TableCell>
                      {item.tanggalBayar ? new Date(item.tanggalBayar).toLocaleDateString('id-ID') : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(item.status)} className="gap-1">
                        {getStatusIcon(item.status)}
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.metode || "-"}</TableCell>
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