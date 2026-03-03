"use client";

import { CompanyProfile } from "@/company";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyProfile } from "../../../api";

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
        <div>
          <h1>{company.companyName} ({company.symbol})</h1>
          <p>{company.description}</p>
          <p>Price: ${company.price}</p>
        </div>
      ) : (
        <p>Company not found</p>
      )}  
      Company: {ticker?.toUpperCase()}
    </div>
  )
};

export default CompanyPage;
