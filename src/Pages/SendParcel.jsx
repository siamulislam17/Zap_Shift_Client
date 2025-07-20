import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Contexts/AuthContext';
import UseAxiosSecure from '../Contexts/UseAxiosSecure';


const SendParcel = () => {

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);// Get the user from AuthContext

  //axios 
  const axiosSecure = UseAxiosSecure();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const data = useLoaderData();

  const regions = [...new Set(data.map(item => item.region))];
  const selectedSenderRegion = watch("senderRegion");
  const selectedReceiverRegion = watch("receiverRegion");
  const senderAreaOptions = data.find(item => item.region === selectedSenderRegion)?.covered_area || [];
  const receiverAreaOptions = data.find(item => item.region === selectedReceiverRegion)?.covered_area || [];
  const parcelType = watch("type");


  // Generate a unique tracking ID
  const generateTrackingId = () => {
    return 'TRK-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString().slice(-4);
    };


  const onSubmit = (formData) => {
    const type = formData.type;
    const weight = parseFloat(formData.weight || 0);
    const isOutside = formData.receiverRegion !== formData.senderRegion;
    
    let baseCost = 0;
    let extraCost = 0;
    let finalCost = 0;

    if (type === 'Document') {
      baseCost = isOutside ? 80 : 60;
      finalCost = baseCost;
    } else {
      if (weight <= 3) {
        baseCost = isOutside ? 150 : 110;
        finalCost = baseCost;
      } else {
        const extraKg = weight - 3;
        extraCost = extraKg * 40;
        baseCost = isOutside ? 150 : 110;
        finalCost = isOutside ? baseCost + extraCost + 40 : baseCost + extraCost;
      }
    }

    const costBreakdown = `
        📦 Parcel Type: ${type}
        🚚 Delivery: ${isOutside ? 'Outside City' : 'Within City'}
        💰 Base Cost: ৳${baseCost}
        ${extraCost ? `➕ Extra Weight Cost: ৳${extraCost}\n` : ''}
        ${isOutside && weight > 3 ? `➕ Outside Extra Charge: ৳40\n` : ''}
        🧾 Total Cost: ৳${finalCost}
            `;

    Swal.fire({
      title: `Cost Estimate`,
      html: `<pre style="text-align:left">${costBreakdown}</pre>`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
       navigate('/dashboard/my-parcels');
        // If the user confirms, proceed with sending the parcel data
      if (result.isConfirmed) {
        const parcelData = {
          ...formData,
          email: user?.email || "anonymous",
          creation_date: new Date().toISOString(),
          cost: finalCost,
          status: "Pending",
          payment_status: "Unpaid",
          deliveryType: isOutside ? "Outside" : "Within",
          tracking_id: generateTrackingId()
        };

        // Send the parcel data to the server
        axiosSecure.post('/parcels', parcelData)
          .then(() => {
            // console.log("Parcel data to send:", parcelData);

            Swal.fire("Confirmed!", "Your parcel has been added.", "success");
            // reset();
          
          })
          .catch(error => {
            console.error("Error sending parcel data:", error);
          });
           

        
      }
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4 sm:p-6 lg:p-8 text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Add Parcel</h2>
      <p className="mb-6">Enter your parcel details</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 space-y-4">
          <h3 className="text-xl font-semibold border-b pb-2 border-gray-200 dark:border-gray-700">Parcel Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="label">Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" value="Document" {...register("type")} defaultChecked className="radio radio-primary" />
                  Document
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" value="Non-Document" {...register("type")} className="radio radio-primary" />
                  Non-Document
                </label>
              </div>
            </div>
            <div>
              <label className="label">Title</label>
              <input {...register("title", { required: true })} type="text" className="input input-bordered w-full bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-600" />
              {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
            </div>
            {parcelType === 'Non-Document' && (
              <div>
                <label className="label">Weight (kg)</label>
                <input {...register("weight")} type="number" step="0.1" className="input input-bordered w-full bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-600" />
              </div>
            )}
          </div>
        </div>

        {/* Sender Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 space-y-4">
          <h3 className="text-xl font-semibold border-b pb-2 border-gray-200 dark:border-gray-700">Sender Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input {...register("senderName", { required: true })} placeholder="Name" className="input input-bordered w-full bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-600" />
            <input {...register("senderContact", { required: true })} placeholder="Contact" className="input input-bordered w-full bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-600" />
            <select {...register("senderRegion", { required: true })} className="select select-bordered w-full bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-600">
              <option value="">Select Region</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <select {...register("senderCenter", { required: true })} disabled={!selectedSenderRegion} className="select select-bordered w-full bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-600">
              <option value="">{selectedSenderRegion ? "Select Area" : "Select Region First"}</option>
              {senderAreaOptions.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            <input {...register("senderAddress", { required: true })} placeholder="Address" className="input input-bordered w-full sm:col-span-2 bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-600" />
            <input {...register("pickupInstruction", { required: true })} placeholder="Pickup Instruction" className="input input-bordered w-full sm:col-span-2 lg:col-span-3 bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-600" />
          </div>
        </div>

        {/* Receiver Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 space-y-4">
          <h3 className="text-xl font-semibold border-b pb-2 border-gray-200 dark:border-gray-700">Receiver Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input {...register("receiverName", { required: true })} placeholder="Name" className="input input-bordered w-full bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-600" />
            <input {...register("receiverContact", { required: true })} placeholder="Contact" className="input input-bordered w-full bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-600" />
            <select {...register("receiverRegion", { required: true })} className="select select-bordered w-full bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-600">
              <option value="">Select Region</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <select {...register("receiverCenter", { required: true })} disabled={!selectedReceiverRegion} className="select select-bordered w-full bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-600">
              <option value="">{selectedReceiverRegion ? "Select Area" : "Select Region First"}</option>
              {receiverAreaOptions.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            <input {...register("receiverAddress", { required: true })} placeholder="Address" className="input input-bordered w-full sm:col-span-2 bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-600" />
            <input {...register("deliveryInstruction", { required: true })} placeholder="Delivery Instruction" className="input input-bordered w-full sm:col-span-2 lg:col-span-3 bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-600" />
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-full sm:w-auto px-6 py-2">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
