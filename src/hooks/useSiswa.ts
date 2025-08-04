import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Siswa {
  id?: string;
  nis: string;
  nama: string;
  kelas: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  jenis_kelamin?: 'L' | 'P';
  alamat?: string;
  nama_wali?: string;
  telepon_wali?: string;
  created_at?: string;
  updated_at?: string;
}

export const useSiswa = () => {
  const [siswa, setSiswa] = useState<Siswa[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSiswa = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('siswa')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSiswa(data as Siswa[] || []);
    } catch (error) {
      console.error('Error fetching siswa:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data siswa",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addSiswa = async (newSiswa: Omit<Siswa, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('siswa')
        .insert([newSiswa])
        .select()
        .single();

      if (error) throw error;
      
      setSiswa(prev => [data as Siswa, ...prev]);
      toast({
        title: "Berhasil",
        description: "Data siswa berhasil ditambahkan",
      });
      return data;
    } catch (error) {
      console.error('Error adding siswa:', error);
      toast({
        title: "Error",
        description: "Gagal menambahkan data siswa",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateSiswa = async (id: string, updatedSiswa: Partial<Siswa>) => {
    try {
      const { data, error } = await supabase
        .from('siswa')
        .update(updatedSiswa)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setSiswa(prev => prev.map(s => s.id === id ? data as Siswa : s));
      toast({
        title: "Berhasil",
        description: "Data siswa berhasil diupdate",
      });
      return data;
    } catch (error) {
      console.error('Error updating siswa:', error);
      toast({
        title: "Error",
        description: "Gagal mengupdate data siswa",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteSiswa = async (id: string) => {
    try {
      const { error } = await supabase
        .from('siswa')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSiswa(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Berhasil",
        description: "Data siswa berhasil dihapus",
      });
    } catch (error) {
      console.error('Error deleting siswa:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus data siswa",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchSiswa();
  }, []);

  return {
    siswa,
    loading,
    addSiswa,
    updateSiswa,
    deleteSiswa,
    refetch: fetchSiswa
  };
};