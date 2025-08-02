import { useState } from "react";
import { 
  Users, 
  UserCheck, 
  Building, 
  GraduationCap,
  CreditCard,
  Receipt,
  DollarSign,
  FileText,
  TrendingUp,
  AlertTriangle,
  Car,
  BarChart3,
  Home
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Data Induk",
    icon: Users,
    items: [
      { title: "Siswa", url: "/data-induk/siswa", icon: GraduationCap },
      { title: "Admin", url: "/data-induk/admin", icon: UserCheck },
      { title: "Kamar", url: "/data-induk/kamar", icon: Building },
      { title: "Lembaga Pendidikan", url: "/data-induk/lembaga", icon: Building },
    ],
  },
  {
    title: "Iuran Komite",
    icon: CreditCard,
    items: [
      { title: "Tagihan Komite", url: "/iuran-komite/tagihan", icon: Receipt },
      { title: "Pembayaran Komite", url: "/iuran-komite/pembayaran", icon: DollarSign },
      { title: "Pengeluaran Komite", url: "/iuran-komite/pengeluaran", icon: TrendingUp },
      { title: "Laporan Komite", url: "/iuran-komite/laporan", icon: FileText },
    ],
  },
  {
    title: "Surat Izin",
    icon: FileText,
    items: [
      { title: "Pemasukan", url: "/surat-izin/pemasukan", icon: DollarSign },
      { title: "Pengeluaran", url: "/surat-izin/pengeluaran", icon: TrendingUp },
      { title: "Laporan", url: "/surat-izin/laporan", icon: BarChart3 },
    ],
  },
  {
    title: "Denda Santri",
    icon: AlertTriangle,
    items: [
      { title: "Pemasukan", url: "/denda-santri/pemasukan", icon: DollarSign },
      { title: "Pengeluaran", url: "/denda-santri/pengeluaran", icon: TrendingUp },
      { title: "Laporan", url: "/denda-santri/laporan", icon: BarChart3 },
    ],
  },
  {
    title: "Infaq Parkir",
    icon: Car,
    items: [
      { title: "Pemasukan", url: "/infaq-parkir/pemasukan", icon: DollarSign },
      { title: "Pengeluaran", url: "/infaq-parkir/pengeluaran", icon: TrendingUp },
      { title: "Laporan", url: "/infaq-parkir/laporan", icon: BarChart3 },
    ],
  },
  {
    title: "Laporan Umum",
    url: "/laporan-umum",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const isGroupActive = (items: any[]) => items.some(item => isActive(item.url));

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold">
            {!collapsed && "Sistem Keuangan Pesantren"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible 
                      defaultOpen={isGroupActive(item.items)}
                      className="group/collapsible"
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full">
                          <item.icon className="h-4 w-4" />
                          {!collapsed && <span>{item.title}</span>}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <NavLink
                                  to={subItem.url}
                                  className={({ isActive }) =>
                                    isActive
                                      ? "bg-primary/10 text-primary font-medium"
                                      : "hover:bg-muted/50"
                                  }
                                >
                                  <subItem.icon className="h-4 w-4" />
                                  {!collapsed && <span>{subItem.title}</span>}
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url!}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-muted/50"
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}