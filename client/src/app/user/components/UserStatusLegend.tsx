import { Disc, Info } from "lucide-react";

export default function UserStatusLegend() {
  return (
    <div className="mt-6 text-base text-gray-600 flex items-center gap-5">
      <div className="flex items-center gap-2">
        <Disc className="text-green-500" size={14} />
        <span>Active</span>
      </div>
      <div className="flex items-center gap-2">
        <Disc className="text-red-500" size={14} />
        <span>Inactive</span>
      </div>
      <div className="flex items-center gap-2 text-gray-400 ml-auto">
        <Info size={16} />
        <span>Status icons are clickable</span>
      </div>
    </div>
  );
}
