import React from 'react';
import { Skeleton } from 'antd';

// SkeletonLoader component
const SkeletonLoader = () => {
    return (
        <div className="w-full">
            <Skeleton
                active
                avatar
                paragraph={{ rows: 3 }}
                title={false}
            />
        </div>
    );
};

export default SkeletonLoader;
