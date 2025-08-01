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
import { useState } from "react";
import Image from "next/image";
import { useAuthContext } from "@/app/auth/context";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(isOpen);
  const { user } = useAuthContext();

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setSidebarOpen(newState);
    if (onClose) onClose();
  };

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <Home size={18} /> },
    { label: "Usuários", href: "/user", icon: <Users size={18} /> },
    { label: "QR Code", href: "/qrcode", icon: <QrCode size={18} /> },
  ];

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full z-40 bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out
        ${isSidebarOpen ? "w-56 px-4 py-6" : "w-16 p-2"}
        md:rounded-r-2xl`}
      >
        <div className="flex flex-col h-full justify-between">
          {/* TOPO: Logo + Toggle */}
          <div>
            <div className="flex justify-center items-center mb-4 relative">
              <Image
                src="/logo.png"
                alt="Logo"
                width={isSidebarOpen ? 100 : 40}
                height={40}
              />
              <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-0 transform translate-x-full bg-white border border-gray-300 shadow rounded-full p-1 hover:bg-gray-100 transition-all"
              >
                {isSidebarOpen ? <MenuSquare size={18} /> : <MenuIcon size={18} />}
              </button>
            </div>

            {/* Usuário */}
            {user && (
              <div className="flex items-center gap-3 px-2 py-2 mb-5 rounded-xl bg-cyan-50 border border-cyan-100 shadow-sm">
                {user.avatar ? (
                 <Image
                  src={`http://localhost:3001/${user.avatar}`}
                  alt="Foto"
                  width={36}
                  height={36}
                />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                {isSidebarOpen && (
                  <div className="flex flex-col text-sm leading-tight">
                    <span className="font-medium text-gray-700 capitalize">
                      {user.name}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {user.type_user}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Navegação */}
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group
                    ${
                      pathname === item.href
                        ? "bg-cyan-100 text-cyan-800 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-cyan-800"
                    }`}
                >
                  {item.icon}
                  {isSidebarOpen && (
                    <span className="whitespace-nowrap">{item.label}</span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Rodapé: Sair */}
          <div className="mt-4 border-t border-gray-200 pt-4">
            <Link
              href="/auth"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-100 transition"
            >
              <LogOut size={18} />
              {isSidebarOpen && <span>Sair</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
