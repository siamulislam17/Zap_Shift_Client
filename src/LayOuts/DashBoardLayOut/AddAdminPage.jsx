import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Contexts/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdminPage = () => {
  const axiosSecure = useAxiosSecure();
  const [email, setEmail] = useState('');

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  const handleSearch = async () => {
    if (!email) return Swal.fire('Error', 'Please enter an email', 'error');

    try {
      const res = await axiosSecure.get(`/users/search?email=${email}`);
      Swal.fire('Found', `${res.data.name} found`, 'success');
    } catch (err) {
      Swal.fire('Not Found', err.response?.data?.error || 'User not found', 'error');
    }
  };

  const handleRoleChange = async (email, makeAdmin) => {
    try {
      await axiosSecure.patch('/users/admin', { email, makeAdmin });
      Swal.fire('Success', `User role updated to ${makeAdmin ? 'admin' : 'user'}`, 'success');
      refetch();
    } catch (err) {
      Swal.fire('Error', 'Failed to update user role', 'error');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Management</h2>

      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search by email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full"
        />
        <button onClick={handleSearch} className="btn btn-primary">Search</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="5" className="text-center">Loading...</td></tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.role !== 'admin' ? (
                      <button onClick={() => handleRoleChange(user.email, true)} className="btn btn-sm btn-success">Make Admin</button>
                    ) : (
                      <button onClick={() => handleRoleChange(user.email, false)} className="btn btn-sm btn-warning">Remove Admin</button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
