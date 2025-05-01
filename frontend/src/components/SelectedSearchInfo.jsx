import React from 'react';

const SelectedSearchInfo = ({ label, searchInfo }) => {
    if (!searchInfo) {
        return (
            <div className="text-center text-white">
                No search information available.
            </div>
        );
    }
    const renderContent = () => {
        if (Array.isArray(searchInfo)) {
            const joined = searchInfo.join(", ");
            if (searchInfo.length === 0) {
                return "none";
            }
            return joined.length > 14 ? `${joined.slice(0, 13)}...` : joined;

        }

        return searchInfo || "N/A";
    };

    return (
        <div className="mt-4 w-full">
            <div className="text-myTextPrimary align-left text-sm text-left mb-1">{label}</div>
            <div className="p-2 bg-my-button-color rounded-lg shadow-lg max-h-60 overflow-auto text-white text-sm">
                {renderContent()}
            </div>
        </div>
    );
};

export default SelectedSearchInfo;
