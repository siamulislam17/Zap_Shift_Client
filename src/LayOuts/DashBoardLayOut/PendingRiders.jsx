import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Contexts/UseAxiosSecure';
import Swal from 'sweetalert2';

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedRider, setSelectedRider] = useState(null);

  // 1. Fetch pending riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ['pending-riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/pending');
      return res.data;
    },
  });

  // 2. Approve or decline rider mutation
  const mutation = useMutation({
    mutationFn: async ({ id, status}) => {
      // Update rider status
      await axiosSecure.patch(`/riders/${id}/status`, { status });

      
    },
    onSuccess: (_, variables) => {
      Swal.fire({
        icon: variables.status === 'approved' ? 'success' : 'info',
        title: `Rider ${variables.status === 'approved' ? 'Approved' : 'Declined'}`,
        text: `${selectedRider.name} has been ${variables.status}.`,
      });
      queryClient.invalidateQueries(['pending-riders']);
      setSelectedRider(null);
    },
    onError: (_, variables) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Failed to ${variables.status} rider.`,
      });
    },
  });

  const openDetails = (rider) => setSelectedRider(rider);
  const closeModal = () => setSelectedRider(null);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Pending Riders</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center">Loading...</td>
              </tr>
            ) : riders.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">No pending riders.</td>
              </tr>
            ) : (
              riders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.district}</td>
                  <td>
                    <button
                      onClick={() => openDetails(rider)}
                      className="btn btn-sm btn-info"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedRider && (
        <dialog id="detailsModal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-xl mb-2">Rider Details</h3>
            <p><strong>Name:</strong> {selectedRider.name}</p>
            <p><strong>Email:</strong> {selectedRider.email}</p>
            <p><strong>Division:</strong> {selectedRider.division}</p>
            <p><strong>District:</strong> {selectedRider.district}</p>
            <p><strong>Age:</strong> {selectedRider.age}</p>
            <p><strong>Address:</strong> {selectedRider.address}</p>
            <p>
              <strong>{selectedRider.voterId ? 'Voter ID' : 'Birth Certificate'}:</strong>{' '}
              {selectedRider.voterId || selectedRider.birthCert}
            </p>

            <div className="modal-action flex justify-end gap-3">
              <button
                className={`btn btn-success ${mutation.isPending ? 'loading' : ''}`}
                onClick={() =>
                  mutation.mutate({
                    id: selectedRider._id,
                    status: 'approved',
                    email: selectedRider.email,
                  })
                }
              >
                Approve
              </button>
              <button
                className={`btn btn-error ${mutation.isPending ? 'loading' : ''}`}
                onClick={() =>
                  mutation.mutate({
                    id: selectedRider._id,
                    status: 'declined',
                    email: selectedRider.email,
                  })
                }
              >
                Decline
              </button>
              <button className="btn btn-outline" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingRiders;
