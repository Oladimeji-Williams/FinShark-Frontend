import RatioList from '@/Components/RatioList/RatioList'
import Table from '@/Components/Table/Table'
import React from 'react'

type Props = {}

const DesignGuideView = (props: Props) => {
  return (
    <div>
        <h1>Finshark Design Guide View</h1>
        <h2>This is Finshark's design guide view. This is where we will house various design aspects of the app.</h2>
        <RatioList />
        <Table />
    </div>
  )
}

export default DesignGuideView