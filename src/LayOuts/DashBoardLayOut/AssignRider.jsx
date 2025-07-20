import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Contexts/UseAxiosSecure';
import { FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router';

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const res = await axiosSecure.get('/parcels');
        const filtered = res.data.filter(parcel =>
          parcel.payment_status === 'Paid' && parcel.status === 'Pending'
        );
        setParcels(filtered);
      } catch (error) {
        console.error('Error fetching parcels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParcels();
  }, [axiosSecure]);

  if (loading) return <div className="text-center mt-10"><span className='loading loading-bars loading-xl'></span></div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Assign Rider</h2>
      {parcels.length === 0 ? (
        <p>No pending paid parcels available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th>Tracking ID</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Region</th>
                <th>Weight (kg)</th>
                <th>Cost ($)</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map(parcel => (
                <tr key={parcel._id}>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.senderName}</td>
                  <td>{parcel.receiverName}</td>
                  <td>{parcel.receiverRegion}</td>
                  <td>{parcel.weight}</td>
                  <td>{parcel.cost}</td>
                  <td>
                    <span className="badge badge-warning">{parcel.status}</span>
                  </td>
                  <td>
                    <Link
                      to={`/dashboard/assign-rider/${parcel._id}`}
                      className="btn btn-sm btn-success flex items-center gap-2"
                    >
                      <FaUserPlus /> Assign
                    </Link>
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

export default AssignRider;
