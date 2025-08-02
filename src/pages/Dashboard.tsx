import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  CreditCard, 
  FileText, 
  AlertTriangle, 
  Car, 
  TrendingUp,
  DollarSign 
} from "lucide-react";

const statsCards = [
  {
    title: "Total Siswa",
    value: "450",
    description: "Siswa aktif",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Iuran Komite",
    value: "Rp 25.500.000",
    description: "Saldo bulan ini",
    icon: CreditCard,
    color: "text-green-600",
  },
  {
    title: "Surat Izin",
    value: "Rp 1.250.000",
    description: "Saldo bulan ini",
    icon: FileText,
    color: "text-purple-600",
  },
  {
    title: "Denda Santri",
    value: "Rp 750.000",
    description: "Saldo bulan ini",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    title: "Infaq Parkir",
    value: "Rp 500.000",
    description: "Saldo bulan ini",
    icon: Car,
    color: "text-amber-600",
  },
  {
    title: "Total Saldo",
    value: "Rp 28.000.000",
    description: "Saldo keseluruhan",
    icon: TrendingUp,
    color: "text-primary",
  },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Ringkasan keuangan pesantren secara real-time
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Pemasukan Terbaru
            </CardTitle>
            <CardDescription>
              Transaksi pemasukan 5 terakhir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Ahmad Fauzi", amount: "Rp 500.000", type: "Iuran Komite", time: "2 jam lalu" },
                { name: "Siti Aminah", amount: "Rp 250.000", type: "Iuran Komite", time: "5 jam lalu" },
                { name: "Muhammad Ali", amount: "Rp 50.000", type: "Denda Santri", time: "1 hari lalu" },
                { name: "Fatimah", amount: "Rp 25.000", type: "Surat Izin", time: "1 hari lalu" },
                { name: "Abdul Rahman", amount: "Rp 10.000", type: "Infaq Parkir", time: "2 hari lalu" },
              ].map((transaction, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{transaction.name}</p>
                    <p className="text-xs text-muted-foreground">{transaction.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm text-green-600">{transaction.amount}</p>
                    <p className="text-xs text-muted-foreground">{transaction.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-600" />
              Pengeluaran Terbaru
            </CardTitle>
            <CardDescription>
              Transaksi pengeluaran 5 terakhir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { desc: "Pembelian Alat Tulis", amount: "Rp 250.000", type: "Iuran Komite", time: "3 jam lalu" },
                { desc: "Perbaikan Fasilitas", amount: "Rp 500.000", type: "Iuran Komite", time: "6 jam lalu" },
                { desc: "Biaya Administrasi", amount: "Rp 100.000", type: "Surat Izin", time: "1 hari lalu" },
                { desc: "Operasional Harian", amount: "Rp 75.000", type: "Denda Santri", time: "2 hari lalu" },
                { desc: "Maintenance Parkir", amount: "Rp 50.000", type: "Infaq Parkir", time: "2 hari lalu" },
              ].map((transaction, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{transaction.desc}</p>
                    <p className="text-xs text-muted-foreground">{transaction.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm text-red-600">{transaction.amount}</p>
                    <p className="text-xs text-muted-foreground">{transaction.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};