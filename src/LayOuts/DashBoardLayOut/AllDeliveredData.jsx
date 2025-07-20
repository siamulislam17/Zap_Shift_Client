import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../Contexts/UseAxiosSecure';
import { FaTruck, FaCheckCircle } from 'react-icons/fa';

const AdminDeliveredParcels = () => {
  const axiosSecure = UseAxiosSecure();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveredParcels = async () => {
      try {
        const res = await axiosSecure.get('/parcels');
        const deliveredParcels = res.data.filter(
          parcel => parcel.assignedRider?.delivary_status === 'Delivered'
        );
        setParcels(deliveredParcels);
      } catch (err) {
        console.error('Failed to load delivered parcels:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveredParcels();
  }, [axiosSecure]);

  if (loading) {
    return <div className="text-center mt-10"><span className="loading loading-bars loading-lg"></span></div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-green-600 mb-6 flex items-center gap-2">
        <FaCheckCircle className="text-green-500" /> All Delivered Parcels (Admin View)
      </h2>

      {parcels.length === 0 ? (
        <p className="text-gray-500">No delivered parcels found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Tracking ID</th>
                <th>User Name</th>
                <th>Rider Name</th>
                <th>Status</th>
                <th>Delivered On</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map(parcel => (
                <tr key={parcel._id}>
                  <td>{parcel.tracking_id || 'N/A'}</td>
                  <td>{parcel.name || 'N/A'}</td>
                  <td>{parcel.assignedRider?.riderName || 'N/A'}</td>
                  <td>
                    <span className="badge badge-success">
                      {parcel.assignedRider?.delivary_status}
                    </span>
                  </td>
                  <td>
                    {parcel.assignedRider?.deliveredAt
                      ? new Date(parcel.assignedRider.deliveredAt).toLocaleString()
                      : 'N/A'}
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

export default AdminDeliveredParcels;
