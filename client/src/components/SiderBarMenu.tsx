// components/SiderBarMenu.tsx
"use client";

import {
  Home,
  LogOut,
  QrCode,
  Users,
  Menu as MenuIcon,
  MenuSquare,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "@/app/auth/context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SidebarProps {
  isOpen: boolean;                 // agora obrigatório
  onToggle: (open: boolean) => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuthContext();

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <Home size={18} /> },
    { label: "Usuários", href: "/user", icon: <Users size={18} /> },
    { label: "QR Code", href: "/qrcode", icon: <QrCode size={18} /> },
  ];

   const handleToggle = () => {
    // chama onToggle se existir, senão chama onClose para compatibilidade
    if (typeof onToggle === "function") {
      onToggle(!isOpen);
    } else if (typeof onclose === "function") {
      onclose();
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-sm z-40 transition-all duration-300 ease-in-out
        ${isOpen ? "w-40 px-4 py-6" : "w-16 p-2"}`}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex flex-col items-center gap-3 mb-6">
            <Image src="/logohdl.jpg" alt="Logo" width={isOpen ? 70 : 40} height={60} className="transition-all duration-300" />
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggle}
              className="w-full rounded-md border-cyan-200 bg-cyan-50 text-cyan-800 hover:bg-cyan-100 hover:text-cyan-900 shadow-sm transition-colors"
            >
              {isOpen ? <MenuSquare size={18} className="mr-2" /> : <MenuIcon size={18} className="mr-2" />}
              {isOpen && "Fechar"}
            </Button>
          </div>

          {/* Usuário */}
          {user && (
            <Card className="flex items-center gap-3 px-3 py-2 mb-5 bg-cyan-50 border border-cyan-100">
              {user.avatar ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/avatar/${user.avatar}?t=${Date.now()}`}
                  alt="Foto"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-sm">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}

              {isOpen && (
                <div className="flex flex-col text-sm leading-tight">
                  <span className="font-medium text-gray-700 capitalize">{user.name}</span>
                  <span className="text-xs text-gray-500 capitalize">{user.type_user}</span>
                </div>
              )}
            </Card>
          )}

          {/* Nav */}
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group
                  ${pathname === item.href ? "bg-cyan-100 text-cyan-800 font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-cyan-800"}`}
              >
                {item.icon}
                {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="mt-4 border-t border-gray-200 pt-4">
          <Link href="/auth" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-100 transition">
            <LogOut size={18} />
            {isOpen && <span>Sair</span>}
          </Link>
        </div>
      </div>
    </aside>
  );
}
