"use client"

import { FC, JSX, useState } from 'react'

type Props = {}

const Search: FC<Props> = (props: Props): JSX.Element => {
    const [search, setSearch] = useState<string>('')
    const onClick = (event: any) => {
        setSearch(event.target.value)
        console.log(search)
    }
  return (
    <div className='search'>
        <input 
            type="text" 
            placeholder="Search for a company..." 
            value={search}
            onChange={(event) => onClick(event)}
        />
    </div>
  )
}

export default Search
