"use client"

import { FC, JSX } from 'react'
import type { ChangeEvent, MouseEvent } from 'react'

type Props = {
    search: string | undefined;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const Search: FC<Props> = (props: Props): JSX.Element => {
    return (
        <div className='search'>
            <input
                type="text"
                placeholder="Search for a company..."
                value={props.search}
                onChange={props.handleChange}
            />
            <button onClick={props.onClick}>Search</button>
        </div>
    )
}

export default Search
