import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Table from "../Table/Table";
import { CompanyIncomeStatement } from "@/company";
import { getIncomeStatement } from "../../../api";
import { testIncomeStatementData } from "../Table/testData";

type Props = {};

const tableConfig = [
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

const IncomeStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [incomeStatement, setIncomeStatement] = useState<CompanyIncomeStatement[]>([]);
  const [serverError, setServerError] = useState<string>("");

  useEffect(() => {
    const incomeStatementFetch = async () => {
      const result = await getIncomeStatement(ticker);
      if (typeof result === "string") {
        setServerError("");
        setIncomeStatement(testIncomeStatementData as CompanyIncomeStatement[]);
        return;
      }
      setServerError("");
      setIncomeStatement(Array.isArray(result) ? result : [result]);
    };
    void incomeStatementFetch();
  }, [ticker]);

  return (
    <>
      {serverError && <p>{serverError}</p>}
      {incomeStatement.length > 0 ? (
        <Table config={tableConfig} data={incomeStatement} />
      ) : (
        <p>Loading income statement data...</p>
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
