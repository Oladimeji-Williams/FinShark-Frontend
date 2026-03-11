import "./Spinner.css"
import ClipLoader from "react-spinners/ClipLoader"

type Props = {
    isLoading?: boolean
    size?: number
    color?: string
}

const Spinner = (props: Props) => {
    return (
        <div className="loading-spinner" role="status" aria-busy={props.isLoading ?? true}>
            <ClipLoader
                color={props.color ?? "#2563eb"}
                loading={props.isLoading ?? true}
                size={props.size ?? 48}
                aria-label="Loading Spinner"
            />
        </div>
    )
}

export default Spinner
