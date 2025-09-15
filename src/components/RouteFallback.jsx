import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const RouteFallback = () => {
  const cards = Array.from({ length: 6 });
  return (
    <div className="container my-4 py-4">
      <div className="row">
        <div className="col-12 text-center mb-3">
          <Skeleton height={32} width={280} />
        </div>
        {cards.map((_, idx) => (
          <div key={idx} className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
            <div className="card h-100 p-2">
              <Skeleton height={220} className="mb-2" />
              <div className="px-2">
                <Skeleton height={20} width="80%" />
                <Skeleton height={16} width="60%" className="mt-2" />
              </div>
              <div className="p-2">
                <Skeleton height={36} width={120} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteFallback;
