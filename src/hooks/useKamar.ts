import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Kamar {
  id?: string;
  nomor: string;
  kapasitas: number;
  penghuni: number;
  status?: 'Tersedia' | 'Penuh' | 'Maintenance';
  keterangan?: string;
  created_at?: string;
  updated_at?: string;
}

export const useKamar = () => {
  const [kamar, setKamar] = useState<Kamar[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchKamar = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('kamar')
        .select('*')
        .order('nomor', { ascending: true });

      if (error) throw error;
      setKamar(data as Kamar[] || []);
    } catch (error) {
      console.error('Error fetching kamar:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data kamar",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addKamar = async (newKamar: Omit<Kamar, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('kamar')
        .insert([newKamar])
        .select()
        .single();

      if (error) throw error;
      
      setKamar(prev => [...prev, data as Kamar]);
      toast({
        title: "Berhasil",
        description: "Data kamar berhasil ditambahkan",
      });
      return data;
    } catch (error) {
      console.error('Error adding kamar:', error);
      toast({
        title: "Error",
        description: "Gagal menambahkan data kamar",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateKamar = async (id: string, updatedKamar: Partial<Kamar>) => {
    try {
      const { data, error } = await supabase
        .from('kamar')
        .update(updatedKamar)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setKamar(prev => prev.map(k => k.id === id ? data as Kamar : k));
      toast({
        title: "Berhasil",
        description: "Data kamar berhasil diupdate",
      });
      return data;
    } catch (error) {
      console.error('Error updating kamar:', error);
      toast({
        title: "Error",
        description: "Gagal mengupdate data kamar",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteKamar = async (id: string) => {
    try {
      const { error } = await supabase
        .from('kamar')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setKamar(prev => prev.filter(k => k.id !== id));
      toast({
        title: "Berhasil",
        description: "Data kamar berhasil dihapus",
      });
    } catch (error) {
      console.error('Error deleting kamar:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus data kamar",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchKamar();
  }, []);

  return {
    kamar,
    loading,
    addKamar,
    updateKamar,
    deleteKamar,
    refetch: fetchKamar
  };
};