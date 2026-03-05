import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CompanyCashflow } from "@/company";
import Table from "../Table/Table";
import { getCashflowStatement } from "../../../api";

type Props = {};

const config = [
  {
    label: "Date",
    render: (company: CompanyCashflow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashflow) =>
      formatLargeMonetaryNumber(company.operatingCashFlow),
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashflow) =>
      formatLargeMonetaryNumber(company.netCashUsedForInvestingActivites),
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashflow) =>
      formatLargeMonetaryNumber(
        company.netCashUsedProvidedByFinancingActivities
      ),
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashflow) =>
      formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
  },
  {
    label: "CapEX",
    render: (company: CompanyCashflow) =>
      formatLargeMonetaryNumber(company.capitalExpenditure),
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashflow) =>
      formatLargeMonetaryNumber(company.commonStockIssued),
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashflow) =>
      formatLargeMonetaryNumber(company.freeCashFlow),
  },
];

const CashflowStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [cashflowStatement, setCashflowStatement] = useState<CompanyCashflow[]>([]);
  const [serverError, setServerError] = useState<string>("");

  useEffect(() => {
    const fetchCashflow = async () => {
      const result = await getCashflowStatement(ticker);
      if (typeof result === "string") {
        setServerError(result);
        setCashflowStatement([]);
        return;
      }
      setServerError("");
      setCashflowStatement(Array.isArray(result) ? result : [result]);
    };
    void fetchCashflow();
  }, [ticker]);

  if (serverError) return <p>{serverError}</p>;
  if (cashflowStatement.length === 0) return <p>Loading cashflow statement data...</p>;

  return <Table config={config} data={cashflowStatement} />;
};

export default CashflowStatement;
function formatLargeMonetaryNumber(operatingCashFlow: number) {
    if (!Number.isFinite(operatingCashFlow)) return "N/A";
    if (operatingCashFlow >= 1_000_000_000_000) return `${(operatingCashFlow / 1_000_000_000_000).toFixed(2)}T`;
    if (operatingCashFlow >= 1_000_000_000) return `${(operatingCashFlow / 1_000_000_000).toFixed(2)}B`;
    if (operatingCashFlow >= 1_000_000) return `${(operatingCashFlow / 1_000_000).toFixed(2)}M`;
    return operatingCashFlow.toLocaleString();
}
