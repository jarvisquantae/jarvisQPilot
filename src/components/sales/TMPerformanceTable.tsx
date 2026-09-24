import { teamPerformanceRows, type TeamPerfStatus } from "@/data/sales";

function SortTriangle() {
  return (
    <span className="ml-1 inline-block text-[#3366cc]" aria-hidden="true">
      ▼
    </span>
  );
}

function statusColor(status: TeamPerfStatus): string {
  switch (status) {
    case "Strong":
      return "text-green-700 font-bold";
    case "Good":
      return "text-blue-700 font-bold";
    case "Needs Focus":
      return "text-red-600 font-bold";
    default:
      return "text-muted-foreground";
  }
}

function CellValue({ value, suffix = "%" }: { value: number | null; suffix?: string }) {
  if (value === null) return <span className="text-muted-foreground">—</span>;
  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

export function TMPerformanceTable({ showSeeDetails: _showSeeDetails = false }: { showSeeDetails?: boolean }) {
  const thClass =
    "whitespace-nowrap border-b-2 border-[#3366cc] bg-[#f0f4ff] px-2 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#1a1a2e]";
  const tdClass =
    "whitespace-nowrap border-b border-gray-200 px-2 py-2 text-[11px] text-[#1a1a2e]";

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[11px]" style={{ minWidth: 1200 }}>
        <thead>
          <tr>
            <th className={thClass}>
              TM
              <SortTriangle />
            </th>
            <th className={thClass}>
              Region
              <SortTriangle />
            </th>
            <th className={thClass}>
              Zone
              <SortTriangle />
            </th>
            <th className={thClass}>
              SM
              <SortTriangle />
            </th>
            <th className={thClass}>
              Brand / Campaign
              <SortTriangle />
            </th>
            <th className={thClass}>
              Month
              <SortTriangle />
            </th>
            <th className={thClass}>
              Input
              <SortTriangle />
            </th>
            <th className={`${thClass} text-center`}>
              Accuracy
              <SortTriangle />
            </th>
            <th className={`${thClass} text-center`}>
              Adherence
              <SortTriangle />
            </th>
            <th className={`${thClass} text-center`}>
              Attempts
              <SortTriangle />
            </th>
            <th className={`${thClass} text-center`}>
              Status Score
              <SortTriangle />
            </th>
            <th className={thClass}>
              Status
              <SortTriangle />
            </th>
          </tr>
        </thead>
        <tbody>
          {teamPerformanceRows.map((row, index) => (
            <tr
              key={row.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}
            >
              <td className={`${tdClass} font-semibold`}>{row.tm}</td>
              <td className={tdClass}>{row.region}</td>
              <td className={tdClass}>{row.zone}</td>
              <td className={tdClass}>{row.sm}</td>
              <td className={`${tdClass} max-w-[280px]`}>
                <span className="block truncate">{row.brandCampaign}</span>
              </td>
              <td className={tdClass}>{row.month}</td>
              <td className={tdClass}>{row.input}</td>
              <td className={`${tdClass} text-center`}>
                <CellValue value={row.accuracy} />
              </td>
              <td className={`${tdClass} text-center`}>
                <CellValue value={row.adherence} />
              </td>
              <td className={`${tdClass} text-center`}>
                {row.attempts !== null ? row.attempts : <span className="text-muted-foreground">—</span>}
              </td>
              <td className={`${tdClass} text-center`}>
                <CellValue value={row.statusScore} />
              </td>
              <td className={`${tdClass} ${statusColor(row.status)}`}>
                {row.status || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
