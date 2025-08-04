import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Lembaga {
  id?: string;
  nama: string;
  kepala?: string;
  jumlah_siswa?: number;
  alamat?: string;
  telepon?: string;
  created_at?: string;
  updated_at?: string;
}

export const useLembaga = () => {
  const [lembaga, setLembaga] = useState<Lembaga[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLembaga = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('lembaga')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLembaga(data || []);
    } catch (error) {
      console.error('Error fetching lembaga:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data lembaga",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addLembaga = async (newLembaga: Omit<Lembaga, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('lembaga')
        .insert([newLembaga])
        .select()
        .single();

      if (error) throw error;
      
      setLembaga(prev => [data, ...prev]);
      toast({
        title: "Berhasil",
        description: "Data lembaga berhasil ditambahkan",
      });
      return data;
    } catch (error) {
      console.error('Error adding lembaga:', error);
      toast({
        title: "Error",
        description: "Gagal menambahkan data lembaga",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateLembaga = async (id: string, updatedLembaga: Partial<Lembaga>) => {
    try {
      const { data, error } = await supabase
        .from('lembaga')
        .update(updatedLembaga)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setLembaga(prev => prev.map(l => l.id === id ? data : l));
      toast({
        title: "Berhasil",
        description: "Data lembaga berhasil diupdate",
      });
      return data;
    } catch (error) {
      console.error('Error updating lembaga:', error);
      toast({
        title: "Error",
        description: "Gagal mengupdate data lembaga",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteLembaga = async (id: string) => {
    try {
      const { error } = await supabase
        .from('lembaga')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setLembaga(prev => prev.filter(l => l.id !== id));
      toast({
        title: "Berhasil",
        description: "Data lembaga berhasil dihapus",
      });
    } catch (error) {
      console.error('Error deleting lembaga:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus data lembaga",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchLembaga();
  }, []);

  return {
    lembaga,
    loading,
    addLembaga,
    updateLembaga,
    deleteLembaga,
    refetch: fetchLembaga
  };
};