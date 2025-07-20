import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Contexts/UseAxiosSecure';
import Swal from 'sweetalert2';

const ActiveRiders = () => {
  const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState(null);
  const axiosSecure = useAxiosSecure();

  const fetchApprovedRiders = async () => {
    try {
      const res = await axiosSecure.get('/riders/approved');
      setRiders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching approved riders:', err);
    }
  };

  useEffect(() => {
    fetchApprovedRiders();
  }, []);

  const openDetails = (rider) => setSelectedRider(rider);
  const closeModal = () => setSelectedRider(null);

  const fireRider = async (riderId, riderName) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to fire ${riderName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, I am sure!',
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.patch(`/riders/${riderId}/status`, { status: 'fired' });
        Swal.fire('Fired!', `${riderName} has been removed from active riders.`, 'success');
        fetchApprovedRiders();
        closeModal();
      } catch (err) {
        console.error('Error firing rider:', err);
        Swal.fire('Error', 'Failed to fire rider', 'error');
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Active Riders</h2>
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
            {riders.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">No active riders.</td>
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
                      className="btn btn-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none hover:from-cyan-600 hover:to-blue-600 shadow-md hover:shadow-lg transition duration-300 ease-in-out"

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

      {/* Modal */}
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
            <p><strong>{selectedRider.voterId ? 'Voter ID' : 'Birth Certificate'}:</strong> {selectedRider.voterId || selectedRider.birthCert}</p>

            <div className="modal-action flex justify-end gap-3">
              <button
                className="btn btn-error"
                onClick={() => fireRider(selectedRider._id, selectedRider.name)}
              >
                Fire Rider
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

export default ActiveRiders;