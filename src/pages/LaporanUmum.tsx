import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, TrendingDown, DollarSign, FileText } from "lucide-react";

export const LaporanUmum = () => {
  // Mock data
  const laporanUmum = {
    totalPemasukanSemua: 58500000,
    totalPengeluaranSemua: 37550000,
    saldoKeseluruhan: 20950000,
    transaksiTotal: 245,
  };

  const perKategori = [
    { nama: "Iuran Komite", pemasukan: 50000000, pengeluaran: 35000000, saldo: 15000000 },
    { nama: "Surat Izin", pemasukan: 2000000, pengeluaran: 175000, saldo: 1825000 },
    { nama: "Denda Santri", pemasukan: 5000000, pengeluaran: 775000, saldo: 4225000 },
    { nama: "Infaq Parkir", pemasukan: 1500000, pengeluaran: 800000, saldo: 700000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Laporan Umum</h1>
        <p className="text-muted-foreground">Laporan keuangan keseluruhan pesantren</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pemasukan</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              Rp {laporanUmum.totalPemasukanSemua.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              Rp {laporanUmum.totalPengeluaranSemua.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Keseluruhan</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              Rp {laporanUmum.saldoKeseluruhan.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{laporanUmum.transaksiTotal}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Laporan Per Kategori
          </CardTitle>
          <CardDescription>Ringkasan keuangan per kategori</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {perKategori.map((kategori) => (
              <Card key={kategori.nama} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{kategori.nama}</h3>
                    <span className={`font-bold ${kategori.saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      Rp {kategori.saldo.toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Pemasukan: </span>
                      <span className="text-green-600 font-medium">
                        Rp {kategori.pemasukan.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Pengeluaran: </span>
                      <span className="text-red-600 font-medium">
                        Rp {kategori.pengeluaran.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Eksekutif</CardTitle>
          <CardDescription>Analisis keuangan keseluruhan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800">Total Pemasukan Semua Kategori</h3>
              <p className="text-green-600 text-xl font-bold">
                Rp {laporanUmum.totalPemasukanSemua.toLocaleString()}
              </p>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-800">Total Pengeluaran Semua Kategori</h3>
              <p className="text-red-600 text-xl font-bold">
                Rp {laporanUmum.totalPengeluaranSemua.toLocaleString()}
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800">Surplus Keseluruhan</h3>
              <p className="text-blue-600 text-xl font-bold">
                Rp {laporanUmum.saldoKeseluruhan.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};