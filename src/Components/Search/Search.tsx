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
        <section className="relative w-full bg-gray-100 dark:bg-gray-800 transition-colors">
            <div className="w-full p-6 space-y-6">
                <form
                    className="form relative flex flex-col w-full p-10 space-y-4 bg-[var(--color-dark-blue)] dark:bg-blue-900 rounded-lg md:flex-row md:space-y-0 md:space-x-3 transition-colors"
                    onSubmit={props.onSearchSubmit}
                >
                    <input
                        className="flex-1 p-3 border-2 rounded-lg bg-white text-gray-900 placeholder-gray-400 border-gray-300 dark:placeholder-gray-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none transition-colors"
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
