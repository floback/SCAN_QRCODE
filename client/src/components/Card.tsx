// components/InfoCard.tsx
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  bgColor?: string; 
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon: Icon, bgColor = "bg-blue-500" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.90 }}
      className={`${bgColor} p-2 rounded-3xl shadow-lg text-white text-center flex flex-col items-center justify-center transition-all`}
    >
      <Icon className="w-5 h-5 mb-1 opacity-80" />
      <p className="font-semibold text-sm md:text-base uppercase tracking-wide">{title}</p>
      <p className="text-2xl md:text-2xl font-bold mt-1">{value}</p>
    </motion.div>
  );
};

export default InfoCard;
