"use client";

import { JSX, useCallback, useEffect, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import CardList from "@/Components/CardList/CardList";
import Search from "@/Components/Search/Search";
import { searchCompanies } from "../../api";
import type { CompanySearch } from "@/company";
import PortfolioList from "./Portfolio/PortfolioList/PortfolioList";

const HomeClient = (): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const [companies, setCompanies] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);

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
    const nextValue = event.target.value;
    setSearch(nextValue);
    if (!nextValue.trim()) {
      setServerError("");
      setCompanies([]);
    }
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

  const onPortfolioCreate = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const symbol = formData.get("symbol") as string | null;
    if (!symbol) return;

    const exists = portfolioValues.some((value) => value === symbol);
    if (exists) {
      console.log("Symbol already exists in portfolio");
      return;
    }
    console.log("Creating portfolio for symbol:", symbol);
    const updatedPortfolioValues = [...portfolioValues, symbol];
    setPortfolioValues(updatedPortfolioValues);


  }
  const onPortfolioDelete = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const symbol = formData.get("symbol") as string | null;
    if (!symbol) return;
    console.log("Deleting portfolio for symbol:", symbol);
    const updatedPortfolioValues = portfolioValues.filter((value) => value !== symbol);
    setPortfolioValues(updatedPortfolioValues);
  }

  useEffect(() => {
    console.log("Updated companies state:", companies);
  }, [companies]);

  useEffect(() => {
    const query = search.trim();
    if (!query) {
      return;
    }

    const debounce = setTimeout(() => {
      void runSearch(query);
    }, 300);

    return () => clearTimeout(debounce);
  }, [search, runSearch]);


  return (
    <div>
      <PortfolioList portfolioValues={portfolioValues} onPortfolioDelete={onPortfolioDelete} />
      <Search search={search} handleSearchChange={handleSearchChange} onSearchSubmit={onSearchSubmit} />
      {serverError && <div className="error">{serverError}</div>}
      <CardList companies={companies} onPortfolioCreate={onPortfolioCreate} />
    </div>
  );
};

export default HomeClient;
