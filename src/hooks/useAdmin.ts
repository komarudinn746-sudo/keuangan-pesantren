import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Admin {
  id?: string;
  nama: string;
  email?: string;
  jabatan?: string;
  role?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export const useAdmin = () => {
  const [admin, setAdmin] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAdmin = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('admin')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdmin(data as Admin[] || []);
    } catch (error) {
      console.error('Error fetching admin:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data admin",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addAdmin = async (newAdmin: Omit<Admin, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('admin')
        .insert([newAdmin])
        .select()
        .single();

      if (error) throw error;
      
      setAdmin(prev => [data as Admin, ...prev]);
      toast({
        title: "Berhasil",
        description: "Data admin berhasil ditambahkan",
      });
      return data;
    } catch (error) {
      console.error('Error adding admin:', error);
      toast({
        title: "Error",
        description: "Gagal menambahkan data admin",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateAdmin = async (id: string, updatedAdmin: Partial<Admin>) => {
    try {
      const { data, error } = await supabase
        .from('admin')
        .update(updatedAdmin)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setAdmin(prev => prev.map(a => a.id === id ? data as Admin : a));
      toast({
        title: "Berhasil",
        description: "Data admin berhasil diupdate",
      });
      return data;
    } catch (error) {
      console.error('Error updating admin:', error);
      toast({
        title: "Error",
        description: "Gagal mengupdate data admin",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteAdmin = async (id: string) => {
    try {
      const { error } = await supabase
        .from('admin')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAdmin(prev => prev.filter(a => a.id !== id));
      toast({
        title: "Berhasil",
        description: "Data admin berhasil dihapus",
      });
    } catch (error) {
      console.error('Error deleting admin:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus data admin",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return {
    admin,
    loading,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    refetch: fetchAdmin
  };
};