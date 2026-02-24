"use client"

import { FC, JSX, useState } from 'react'
import type { ChangeEvent, MouseEvent } from 'react'

type Props = {}

const Search: FC<Props> = (): JSX.Element => {
    const [search, setSearch] = useState<string>('')
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
        console.log(search)
    }
    const onClick = (_event: MouseEvent<HTMLButtonElement>) => {
        console.log("Search button clicked")
    }
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
