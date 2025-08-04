export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      admin: {
        Row: {
          created_at: string
          email: string | null
          id: string
          jabatan: string | null
          nama: string
          role: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          jabatan?: string | null
          nama: string
          role?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          jabatan?: string | null
          nama?: string
          role?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      denda_santri: {
        Row: {
          created_at: string
          id: string
          jenis_pelanggaran: string
          jumlah_denda: number
          keterangan: string | null
          siswa_id: string | null
          status: string | null
          tanggal: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          jenis_pelanggaran: string
          jumlah_denda: number
          keterangan?: string | null
          siswa_id?: string | null
          status?: string | null
          tanggal?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          jenis_pelanggaran?: string
          jumlah_denda?: number
          keterangan?: string | null
          siswa_id?: string | null
          status?: string | null
          tanggal?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "denda_santri_siswa_id_fkey"
            columns: ["siswa_id"]
            isOneToOne: false
            referencedRelation: "siswa"
            referencedColumns: ["id"]
          },
        ]
      }
      infaq_parkir_pemasukan: {
        Row: {
          created_at: string
          id: string
          jumlah: number
          keterangan: string | null
          sumber: string
          tanggal: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          jumlah: number
          keterangan?: string | null
          sumber: string
          tanggal?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          jumlah?: number
          keterangan?: string | null
          sumber?: string
          tanggal?: string
          updated_at?: string
        }
        Relationships: []
      }
      infaq_parkir_pengeluaran: {
        Row: {
          created_at: string
          id: string
          jumlah: number
          keperluan: string
          keterangan: string | null
          tanggal: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          jumlah: number
          keperluan: string
          keterangan?: string | null
          tanggal?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          jumlah?: number
          keperluan?: string
          keterangan?: string | null
          tanggal?: string
          updated_at?: string
        }
        Relationships: []
      }
      kamar: {
        Row: {
          created_at: string
          id: string
          kapasitas: number
          keterangan: string | null
          nomor: string
          penghuni: number
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          kapasitas?: number
          keterangan?: string | null
          nomor: string
          penghuni?: number
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          kapasitas?: number
          keterangan?: string | null
          nomor?: string
          penghuni?: number
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      komite_pembayaran: {
        Row: {
          created_at: string
          id: string
          jumlah: number
          keterangan: string | null
          metode_bayar: string | null
          periode: string
          siswa_id: string | null
          tanggal_bayar: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          jumlah: number
          keterangan?: string | null
          metode_bayar?: string | null
          periode: string
          siswa_id?: string | null
          tanggal_bayar?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          jumlah?: number
          keterangan?: string | null
          metode_bayar?: string | null
          periode?: string
          siswa_id?: string | null
          tanggal_bayar?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "komite_pembayaran_siswa_id_fkey"
            columns: ["siswa_id"]
            isOneToOne: false
            referencedRelation: "siswa"
            referencedColumns: ["id"]
          },
        ]
      }
      komite_pengeluaran: {
        Row: {
          created_at: string
          id: string
          jumlah: number
          keperluan: string
          keterangan: string | null
          tanggal: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          jumlah: number
          keperluan: string
          keterangan?: string | null
          tanggal?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          jumlah?: number
          keperluan?: string
          keterangan?: string | null
          tanggal?: string
          updated_at?: string
        }
        Relationships: []
      }
      lembaga: {
        Row: {
          alamat: string | null
          created_at: string
          id: string
          jumlah_siswa: number | null
          kepala: string | null
          nama: string
          telepon: string | null
          updated_at: string
        }
        Insert: {
          alamat?: string | null
          created_at?: string
          id?: string
          jumlah_siswa?: number | null
          kepala?: string | null
          nama: string
          telepon?: string | null
          updated_at?: string
        }
        Update: {
          alamat?: string | null
          created_at?: string
          id?: string
          jumlah_siswa?: number | null
          kepala?: string | null
          nama?: string
          telepon?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      siswa: {
        Row: {
          alamat: string | null
          created_at: string
          id: string
          jenis_kelamin: string | null
          kelas: string
          nama: string
          nama_wali: string | null
          nis: string
          tanggal_lahir: string | null
          telepon_wali: string | null
          tempat_lahir: string | null
          updated_at: string
        }
        Insert: {
          alamat?: string | null
          created_at?: string
          id?: string
          jenis_kelamin?: string | null
          kelas: string
          nama: string
          nama_wali?: string | null
          nis: string
          tanggal_lahir?: string | null
          telepon_wali?: string | null
          tempat_lahir?: string | null
          updated_at?: string
        }
        Update: {
          alamat?: string | null
          created_at?: string
          id?: string
          jenis_kelamin?: string | null
          kelas?: string
          nama?: string
          nama_wali?: string | null
          nis?: string
          tanggal_lahir?: string | null
          telepon_wali?: string | null
          tempat_lahir?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      surat_izin_pemasukan: {
        Row: {
          biaya: number
          created_at: string
          id: string
          jenis_surat: string
          keterangan: string | null
          siswa_id: string | null
          tanggal: string
          updated_at: string
        }
        Insert: {
          biaya: number
          created_at?: string
          id?: string
          jenis_surat: string
          keterangan?: string | null
          siswa_id?: string | null
          tanggal?: string
          updated_at?: string
        }
        Update: {
          biaya?: number
          created_at?: string
          id?: string
          jenis_surat?: string
          keterangan?: string | null
          siswa_id?: string | null
          tanggal?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "surat_izin_pemasukan_siswa_id_fkey"
            columns: ["siswa_id"]
            isOneToOne: false
            referencedRelation: "siswa"
            referencedColumns: ["id"]
          },
        ]
      }
      surat_izin_pengeluaran: {
        Row: {
          created_at: string
          id: string
          jumlah: number
          keperluan: string
          keterangan: string | null
          tanggal: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          jumlah: number
          keperluan: string
          keterangan?: string | null
          tanggal?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          jumlah?: number
          keperluan?: string
          keterangan?: string | null
          tanggal?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
