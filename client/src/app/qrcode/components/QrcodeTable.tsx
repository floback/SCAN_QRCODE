import { CloudDownload, Search, SquarePen, Trash } from "lucide-react";
import { QrCode } from "@/app/qrcode/types/types";

interface Props {
  dataQrcode: QrCode[];
  searchQrcode: string;
  setSearchQrcode: (value: string) => void;
  setShowEditModal: (value: boolean) => void;
  setEditData: (data: QrCode | null) => void;
  setLoadingModal: (value: boolean) => void;
  deleteQrcode: (id: string) => void;
}

export default function QrcodeTable({
  dataQrcode,
  searchQrcode,
  setSearchQrcode,
  setShowEditModal,
  setEditData,
  setLoadingModal,
  deleteQrcode,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-2 w-full flex flex-col">
      <h1 className="text-lg font-bold mb-2 text-gray-800">
        QR CODE GENERATED
      </h1>
      <div className="bg-white rounded-md shadow p-2 w-full max-w-sm mb-2 mr-auto">
        <div className="flex items-center gap-1">
          <Search className="text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchQrcode}
            onChange={(e) => setSearchQrcode(e.target.value)}
            className="w-full border-none outline-none bg-transparent text-gray-700 text-sm placeholder:text-sm px-2 py-2 text-center-1"
          />
        </div>
      </div>
      <div className="h-[96] overflow-auto flex-grow">
        <table className="min-w-full text-sm text-center text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500 sticky top-0">
            <tr>
              <th className="px-2 py-2 text-center-2">NAME</th>
              <th className="px-2 py-2 text-center-2">IMG</th>
              <th className="px-2 py-2 text-center-2">LINK</th>
              <th className="px-2 py-2 text-center-2">NUMBER FONE</th>
              <th className="px-2 py-2 text-center-2">STATUS</th>
              <th className="px-2 py-2 text-center-2">CREATE DATE</th>
              <th className="px-2 py-2 text-center-2"></th>
            </tr>
          </thead>
          <tbody>
            {dataQrcode.map((qrcode) => (
              <tr key={qrcode.id} className="border-b border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-cyan-100 transition-colors duration-200">

                <td className="px-2 py-2  text-center-1 text-xs">
                  {qrcode.name || "-"}
                </td>
                <td className="px-2 py-2  text-center-1">
                  <img
                    src={qrcode.img}
                    alt="QR Code"
                    className="h-11 w-11 object-contain"
                  />
                </td>
                <td className="px-2 py-2  text-center-1 text-blue-600 underline text-xs max-w-xs truncate">
                  <a
                    href={qrcode.link_add}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {qrcode.link_add}
                  </a>
                </td>
                <td className="px-2 py-2  text-center-1">
                  {qrcode.number_fone || "-"}
                </td>
                <td className="px-2 py-2 text-center-1">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mx-auto ${
                      qrcode.status ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></span>
                </td>
                <td className="px-2 py-2 text-center-1">
                  {qrcode.create_date
                    ? new Date(qrcode.create_date).toLocaleString()
                    : "-"}
                </td>
                <td className="px-2 py-2 text-center-1 text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      className="text-xs bg-yellow-400 text-white p-2 rounded hover:bg-yellow-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLoadingModal(true);
                        setShowEditModal(true);
                        setTimeout(() => {
                          setEditData(qrcode);
                          setLoadingModal(false);
                        }, 500);
                      }}
                    >
                      <SquarePen />
                    </button>
                    <button
                      className="text-xs bg-red-500  text-white px-2 py-2 rounded hover:bg-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          confirm(`Deseja deletar o QR Code "${qrcode.name}"?`)
                        ) {
                          deleteQrcode(qrcode.id);
                        }
                      }}
                    >
                      <Trash  />
                    </button>
                    <a
                      href={qrcode.img}
                      download={`qrcode-${qrcode.name || "download"}.png`}
                      className="text-xs text-white p-2 rounded bg-green-500 hover:bg-green-600"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <CloudDownload />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
