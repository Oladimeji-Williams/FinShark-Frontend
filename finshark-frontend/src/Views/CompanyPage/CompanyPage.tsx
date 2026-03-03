"use client";

import { useParams } from "react-router-dom";

const CompanyPage = () => {
  const { ticker } = useParams();
  return <div>Company: {ticker?.toUpperCase()}</div>;
};

export default CompanyPage;

