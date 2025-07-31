// src/components/UserTable.tsx

import Input from "../../../components/Input";
import Button from "@/components/Button";
import { Check, Pencil, Trash, Disc } from "lucide-react";
import { User, UserType } from "../types/types";

interface UserTableProps {
  users: User[];
  filteredUsers: User[];
  editingUserId: string | null;
  editedUser: Partial<User>;
  setEditedUser: React.Dispatch<React.SetStateAction<Partial<User>>>;
  handleEdit: (id: string) => void;
  handleSaveEdit: (id: string, updatedUser: FormData) => Promise<void>;
  deleteUser: (id: string) => void;
  handleToggleStatus: (id: string, currentStatus: boolean) => User;
}

export default function UserTable({
  users,
  filteredUsers,
  editingUserId,
  editedUser,
  setEditedUser,
  handleEdit,
  handleSaveEdit,
  deleteUser,
  handleToggleStatus,
}: UserTableProps) {
  return (
    <div className="overflow-x-auto overflow-y-auto max-h-[500px] rounded-xl shadow">
      <table className="min-w-full text-lg text-center text-gray-700">
        <thead className="bg-gray-100 text-base uppercase text-gray-600">
          <tr>
            <th className="px-4 py-3">Avatar</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Password</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => {
            const isEditing = editingUserId === user.id;

            return (
              <tr key={user.id} className="odd:bg-white even:bg-gray-50 hover:bg-cyan-50 border-b">
                {isEditing ? (
                  <>
                    <td className="px-4 py-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setEditedUser({ ...editedUser, avatar: file });
                          }
                        }}
                      />
                      {user.avatar && typeof user.avatar === "string" && (
                        <img
                          src={user.avatar}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full mt-2 mx-auto"
                        />
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <Input
                        defaultValue={user.name}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, name: e.target.value })
                        }
                      />
                    </td>

                    <td className="px-4 py-3">
                      <Input
                        defaultValue={user.email}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, email: e.target.value })
                        }
                      />
                    </td>

                    <td className="px-4 py-3">
                      <Input
                        placeholder="••••••••"
                        showTogglePassword
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, password: e.target.value })
                        }
                      />
                    </td>

                    <td className="px-4 py-3">
                      <select
                        defaultValue={user.type_user}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, type_user: e.target.value as UserType })
                        }
                        className="w-full border rounded px-3 py-2 text-base"
                      >
                        {Object.values(UserType).map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4 py-3 flex justify-center gap-2">
                      <Button
                        typeStyle="primary"
                        fullWidth={false}
                        onClick={() => {
                          const formData = new FormData();
                          formData.append("name", editedUser.name ?? user.name);
                          formData.append("email", editedUser.email ?? user.email);
                          if (editedUser.password) {
                            formData.append("password", editedUser.password);
                          }
                          formData.append("type_user", editedUser.type_user ?? user.type_user);
                          formData.append("status", String(editedUser.status ?? user.status));
                          if (editedUser.avatar instanceof File) {
                            formData.append("avatar", editedUser.avatar);
                          }

                          handleSaveEdit(user.id, formData).then(() => setEditedUser({}));
                        }}
                      >
                        <Check size={20} />
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-3">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full mx-auto"
                        />
                      ) : (
                        <span className="text-gray-400 italic">Sem avatar</span>
                      )}
                    </td>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">••••••••</td>
                    <td className="px-4 py-3">{user.type_user}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleToggleStatus(user.id, user.status)}>
                        {user.status ? (
                          <Disc className="text-green-500" size={25} />
                        ) : (
                          <Disc className="text-red-500" size={20} />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3 flex justify-center gap-3">
                      <button
                        className="text-cyan-600 hover:text-cyan-800"
                        onClick={() => {
                          handleEdit(user.id);
                          setEditedUser(user);
                        }}
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => deleteUser(user.id)}
                      >
                        <Trash size={20} />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
