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
import { TagihanKomite } from "@/pages/iuran-komite/TagihanKomite";
import { PembayaranKomite } from "@/pages/iuran-komite/PembayaranKomite";
import { PemasukanSuratIzin } from "@/pages/surat-izin/PemasukanSuratIzin";
import { PemasukanDenda } from "@/pages/denda-santri/PemasukanDenda";
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
            
            {/* Surat Izin Routes */}
            <Route path="/surat-izin/pemasukan" element={
              <DashboardLayout>
                <PemasukanSuratIzin />
              </DashboardLayout>
            } />
            
            {/* Denda Santri Routes */}
            <Route path="/denda-santri/pemasukan" element={
              <DashboardLayout>
                <PemasukanDenda />
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
