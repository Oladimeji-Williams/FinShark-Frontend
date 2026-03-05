"use client";

import { CompanyProfile } from "@/company";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyProfile } from "../../../api";
import Sidebar from "@/Components/Sidebar/Sidebar";
import CompanyDashboard from "@/Components/CompanyDashboard/CompanyDashboard";
import Tile from "@/Components/Tile/Tile";

const CompanyPage = () => {
  const { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();
  const [serverError, setServerError] = useState<string>("");

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      if (!ticker) return;
      const response = await getCompanyProfile(ticker);
      if (typeof response === "string") {
        setServerError(response);
        setCompany(undefined);
      } else {
        setServerError("");
        setCompany(response);
      }
    };
    void fetchCompanyProfile();
  }, [ticker]);
      
  return (
    <div>
      {serverError && <p>{serverError}</p>}
      {company ? (
<div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
        <Sidebar />
        <CompanyDashboard ticker={ticker!}>
          <Tile title={"Company Name"} subtitle={company.companyName || "N/A"} />
          <Tile title={"Price"} subtitle={Number.isFinite(company.price) ? company.price.toFixed(2) : "N/A"} />
          <Tile title={"Sector"} subtitle={company.sector || "N/A"} />
          <Tile
            title={"Market Cap"}
            subtitle={Number.isFinite(company.marketCap) ? company.marketCap.toLocaleString() : "N/A"}
          />
          <Tile
            title={"Last Dividend"}
            subtitle={Number.isFinite(company.lastDividend) ? company.lastDividend.toFixed(2) : "N/A"}
          />
          <p className="bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-4">{company.description}</p>
        </CompanyDashboard>

        </div>

      ) : (
        <p>Company not found</p>
      )}  
    </div>
  )
};

export default CompanyPage;
