import React from 'react'

interface CustomTabsProps {
    tabLabels: string[]
    tabContents: React.ReactNode[]
}

const CustomTabs: React.FC<CustomTabsProps> = ({ tabLabels, tabContents }) => {
    const [selectedTab, setSelectedTab] = React.useState(0)

    return (
        <div>
            <div className="flex border-b border-gray-200">
                {tabLabels.map((label, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 -mb-px text-sm font-medium text-center border-b-2 ${
                            selectedTab === index
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500'
                        }`}
                        onClick={() => setSelectedTab(index)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div className="mt-4">
                {tabContents.map((content, index) => (
                    <div
                        key={index}
                        className={`${
                            selectedTab === index ? 'block' : 'hidden'
                        } relative pb-[56.25%] h-0 overflow-hidden`}
                    >
                        {content}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CustomTabs
