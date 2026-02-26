"use client"

import { FC, JSX } from 'react'
import type { ChangeEvent, MouseEvent } from 'react'

type Props = {
    search: string
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const Search: FC<Props> = ({ search, handleChange, onClick }): JSX.Element => {
    return (
        <div className='search'>
            <input
                type="text"
                placeholder="Search for a company..."
                value={search}
                onChange={handleChange}
            />
            <button onClick={onClick}>Search</button>
        </div>
    )
}

export default Search
