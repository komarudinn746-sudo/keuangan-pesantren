-- Create tables for pesantren financial management system

-- Table untuk data siswa
CREATE TABLE public.siswa (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nis VARCHAR(20) NOT NULL UNIQUE,
  nama VARCHAR(100) NOT NULL,
  kelas VARCHAR(20) NOT NULL,
  tempat_lahir VARCHAR(50),
  tanggal_lahir DATE,
  jenis_kelamin VARCHAR(10) CHECK (jenis_kelamin IN ('L', 'P')),
  alamat TEXT,
  nama_wali VARCHAR(100),
  telepon_wali VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table untuk data kamar
CREATE TABLE public.kamar (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nomor VARCHAR(20) NOT NULL UNIQUE,
  kapasitas INTEGER NOT NULL DEFAULT 4,
  penghuni INTEGER NOT NULL DEFAULT 0,
  status VARCHAR(20) DEFAULT 'Tersedia' CHECK (status IN ('Tersedia', 'Penuh', 'Maintenance')),
  keterangan TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table untuk data lembaga
CREATE TABLE public.lembaga (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  kepala VARCHAR(100),
  jumlah_siswa INTEGER DEFAULT 0,
  alamat TEXT,
  telepon VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table untuk admin/staff
CREATE TABLE public.admin (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  jabatan VARCHAR(50),
  role VARCHAR(20) DEFAULT 'Staff' CHECK (role IN ('Admin', 'Supervisor', 'Staff')),
  status VARCHAR(20) DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Nonaktif')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table untuk denda santri
CREATE TABLE public.denda_santri (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  siswa_id UUID REFERENCES public.siswa(id) ON DELETE CASCADE,
  jenis_pelanggaran VARCHAR(100) NOT NULL,
  jumlah_denda INTEGER NOT NULL,
  tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
  keterangan TEXT,
  status VARCHAR(20) DEFAULT 'Belum Lunas' CHECK (status IN ('Lunas', 'Belum Lunas')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table untuk infaq parkir pemasukan
CREATE TABLE public.infaq_parkir_pemasukan (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
  sumber VARCHAR(100) NOT NULL,
  jumlah INTEGER NOT NULL,
  keterangan TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table untuk infaq parkir pengeluaran
CREATE TABLE public.infaq_parkir_pengeluaran (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
  keperluan VARCHAR(100) NOT NULL,
  jumlah INTEGER NOT NULL,
  keterangan TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table untuk komite pemasukan (pembayaran)
CREATE TABLE public.komite_pembayaran (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  siswa_id UUID REFERENCES public.siswa(id) ON DELETE CASCADE,
  periode VARCHAR(20) NOT NULL,
  jumlah INTEGER NOT NULL,
  tanggal_bayar DATE NOT NULL DEFAULT CURRENT_DATE,
  metode_bayar VARCHAR(20) DEFAULT 'Tunai',
  keterangan TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table untuk komite pengeluaran
CREATE TABLE public.komite_pengeluaran (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
  keperluan VARCHAR(100) NOT NULL,
  jumlah INTEGER NOT NULL,
  keterangan TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table untuk surat izin pemasukan
CREATE TABLE public.surat_izin_pemasukan (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  siswa_id UUID REFERENCES public.siswa(id) ON DELETE CASCADE,
  tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
  jenis_surat VARCHAR(50) NOT NULL,
  biaya INTEGER NOT NULL,
  keterangan TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table untuk surat izin pengeluaran
CREATE TABLE public.surat_izin_pengeluaran (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
  keperluan VARCHAR(100) NOT NULL,
  jumlah INTEGER NOT NULL,
  keterangan TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.siswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kamar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lembaga ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.denda_santri ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.infaq_parkir_pemasukan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.infaq_parkir_pengeluaran ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.komite_pembayaran ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.komite_pengeluaran ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.surat_izin_pemasukan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.surat_izin_pengeluaran ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations for authenticated users (untuk sementara)
CREATE POLICY "Allow all operations for authenticated users" ON public.siswa FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.kamar FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.lembaga FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.admin FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.denda_santri FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.infaq_parkir_pemasukan FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.infaq_parkir_pengeluaran FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.komite_pembayaran FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.komite_pengeluaran FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.surat_izin_pemasukan FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.surat_izin_pengeluaran FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_siswa_updated_at BEFORE UPDATE ON public.siswa FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_kamar_updated_at BEFORE UPDATE ON public.kamar FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_lembaga_updated_at BEFORE UPDATE ON public.lembaga FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_admin_updated_at BEFORE UPDATE ON public.admin FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_denda_santri_updated_at BEFORE UPDATE ON public.denda_santri FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_infaq_parkir_pemasukan_updated_at BEFORE UPDATE ON public.infaq_parkir_pemasukan FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_infaq_parkir_pengeluaran_updated_at BEFORE UPDATE ON public.infaq_parkir_pengeluaran FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_komite_pembayaran_updated_at BEFORE UPDATE ON public.komite_pembayaran FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_komite_pengeluaran_updated_at BEFORE UPDATE ON public.komite_pengeluaran FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_surat_izin_pemasukan_updated_at BEFORE UPDATE ON public.surat_izin_pemasukan FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_surat_izin_pengeluaran_updated_at BEFORE UPDATE ON public.surat_izin_pengeluaran FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();