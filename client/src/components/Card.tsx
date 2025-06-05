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
      className={`${bgColor} p-5 rounded-2xl shadow-lg text-white text-center flex flex-col items-center justify-center transition-all`}
    >
      <Icon className="w-8 h-8 mb-2 opacity-80" />
      <p className="font-semibold text-sm md:text-base uppercase tracking-wide">{title}</p>
      <p className="text-2xl md:text-3xl font-bold mt-1">{value}</p>
    </motion.div>
  );
};

export default InfoCard;
