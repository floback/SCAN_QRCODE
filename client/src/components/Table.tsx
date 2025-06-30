// // components/Table.tsx

// import Image from "next/image";

// interface QRCodeItem {
//   codeName: string;
//   link: string;
//   imageUrl: string;
//   createdAt: string;
// }

// interface TableProps {
//   data: QRCodeItem[];
// }

// export const Table = ({ data }: TableProps) => {
//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text);
//     alert("Link copiado para a área de transferência!");
//   };

//   return (
//     <div className="overflow-x-auto bg-white shadow rounded-xl p-4">
//       <table className="min-w-full text-sm text-left text-gray-600">
//         <thead className="bg-gray-100 text-xs uppercase text-gray-500">
//           <tr>
//             <th scope="col" className="px-4 py-3">Nome</th>
//             <th scope="col" className="px-4 py-3">Link</th>
//             <th scope="col" className="px-4 py-3">QR Code</th>
//             <th scope="col" className="px-4 py-3">Criado em</th>
//             <th scope="col" className="px-4 py-3">Ações</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.length === 0 ? (
//             <tr>
//               <td colSpan={5} className="text-center py-4 text-gray-400">
//                 Nenhum QR Code gerado ainda.
//               </td>
//             </tr>
//           ) : (
//             data.map((item, index) => (
//               <tr key={index} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-2">{item.codeName}</td>
//                 <td className="px-4 py-2 break-all text-blue-600 underline">
//                   <a href={item.link} target="_blank" rel="noopener noreferrer">
//                     {item.link}
//                   </a>
//                 </td>
//                 <td className="px-4 py-2">
//                   <Image src={item.imageUrl} alt="QR Code" width={60} height={60} />
//                 </td>
//                 <td className="px-4 py-2">
//                   {new Date(item.createdAt).toLocaleDateString("pt-BR", {
//                     day: "2-digit",
//                     month: "2-digit",
//                     year: "numeric",
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </td>
//                 <td className="px-4 py-2">
//                   <button
//                     className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
//                     onClick={() => copyToClipboard(item.link)}
//                   >
//                     Copiar link
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };
