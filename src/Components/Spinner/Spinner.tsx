import "./Spinner.css"
import ClipLoader from "react-spinners/ClipLoader"

type Props = {
    isLoading?: boolean
    size?: number
    color?: string
}

const Spinner = (props: Props) => {
    return (
        <div
            className="loading-spinner text-[var(--color-dark-blue)] dark:text-[var(--color-light-green)]"
            role="status"
            aria-busy={props.isLoading ?? true}
        >
            <ClipLoader
                color={props.color ?? "currentColor"}
                loading={props.isLoading ?? true}
                size={props.size ?? 48}
                aria-label="Loading Spinner"
            />
        </div>
    )
}

export default Spinner
