import React from 'react';

const SelectedSearchInfo = ({ searchInfo }) => {
    if (!searchInfo) {
        return (
            <div className="text-center text-white">
                No search information available.
            </div>
        );
    }

    return (
        <div className="mt-2 p-2 w-full bg-my-button-color rounded-lg shadow-lg max-h-60 overflow-auto">
            {Array.isArray(searchInfo)
                ? (() => {
                    const joined = searchInfo.join(', ');
                    const maxLength = 11; // you can adjust the number
                    return joined.length > maxLength ? `${joined.substring(0, maxLength)}...` : joined;
                })()
                : (searchInfo || 'N/A')}
        </div>
    );
};

export default SelectedSearchInfo;
