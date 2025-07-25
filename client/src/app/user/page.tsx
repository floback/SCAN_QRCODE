"use client";

import { useState } from "react";
import { useUserManagement } from "./hook/useUser";
import { User } from "./types/types";
import UserTable from "@/app/user/components/UserTable";
import UserHeader from "./components/UserHeader";
import UserStatsCards from "./components/UserCards";
import UserFilters from "./components/UserFilters";
import UserStatusLegend from "./components/UserStatusLegend";

enum UserType {

  admin = "admin",
  user = "user",
}

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
   <div className="min-h-screen bg-cyan-100 px-8 py-10 font-sans text-base">
  <div className="bg-white rounded-3xl p-8 shadow-lg max-w-7xl mx-auto">
    <UserHeader />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mb-8">
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
    </div>

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
</div>
  );
}