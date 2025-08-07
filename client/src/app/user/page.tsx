'use client';

import { useState } from "react";
import { useUserManagement } from "./hook/useUser";
import { User } from "./types/types";
import UserTable from "@/app/user/components/UserTable";
import UserHeader from "./components/UserHeader";
import UserStatsCards from "./components/UserCards";
import UserFilters from "./components/UserFilters";
import UserStatusLegend from "./components/UserStatusLegend";
import Sidebar from "@/components/SiderBarMenu";

export default function UserManagementPage() {
  const {
    users,
    editingUserId,
    deleteUser,
    handleToggleStatus,
    handleEdit,
    handleSaveEdit,
    createUser,
  } = useUserManagement();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const totalAdmins = users.filter((user) => user.type_user.toLowerCase() === "admin").length;
  const totalNormalUsers = users.filter((user) => user.type_user.toLowerCase() === "user").length;

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.status) ||
      (statusFilter === "inactive" && !user.status);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex bg-cyan-100 min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main
        className={`flex-1 transition-all duration-300 p-4 lg:p-6 ${
          isSidebarOpen ? "ml-5" : "ml-16"
        }`}
      >
        <div className="bg-white rounded-3xl p-8 shadow-lg max-w-7xl mx-auto">
          <UserHeader />

          <UserStatsCards
            totalUsers={users.length}
            totalAdmins={totalAdmins}
            totalNormalUsers={totalNormalUsers}
          />
          
          <UserFilters
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            isCreateModalOpen={isCreateModalOpen}
            setIsCreateModalOpen={setIsCreateModalOpen}
            createUser={createUser}
          />
        

          <UserTable
            users={users}
            filteredUsers={filteredUsers}
            editingUserId={editingUserId}
            editedUser={editedUser}
            setEditedUser={setEditedUser}
            handleEdit={handleEdit}
            handleSaveEdit={handleSaveEdit}
            deleteUser={deleteUser}
            handleToggleStatus={handleToggleStatus}
          />

          <UserStatusLegend />
        </div>
      </main>
    </div>
  );
}
