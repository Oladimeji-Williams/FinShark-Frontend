"use client";

import { JSX, useEffect, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import CardList from "@/Components/CardList/CardList";
import Search from "@/Components/Search/Search";
import { searchCompanies } from "../../api";
import type { CompanySearch } from "@/company";

const HomeClient = (): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const [companies, setCompanies] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onClick = async (_event: MouseEvent<HTMLButtonElement>) => {
    const query = search.trim();
    const result = await searchCompanies(query);
    console.log("searchCompanies result:", result);
    if (typeof result === "string") {
      setServerError(result);
      setCompanies([]);
    } else {
      setServerError("");
      setCompanies(result);
    }
  };

  useEffect(() => {
    console.log("Updated companies state:", companies);
  }, [companies]);

  return (
    <>
      <Search search={search} handleChange={handleChange} onClick={onClick} />
      {serverError && <div className="error">{serverError}</div>}
      <CardList companies={companies} />
    </>
  );
};

export default HomeClient;
