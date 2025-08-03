import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Login } from "@/pages/Login";
import { Dashboard } from "@/pages/Dashboard";
import { Siswa } from "@/pages/data-induk/Siswa";
import { Admin } from "@/pages/data-induk/Admin";
import { Kamar } from "@/pages/data-induk/Kamar";
import { Lembaga } from "@/pages/data-induk/Lembaga";
import { TagihanKomite } from "@/pages/iuran-komite/TagihanKomite";
import { PembayaranKomite } from "@/pages/iuran-komite/PembayaranKomite";
import { PengeluaranKomite } from "@/pages/iuran-komite/PengeluaranKomite";
import { LaporanKomite } from "@/pages/iuran-komite/LaporanKomite";
import { PemasukanSuratIzin } from "@/pages/surat-izin/PemasukanSuratIzin";
import { PengeluaranSuratIzin } from "@/pages/surat-izin/PengeluaranSuratIzin";
import { LaporanSuratIzin } from "@/pages/surat-izin/LaporanSuratIzin";
import { PemasukanDenda } from "@/pages/denda-santri/PemasukanDenda";
import { PengeluaranDenda } from "@/pages/denda-santri/PengeluaranDenda";
import { LaporanDenda } from "@/pages/denda-santri/LaporanDenda";
import { PemasukanInfaq } from "@/pages/infaq-parkir/PemasukanInfaq";
import { PengeluaranInfaq } from "@/pages/infaq-parkir/PengeluaranInfaq";
import { LaporanInfaq } from "@/pages/infaq-parkir/LaporanInfaq";
import { LaporanUmum } from "@/pages/LaporanUmum";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            } />
            
            {/* Data Induk Routes */}
            <Route path="/data-induk/siswa" element={
              <DashboardLayout>
                <Siswa />
              </DashboardLayout>
            } />
            <Route path="/data-induk/admin" element={
              <DashboardLayout>
                <Admin />
              </DashboardLayout>
            } />
            <Route path="/data-induk/kamar" element={
              <DashboardLayout>
                <Kamar />
              </DashboardLayout>
            } />
            <Route path="/data-induk/lembaga" element={
              <DashboardLayout>
                <Lembaga />
              </DashboardLayout>
            } />
            
            {/* Iuran Komite Routes */}
            <Route path="/iuran-komite/tagihan" element={
              <DashboardLayout>
                <TagihanKomite />
              </DashboardLayout>
            } />
            <Route path="/iuran-komite/pembayaran" element={
              <DashboardLayout>
                <PembayaranKomite />
              </DashboardLayout>
            } />
            <Route path="/iuran-komite/pengeluaran" element={
              <DashboardLayout>
                <PengeluaranKomite />
              </DashboardLayout>
            } />
            <Route path="/iuran-komite/laporan" element={
              <DashboardLayout>
                <LaporanKomite />
              </DashboardLayout>
            } />
            
            {/* Surat Izin Routes */}
            <Route path="/surat-izin/pemasukan" element={
              <DashboardLayout>
                <PemasukanSuratIzin />
              </DashboardLayout>
            } />
            <Route path="/surat-izin/pengeluaran" element={
              <DashboardLayout>
                <PengeluaranSuratIzin />
              </DashboardLayout>
            } />
            <Route path="/surat-izin/laporan" element={
              <DashboardLayout>
                <LaporanSuratIzin />
              </DashboardLayout>
            } />
            
            {/* Denda Santri Routes */}
            <Route path="/denda-santri/pemasukan" element={
              <DashboardLayout>
                <PemasukanDenda />
              </DashboardLayout>
            } />
            <Route path="/denda-santri/pengeluaran" element={
              <DashboardLayout>
                <PengeluaranDenda />
              </DashboardLayout>
            } />
            <Route path="/denda-santri/laporan" element={
              <DashboardLayout>
                <LaporanDenda />
              </DashboardLayout>
            } />
            
            {/* Infaq Parkir Routes */}
            <Route path="/infaq-parkir/pemasukan" element={
              <DashboardLayout>
                <PemasukanInfaq />
              </DashboardLayout>
            } />
            <Route path="/infaq-parkir/pengeluaran" element={
              <DashboardLayout>
                <PengeluaranInfaq />
              </DashboardLayout>
            } />
            <Route path="/infaq-parkir/laporan" element={
              <DashboardLayout>
                <LaporanInfaq />
              </DashboardLayout>
            } />
            
            {/* Laporan Umum Routes */}
            <Route path="/laporan-umum" element={
              <DashboardLayout>
                <LaporanUmum />
              </DashboardLayout>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
