import React, { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaBoxOpen, FaTruck } from 'react-icons/fa';
import UseAxiosSecure from '../../Contexts/UseAxiosSecure';
import { AuthContext } from '../../Contexts/AuthContext';

const PendingDeliveries = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext); // get logged-in rider

  const { data: pendingParcels = [], isLoading } = useQuery({
    queryKey: ['pending-deliveries', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get('/parcels');
      return res.data.filter(
        parcel =>
          parcel.assignedRider?.delivary_status === 'Rider_Assigned' &&
          parcel.assignedRider?.email === user?.email
      );
    },
    enabled: !!user?.email, // only run if user is logged in
  });

  const markDelivered = useMutation({
    mutationFn: async id => {
      const res = await axiosSecure.patch(`/parcels/${id}`, {
        delivary_status: 'Delivered'
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['pending-deliveries', user?.email]);
      Swal.fire('✅ Success!', 'Parcel marked as delivered.', 'success');
    },
    onError: () => {
      Swal.fire('❌ Error!', 'Failed to update delivery status.', 'error');
    }
  });

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <span className="loading loading-bars loading-lg" />
      </div>
    );
  }

  return (
    <div className="p-6">
        <h2 className="text-3xl font-semibold text-green-600 mb-6 flex items-center gap-2">
        <FaBoxOpen className="text-green-700" /> My Pending Deliveries
        </h2>

      {pendingParcels.length === 0 ? (
        <p className="text-gray-500">No pending deliveries assigned to you.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
          <table className="table-auto w-full text-sm">
            <thead className="bg-green-50 text-left text-gray-700">
              <tr>
                <th className="p-3">Tracking ID</th>
                <th className="p-3">Sender</th>
                <th className="p-3">Receiver</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingParcels.map(parcel => (
                <tr key={parcel._id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="p-3 font-mono">{parcel.tracking_id}</td>
                  <td className="p-3">{parcel.senderName}</td>
                  <td className="p-3">{parcel.receiverName}</td>
                  <td className="p-3">
                    <span className="badge badge-warning text-yellow-800 bg-yellow-100 px-3 py-1 rounded-full text-xs">
                      {parcel.assignedRider?.delivary_status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      className="btn btn-sm bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                      onClick={() => markDelivered.mutate(parcel._id)}
                    >
                      <FaTruck /> Mark Delivered
                    </button>
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

export default PendingDeliveries;
