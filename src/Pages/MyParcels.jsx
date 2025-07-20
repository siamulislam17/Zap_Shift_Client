import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import UseAxiosSecure from '../Contexts/UseAxiosSecure';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyParcels = () => {
  const axiosSecure = UseAxiosSecure();// Initialize axios with secure headers
  const { user } = useContext(AuthContext);// Get user from AuthContext

    
    // Create a query client instance
   const { data: parcels = [], isLoading } = useQuery({
     queryKey: ['my-parcels', user?.email],
     queryFn: async () => {
       const res = await axiosSecure.get(`/parcels?email=${user?.email}`,{
          headers: {
            'Authorization': `Bearer ${user?.accessToken}` // Include token in headers
          }
       });
       return res.data;
     },
   });
  

   const queryClient = useQueryClient();

   const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this parcel?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/parcels/${id}`);
        if (res.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Your parcel has been deleted.',
          });

          queryClient.invalidateQueries(['my-parcels']); 
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong.',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Server error ${error.message}. Please try again later.`,
        });
      }
    }
  };

  // If loading, show a loading message
  if (isLoading) return <p className="text-center py-10"><span className="loading loading-bars  mx-auto h-screen loading-xl"></span></p>;
  // If no parcels found, show a message
  if (parcels.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-500">📭 No Parcels Found</h2>
        <p className="text-gray-400 mt-2">You haven’t sent any parcels yet.</p>
      </div>
    );
  }

  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📦 My Parcels ({parcels.length})</h1>

      <div className="overflow-x-auto">
        <table className="table w-full table-zebra text-sm">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Receiver</th>
              <th>Weight</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Tracking ID</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.title}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.weight} kg</td>
                <td>৳{parcel.cost}</td>
                <td>
                  <span className={`badge ${parcel.status === 'Pending' ? 'badge-warning' : 'badge-success'}`}>
                    {parcel.status}
                  </span>
                </td>
                <td>
                  <span className={`badge ${parcel.payment_status === 'Paid' ? 'badge-success' : 'badge-error'}`}>
                    {parcel.payment_status}
                  </span>
                </td>
                <td className="font-mono text-xs">{parcel.tracking_id}</td>
                <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>
                <td className="flex flex-col gap-1">
                 {parcel.payment_status !== 'Paid' && (
                    <Link to={`/dashboard/payment/${parcel._id}`} className="btn btn-xs btn-outline btn-success">
                      Pay
                    </Link>
                  )}
                                  
                  <Link onClick={() => handleDelete(parcel._id)} className="btn btn-xs btn-outline btn-error">Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
