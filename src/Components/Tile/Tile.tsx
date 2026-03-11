import React from "react"
import { IconType } from "react-icons"

type Props = {
    title: string
    subtitle: string
    icon?: IconType
}

const Tile = (props: Props) => {
    const Icon = props.icon
    return (
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-800 rounded-lg mb-6 xl:mb-0 shadow-lg transition-colors">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 dark:text-gray-500 uppercase font-bold text-xs transition-colors">
                                {props.title}
                            </h5>

                            <span className="font-bold text-xl text-black dark:text-gray-100 transition-colors">
                                {props.subtitle}
                            </span>
                        </div>
                        {Icon && (
                            <div className="relative w-auto pl-4 flex-initial">
                                <Icon className="text-3xl text-lightGreen dark:text-lightGreen opacity-50 dark:opacity-30" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tile
