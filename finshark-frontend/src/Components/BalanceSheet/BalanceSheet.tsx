import { useCallback, useState } from "react";
import { CompanyBalanceSheet } from "@/company";
import { useOutletContext } from "react-router-dom";
import RatioList from "../RatioList/RatioList";
import { getBalanceSheet } from "../../../api";
import { testBalanceSheetData } from "../Table/testData";
import { useProgressiveData } from "../../../hooks/useProgressiveData";
import TableSkeleton from "../TableSkeleton/TableSkeleton";

type Props = {};

const tableConfig = [
  {
    label: <div className="font-bold">Total Assets</div>,
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalAssets),
  },
  {
    label: "Current Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalCurrentAssets),
  },
  {
    label: "Total Cash",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.cashAndCashEquivalents),
  },
  {
    label: "Property & equipment",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.propertyPlantEquipmentNet),
  },
  {
    label: "Intangible Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.intangibleAssets),
  },
  {
    label: "Long Term Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.longTermDebt),
  },
  {
    label: "Total Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.otherCurrentLiabilities),
  },
  {
    label: <div className="font-bold">Total Liabilites</div>,
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalLiabilities),
  },
  {
    label: "Current Liabilities",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalCurrentLiabilities),
  },
  {
    label: "Long-Term Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.longTermDebt),
  },
  {
    label: "Long-Term Income Taxes",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.otherLiabilities),
  },
  {
    label: "Stakeholder's Equity",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalStockholdersEquity),
  },
  {
    label: "Retained Earnings",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.retainedEarnings),
  },
];

const BalanceSheet = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [serverError, setServerError] = useState<string>("");
  const [fallbackNotice, setFallbackNotice] = useState<string>("");

  const balanceSheetLoader = useCallback(async () => {
    const value = await getBalanceSheet(ticker);

    if (typeof value === "string") {
      setServerError("");
      setFallbackNotice("Showing fallback data because live balance sheet data is unavailable.");
      return [testBalanceSheetData[0] as CompanyBalanceSheet];
    }

    if (value.length === 0) {
      setServerError(`No balance sheet data available for ${ticker}.`);
      setFallbackNotice("");
      return [];
    }

    setServerError("");
    setFallbackNotice("");
    return [value[0]];
  }, [ticker]);

  const {
    data: balanceSheetRows,
    loading,
    error: progressiveError,
  } = useProgressiveData<CompanyBalanceSheet>({
    loader: balanceSheetLoader,
    chunkSize: 1,
    chunkDelayMs: 0,
    enabled: Boolean(ticker),
  });

  const balanceSheet = balanceSheetRows[0] ?? null;

  return (
    <>
      {serverError && !balanceSheet && <p>{serverError}</p>}
      {progressiveError && !balanceSheet && <p>{progressiveError}</p>}
      {balanceSheet ? (
        <div>
          {fallbackNotice && (
            <p className="mb-3 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
              {fallbackNotice}
            </p>
          )}
          <RatioList config={tableConfig} data={balanceSheet} />
        </div>
      ) : loading ? (
        <TableSkeleton />
      ) : null}
    </>
  );
};

export default BalanceSheet;
function formatLargeMonetaryNumber(totalAssets: number) {
    if (!Number.isFinite(totalAssets)) return "N/A";
    if (totalAssets >= 1_000_000_000_000) return `${(totalAssets / 1_000_000_000_000).toFixed(2)}T`;
    if (totalAssets >= 1_000_000_000) return `${(totalAssets / 1_000_000_000).toFixed(2)}B`;
    if (totalAssets >= 1_000_000) return `${(totalAssets / 1_000_000).toFixed(2)}M`;
    return totalAssets.toLocaleString();
}
