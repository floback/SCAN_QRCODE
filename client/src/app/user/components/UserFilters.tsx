import Input from "@/components/Input";
import Button from "@/components/Button";
import { Plus, Search } from "lucide-react";
import { ModalUser } from "@/app/user/components/modal/Modaluser";
import { User } from "../types/types"; 

interface UserFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (value: boolean) => void;
  createUser: (data: Partial<User>) => Promise<void>;
}

export default function UserFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  isCreateModalOpen,
  setIsCreateModalOpen,
  createUser,
}: UserFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-end items-center w-full">
      <div className="relative">
        <Search className="absolute left-2 top-3 h-5 w-5 text-gray-800" />
        <Input
          type="text"
          placeholder="Buscar por nome"
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select
        className="border text-base rounded px-4 py-2 shadow text-gray-800"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as any)}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <ModalUser
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={async (data) => {
          await createUser(data);
          setIsCreateModalOpen(false);
        }}
      />

      <Button
        typeStyle="secondary"
        fullWidth={false}
        onClick={() => setIsCreateModalOpen(true)}
      >
        <Plus className="mr-1" /> Add User
      </Button>
    </div>
  );
}
