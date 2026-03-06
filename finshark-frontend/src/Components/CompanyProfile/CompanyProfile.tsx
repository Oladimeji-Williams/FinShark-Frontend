import { CompanyKeyMetrics } from "@/company";
import { useCallback, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getKeyMetrics } from "../../../api";
import RatioList from "../RatioList/RatioList";
import { testCompanyKeyMetricsData } from "../Table/testData";
import { useProgressiveData } from "../../../hooks/useProgressiveData";
import TableSkeleton from "../TableSkeleton/TableSkeleton";

type Props = {};

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) =>
      formatLargeNonMonetaryNumber(company.marketCapTTM),
    subtitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.currentRatioTTM),
    subtitle:
      "Measures the companies ability to pay short term debt obligations",
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) => formatRatio(company.roeTTM),
    subtitle:
      "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
  {
    label: "Return On Assets",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.returnOnTangibleAssetsTTM),
    subtitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Free Cashflow Per Share",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.freeCashFlowPerShareTTM),
    subtitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Book Value Per Share TTM",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.bookValuePerShareTTM),
    subtitle:
      "Book value per share indicates a firm's net asset value (total assets - total liabilities) on per share basis",
  },
  {
    label: "Divdend Yield TTM",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.dividendYieldTTM),
    subtitle: "Shows how much a company pays each year relative to stock price",
  },
  {
    label: "Capex Per Share TTM",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.capexPerShareTTM),
    subtitle:
      "Capex is used by a company to aquire, upgrade, and maintain physical assets",
  },
  {
    label: "Graham Number",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.grahamNumberTTM),
    subtitle:
      "This is the upperbouind of the price range that a defensive investor should pay for a stock",
  },
  {
    label: "PE Ratio",
    render: (company: CompanyKeyMetrics) => formatRatio(company.peRatioTTM),
    subtitle:
      "This is the upperbouind of the price range that a defensive investor should pay for a stock",
  },
];

const CompanyProfile = (props: Props) => {
    const ticker = useOutletContext<string>();
    const [serverError, setServerError] = useState<string>("");
    const [fallbackNotice, setFallbackNotice] = useState<string>("");

    const keyMetricsLoader = useCallback(async () => {
      const data = await getKeyMetrics(ticker);

      if (typeof data === "string") {
        setServerError("");
        setFallbackNotice("Showing fallback data because live key metrics data is unavailable.");
        return [testCompanyKeyMetricsData as CompanyKeyMetrics];
      }

      if (!data) {
        setServerError(`No key metrics data available for ${ticker}.`);
        setFallbackNotice("");
        return [];
      }

      setServerError("");
      setFallbackNotice("");
      return [data];
    }, [ticker]);

    const {
      data: companyDataRows,
      loading,
      error: progressiveError,
    } = useProgressiveData<CompanyKeyMetrics>({
      loader: keyMetricsLoader,
      chunkSize: 1,
      chunkDelayMs: 0,
      enabled: Boolean(ticker),
    });

    const companyData = companyDataRows[0] ?? null;

  return (
    <>
    {serverError && !companyData && <p>{serverError}</p>}
    {progressiveError && !companyData && <p>{progressiveError}</p>}
    {companyData ? (
        <div>
            {fallbackNotice && (
              <p className="mb-3 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                {fallbackNotice}
              </p>
            )}
            <h1>{ticker}</h1>
            <RatioList data={companyData} config={tableConfig}/>
        </div>
    ) : (
        loading ? <TableSkeleton /> : <p>Loading...</p>
    )}
    </>
  );
};

export default CompanyProfile;
function formatLargeNonMonetaryNumber(marketCapTTM: number) {
    if (typeof marketCapTTM !== "number" || !Number.isFinite(marketCapTTM)) return "N/A";
    if (marketCapTTM >= 1_000_000_000_000) return `${(marketCapTTM / 1_000_000_000_000).toFixed(2)}T`;
    if (marketCapTTM >= 1_000_000_000) return `${(marketCapTTM / 1_000_000_000).toFixed(2)}B`;
    if (marketCapTTM >= 1_000_000) return `${(marketCapTTM / 1_000_000).toFixed(2)}M`;
    return marketCapTTM.toLocaleString();
}

function formatRatio(currentRatioTTM: number) {
    return Number.isFinite(currentRatioTTM) ? currentRatioTTM.toFixed(2) : "N/A";
}
