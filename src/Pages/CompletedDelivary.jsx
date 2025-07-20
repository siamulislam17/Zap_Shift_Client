import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../Contexts/UseAxiosSecure';

const CompletedDeliveries = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch Delivered Parcels
  const { data: deliveredParcels = [], isLoading } = useQuery({
    queryKey: ['completed-deliveries'],
    queryFn: async () => {
      const res = await axiosSecure.get('/parcels');
      return res.data.filter(parcel => parcel.assignedRider?.delivary_status === 'Delivered');
    }
  });

  // Cash Out Mutation
  const cashOutMutation = useMutation({
    mutationFn: async (parcelId) => {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/cashout`, {
        cashedOut: true,
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success!', 'Parcel cashed out.', 'success');
      queryClient.invalidateQueries(['completed-deliveries']);
    },
    onError: () => {
      Swal.fire('Error', 'Failed to cash out the parcel.', 'error');
    },
  });

  if (isLoading) {
    return <div className="text-center mt-10"><span className="loading loading-bars loading-lg" /></div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-green-700 mb-6 flex items-center gap-2">
        <FaCheckCircle className="text-green-600" /> Completed Deliveries
      </h2>

      {deliveredParcels.length === 0 ? (
        <p className="text-gray-500">No completed deliveries found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="table-auto w-full text-sm">
            <thead className="bg-green-50 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-3">Tracking ID</th>
                <th className="p-3">Sender</th>
                <th className="p-3">Receiver</th>
                <th className="p-3">Rider</th>
                <th className="p-3">Status</th>
                <th className="p-3">Cash Out</th>
              </tr>
            </thead>
            <tbody>
              {deliveredParcels.map(parcel => (
                <tr key={parcel._id} className="border-t light:hover:bg-gray-50">
                  <td className="p-3 font-mono">{parcel.tracking_id}</td>
                  <td className="p-3">{parcel.senderName}</td>
                  <td className="p-3">{parcel.receiverName}</td>
                  <td className="p-3">
                    <p className="font-medium">{parcel.assignedRider?.name}</p>
                    <p className="text-xs text-gray-500">{parcel.assignedRider?.email}</p>
                  </td>
                  <td className="p-3">
                    <span className="badge bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      Delivered
                    </span>
                  </td>
                  <td className="p-3">
                    {parcel.cashedOut ? (
                      <span className="text-sm text-green-600 font-medium">Cashed Out</span>
                    ) : (
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                        onClick={() => cashOutMutation.mutate(parcel._id)}
                        disabled={cashOutMutation.isLoading}
                      >
                        {cashOutMutation.isLoading ? 'Processing...' : 'Cash Out'}
                      </button>
                    )}
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

export default CompletedDeliveries;
