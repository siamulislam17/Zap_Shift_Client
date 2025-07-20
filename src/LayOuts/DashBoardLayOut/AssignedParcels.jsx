import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../Contexts/UseAxiosSecure';

const AssignedParcels = () => {
  const axiosSecure = UseAxiosSecure();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedParcels = async () => {
      try {
        const res = await axiosSecure.get('/parcels');
        const assignedParcels = res.data.filter(parcel => parcel.status === 'Assigned');
        setParcels(assignedParcels);
      } catch (error) {
        console.error('Failed to fetch assigned parcels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedParcels();
  }, [axiosSecure]);

  if (loading) {
    return <div className="text-center mt-10"><span className="loading loading-bars loading-lg"></span></div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Assigned Parcels
      </h2>

      {parcels.length === 0 ? (
        <p className="text-gray-500">No assigned parcels found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead className="bg-base-200 dark:bg-gray-700">
              <tr>
                <th>Tracking ID</th>
                <th>User Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
              {parcels.map(parcel => (
                <tr key={parcel._id}>
                  <td>{parcel.tracking_id || 'N/A'}</td>
                  <td>{parcel.name || 'Unknown'}</td>
                  <td>
                    <span className="badge badge-success text-white">{parcel.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignedParcels;
