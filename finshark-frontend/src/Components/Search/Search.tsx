"use client"

import { FC, JSX } from 'react'
import type { ChangeEvent, SubmitEvent } from 'react'

type Props = {
    search: string | undefined;
    handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
    onSearchSubmit: (event: SubmitEvent<HTMLFormElement>) => void
}

const Search: FC<Props> = (props: Props): JSX.Element => {
    return (
        <div className='search'>
            <form onSubmit={props.onSearchSubmit}>
                <input type="text" value={props.search} onChange={props.handleSearchChange} placeholder='Search for a company...'/>
            </form>
        </div>
    )
}

export default Search
