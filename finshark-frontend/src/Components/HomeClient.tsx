"use client";

import { JSX, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import CardList from "@/Components/CardList/CardList";
import Search from "@/Components/Search/Search";
import { searchCompanies } from "../../api";
import type { CompanySearch } from "@/company";

const HomeClient = (): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const [companies, setCompanies] = useState<CompanySearch[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onClick = async (_event: MouseEvent<HTMLButtonElement>) => {
    const query = search.trim() || "AAPL";
    const result = await searchCompanies(query);
    console.log("searchCompanies result:", result);

    if (Array.isArray(result)) {
      setCompanies(result);
    } else {
      setCompanies([]);
    }
  };

  return (
    <>
      <Search search={search} handleChange={handleChange} onClick={onClick} />
      <CardList companies={companies} />
    </>
  );
};

export default HomeClient;
