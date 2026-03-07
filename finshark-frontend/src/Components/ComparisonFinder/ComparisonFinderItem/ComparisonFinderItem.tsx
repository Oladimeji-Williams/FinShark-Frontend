import { Link } from 'react-router-dom'

type Props = {
    ticker: string
}

const ComparisonFinderItem = (props: Props) => {
  return (
    <Link to={`/company/${props.ticker}/company-profile`} className='inline-flex items-center p-4 rounded-l-lg shadow-sm m-4' reloadDocument type='button'>
      {props.ticker}
    </Link>
  )
}

export default ComparisonFinderItem