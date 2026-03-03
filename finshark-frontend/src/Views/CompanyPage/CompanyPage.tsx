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
          <Tile title={company.companyName || "Company Name"} subtitle={company.symbol || "Ticker"} />
        </CompanyDashboard>

        </div>

      ) : (
        <p>Company not found</p>
      )}  
    </div>
  )
};

export default CompanyPage;
