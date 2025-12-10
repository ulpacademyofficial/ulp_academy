interface FeeItem {
  stream: string;
  fee: string;
}

interface FeeTableProps {
  fees: FeeItem[];
}

export default function FeeTable({ fees }: FeeTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse mt-4 mb-4">
        <thead>
          <tr>
            <th className="p-4 border border-gray-200 text-left bg-[#f3f4f6] font-semibold text-[#0a192f]">
              Class / Stream
            </th>
            <th className="p-4 border border-gray-200 text-left bg-[#f3f4f6] font-semibold text-[#0a192f] whitespace-nowrap">
              Fees
            </th>
          </tr>
        </thead>
        <tbody>
          {fees.map((item, index) => (
            <tr key={index}>
              <td className="p-4 border border-gray-200 break-words">
                {item.stream}
              </td>
              <td className="p-4 border border-gray-200 whitespace-nowrap">
                {item.fee}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
