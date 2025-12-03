import React from 'react'

const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse space-y-4">
            {/* Title bar */}
            <div className="h-6 w-1/3 bg-gray-300 rounded"></div>

            {/* Paragraph lines */}
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
            <div className="h-4 w-4/6 bg-gray-300 rounded"></div>

            {/* Card block */}
            <div className="mt-6 flex space-x-4">
                <div className="h-20 w-20 bg-gray-300 rounded"></div>
                <div className="flex-1 space-y-3">
                    <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-5 w-2/3 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    )
}

export default LoadingSkeleton
