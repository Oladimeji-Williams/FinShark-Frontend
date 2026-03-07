"use client"

import { FC, JSX } from "react"
import type { ChangeEvent, SubmitEvent } from "react"

type Props = {
    search: string | undefined
    handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
    onSearchSubmit: (event: SubmitEvent<HTMLFormElement>) => void
}

const Search: FC<Props> = (props: Props): JSX.Element => {
    return (
        <section className="relative w-full bg-gray-100">
            <div className="w-full p-6 space-y-6">
                <form
                    className="form relative flex flex-col w-full p-10 space-y-4 bg-[var(--color-dark-blue)] rounded-lg md:flex-row md:space-y-0 md:space-x-3"
                    onSubmit={props.onSearchSubmit}
                >
                    <input
                        className="flex-1 p-3 border-2 rounded-lg placeholder-black focus:outline-none"
                        id="search-input"
                        placeholder="Search for a company..."
                        value={props.search}
                        onChange={props.handleSearchChange}
                    ></input>
                </form>
            </div>
        </section>
    )
}

export default Search
