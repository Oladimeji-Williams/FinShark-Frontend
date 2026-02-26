"use client";

import { JSX, useCallback, useEffect, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import CardList from "@/Components/CardList/CardList";
import Search from "@/Components/Search/Search";
import { searchCompanies } from "../../api";
import type { CompanySearch } from "@/company";

const HomeClient = (): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const [companies, setCompanies] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const runSearch = useCallback(async (query: string) => {
    const result = await searchCompanies(query);
    console.log("searchCompanies result:", result);
    if (typeof result === "string") {
      setServerError(result);
      setCompanies([]);
    } else {
      setServerError("");
      setCompanies(result);
    }
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onSearchSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = search.trim();
    if (!query) {
      setServerError("");
      setCompanies([]);
      return;
    }
    await runSearch(query);
  };

  const onPortfolio = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const symbol = formData.get("symbol") as string;
    console.log("Creating portfolio for symbol:", symbol);
  }

  useEffect(() => {
    console.log("Updated companies state:", companies);
  }, [companies]);

  useEffect(() => {
    const query = search.trim();
    if (!query) {
      setServerError("");
      setCompanies([]);
      return;
    }

    const debounce = setTimeout(() => {
      void runSearch(query);
    }, 300);

    return () => clearTimeout(debounce);
  }, [search, runSearch]);

  return (
    <>
      <Search search={search} handleSearchChange={handleSearchChange} onSearchSubmit={onSearchSubmit} />
      {serverError && <div className="error">{serverError}</div>}
      <CardList companies={companies} onPortfolioCreate={onPortfolio} />
    </>
  );
};

export default HomeClient;
