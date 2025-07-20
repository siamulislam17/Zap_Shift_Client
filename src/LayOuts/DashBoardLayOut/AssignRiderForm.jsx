import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../Contexts/UseAxiosSecure';
import Swal from 'sweetalert2';
import { FaUserCheck } from 'react-icons/fa';

const AssignRiderToParcel = () => {
  const { id: parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [parcel, setParcel] = useState(null);
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch parcel info
  useEffect(() => {
    const fetchParcel = async () => {
      try {
        const res = await axiosSecure.get(`/parcels/${parcelId}`);
        setParcel(res.data);
      } catch (err) {
        console.error("Failed to fetch parcel:", err);
      }
    };
    fetchParcel();
  }, [parcelId, axiosSecure]);

  // Fetch approved riders
  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const res = await axiosSecure.get('/riders/approved');
        setRiders(res.data);
      } catch (err) {
        console.error('Failed to fetch riders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRiders();
  }, [axiosSecure]);

  const handleAssign = async (riderEmail) => {
    try {
      await axiosSecure.patch(`/parcels/${parcelId}/assign-rider`, { riderEmail });
      Swal.fire('Success', 'Rider assigned successfully!', 'success');
      navigate('/dashboard/assign-rider');
    } catch (err) {
      console.error('Assign failed:', err);
      Swal.fire('Error', 'Assignment failed!', 'error');
    }
  };

  if (loading || !parcel) {
    return (
      <div className="text-center mt-10">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Assign Rider for Parcel: <span className="text-green-600">{parcel.tracking_id}</span>
      </h2>

      {/* ✅ Responsive Table Wrapper */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="table w-full">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
            <tr>
              <th className="whitespace-nowrap">Name</th>
              <th className="whitespace-nowrap">Email</th>
              <th className="whitespace-nowrap">Region</th>
              <th className="whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 text-gray-700 dark:text-white">
            {riders.map((rider) => (
              <tr key={rider._id} className="border-b dark:border-gray-600">
                <td className="whitespace-nowrap">{rider.name}</td>
                <td className="whitespace-nowrap">{rider.email}</td>
                <td className="whitespace-nowrap">{rider.region || 'N/A'}</td>
                <td className="whitespace-nowrap">
                  <button
                    onClick={() => handleAssign(rider.email)}
                    className="btn btn-sm btn-success flex items-center gap-2 dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    <FaUserCheck /> Assign
                  </button>
                </td>
              </tr>
            ))}
            {riders.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  No approved riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignRiderToParcel;
