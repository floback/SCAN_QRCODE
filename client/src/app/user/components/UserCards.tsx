import InfoCard from "@/components/Card";
import { Users } from "lucide-react";

interface UserStatsCardsProps {
  totalUsers: number;
  totalAdmins: number;
  totalNormalUsers: number;
}

export default function UserStatsCards({
  totalUsers,
  totalAdmins,
  totalNormalUsers,
}: UserStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      <InfoCard title="Total de Usuários" value={totalUsers} icon={Users} bgColor="bg-indigo-600" />
      <InfoCard title="Total de Admins" value={totalAdmins} icon={Users} bgColor="bg-emerald-500" />
      <InfoCard title="Total de Users" value={totalNormalUsers} icon={Users} bgColor="bg-amber-500" />
    </div>
  );
}
