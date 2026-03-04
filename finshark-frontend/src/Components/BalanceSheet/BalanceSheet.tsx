import React, { useEffect, useState } from "react";
import { CompanyBalanceSheet } from "@/company";
import { useOutletContext } from "react-router-dom";
import RatioList from "../RatioList/RatioList";
import { getBalanceSheet } from "../../../api";

type Props = {};

const config = [
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
  const [balanceSheet, setBalanceSheet] = useState<CompanyBalanceSheet | null>(null);
  const [serverError, setServerError] = useState<string>("");

  useEffect(() => {
    const getCompanyData = async () => {
      const value = await getBalanceSheet(ticker);
      if (typeof value === "string") {
        setServerError(value);
        setBalanceSheet(null);
        return;
      }
      if (value.length === 0) {
        setServerError(`No balance sheet data available for ${ticker}.`);
        setBalanceSheet(null);
        return;
      }

      setServerError("");
      setBalanceSheet(value[0]);
    };
    void getCompanyData();
  }, [ticker]);

  return (
    <>
      {serverError && <p>{serverError}</p>}
      {balanceSheet ? (
        <RatioList config={config} data={balanceSheet} />
      ) : !serverError ? (
        <p>Loading balance sheet data...</p>
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
