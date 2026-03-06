import { useCallback, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CompanyIncomeStatement } from "@/company";
import { getIncomeStatement } from "../../../api";
import { testIncomeStatementData } from "../Table/testData";
import { useProgressiveData } from "../../../hooks/useProgressiveData";
import TableSkeleton from "../TableSkeleton/TableSkeleton";
import { List, type RowComponentProps } from "react-window";

type TableColumn = {
  label: string;
  render: (company: CompanyIncomeStatement) => string;
};

const tableConfig: TableColumn[] = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: "Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.revenue),
  },
  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.costOfRevenue),
  },
  {
    label: "Depreciation",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.depreciationAndAmortization),
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.operatingIncome),
  },
  {
    label: "Income Before Taxes",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.incomeBeforeTax),
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.netIncome),
  },
  {
    label: "Net Income Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.netIncomeRatio),
  },
  {
    label: "Earnings Per Share",
    render: (company: CompanyIncomeStatement) => formatRatio(company.eps),
  },
  {
    label: "Earnings Per Diluted",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.epsdiluted),
  },
  {
    label: "Gross Profit Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.grossProfitRatio),
  },
  {
    label: "Opearting Income Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.operatingIncomeRatio),
  },
  {
    label: "Income Before Taxes Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.incomeBeforeTaxRatio),
  },
];

type IncomeRowData = {
  rows: CompanyIncomeStatement[];
  tableConfig: TableColumn[];
  gridTemplateColumns: string;
};

const IncomeStatementRow = ({
  index,
  style,
  rows,
  tableConfig,
  gridTemplateColumns,
}: RowComponentProps<IncomeRowData>) => {
  const company = rows[index];

  return (
    <div
      style={{ ...style, display: "grid", gridTemplateColumns }}
      className="border-b border-gray-200"
    >
      {tableConfig.map((column) => (
        <div
          key={column.label}
          className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900"
        >
          {column.render(company)}
        </div>
      ))}
    </div>
  );
};

const IncomeStatement = () => {
  const ticker = useOutletContext<string>();
  const [serverError, setServerError] = useState<string>("");
  const [fallbackNotice, setFallbackNotice] = useState<string>("");

  const incomeStatementLoader = useCallback(async () => {
    const result = await getIncomeStatement(ticker);

    if (typeof result === "string") {
      setServerError("");
      setFallbackNotice("Showing fallback data because live income statement data is unavailable.");
      return testIncomeStatementData as CompanyIncomeStatement[];
    }

    setServerError("");
    setFallbackNotice("");
    return Array.isArray(result) ? result : [result];
  }, [ticker]);

  const {
    data: incomeStatement,
    loading,
    error: progressiveError,
    total,
  } = useProgressiveData<CompanyIncomeStatement>({
    loader: incomeStatementLoader,
    chunkSize: 3,
    chunkDelayMs: 80,
    enabled: Boolean(ticker),
  });

  const columnWidth = 180;
  const tableWidth = tableConfig.length * columnWidth;
  const gridTemplateColumns = `repeat(${tableConfig.length}, ${columnWidth}px)`;

  return (
    <>
      {serverError && incomeStatement.length === 0 && <p>{serverError}</p>}
      {progressiveError && incomeStatement.length === 0 && <p>{progressiveError}</p>}

      {loading && incomeStatement.length === 0 ? (
        <TableSkeleton />
      ) : incomeStatement.length > 0 ? (
        <div className="bg-white shadow overflow-hidden rounded-lg p-4 sm:p-6 xl:p-8">
          {fallbackNotice && (
            <p className="mb-3 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
              {fallbackNotice}
            </p>
          )}
          {loading && total > 0 && (
            <p className="mb-3 text-sm text-gray-500">
              Streaming rows: {incomeStatement.length}/{total}
            </p>
          )}
          <div className="overflow-x-auto">
            <div style={{ width: tableWidth }}>
              <div
                style={{ display: "grid", gridTemplateColumns }}
                className="border-b border-gray-200"
              >
                {tableConfig.map((column) => (
                  <div
                    key={column.label}
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.label}
                  </div>
                ))}
              </div>

              <List
                rowComponent={IncomeStatementRow}
                rowCount={incomeStatement.length}
                rowHeight={40}
                rowProps={{ rows: incomeStatement, tableConfig, gridTemplateColumns }}
                defaultHeight={360}
                overscanCount={8}
                style={{
                  height: Math.min(480, Math.max(200, incomeStatement.length * 40)),
                  width: tableWidth,
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>No income statement data available.</p>
      )}
    </>
  );
};

export default IncomeStatement;
function formatLargeMonetaryNumber(revenue: number) {
    if (revenue >= 1_000_000_000_000) return `${(revenue / 1_000_000_000_000).toFixed(2)}T`;
    if (revenue >= 1_000_000_000) return `${(revenue / 1_000_000_000).toFixed(2)}B`;
    if (revenue >= 1_000_000) return `${(revenue / 1_000_000).toFixed(2)}M`;
    return revenue.toLocaleString();
}

function formatRatio(netIncomeRatio: number) {
    return Number.isFinite(netIncomeRatio) ? netIncomeRatio.toFixed(2) : "N/A";
}
