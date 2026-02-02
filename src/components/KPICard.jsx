import React from 'react';

const KPICard = ({ label, value }) => {
    return (
        <div className="bg-slate-800/50 p-4 rounded-lg border border-purple-500/20">
            <div className="text-sm text-gray-400 mb-1">{label}</div>
            <div className="text-2xl font-bold text-purple-400">{value}</div>
        </div>
    );
};

export default KPICard;