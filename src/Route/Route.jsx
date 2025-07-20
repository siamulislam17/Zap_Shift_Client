import React from 'react';

import {
  createBrowserRouter,
} from "react-router";

import Home from '../Pages/Home';
import RootLayOut from '../LayOuts/RootLayOut/RootLayOut';
import AuthLayOut from '../LayOuts/AuthLayOut/AuthLayOut';
import Login from '../AuthPages/Login';
import Register from '../AuthPages/Register';
import Coverage from '../Pages/Coverage';
import PrivateRoute from '../Contexts/PrivateRoute';
import SendParcel from '../Pages/SendParcel';
import MyParcels from '../Pages/MyParcels';
import Payment from '../LayOuts/DashBoardLayOut/Payment';
import PaymentHistory from '../LayOuts/DashBoardLayOut/PaymentHistory';
import BeARider from '../LayOuts/DashBoardLayOut/BeARider';
import PendingRiders from '../LayOuts/DashBoardLayOut/PendingRiders';
import ActiveRiders from '../LayOuts/DashBoardLayOut/ActiveRiders';
import AdminPage from '../LayOuts/DashBoardLayOut/AddAdminPage';
import AdminRoute from '../Contexts/AdminRoute';
import Forbidden from '../Pages/Forbidden';
import AssignRider from '../LayOuts/DashBoardLayOut/AssignRider';
import AssignRiderForm from '../LayOuts/DashBoardLayOut/AssignRiderForm';
import AssignRiderToParcel from '../LayOuts/DashBoardLayOut/AssignRiderForm';
import AssignedParcels from '../LayOuts/DashBoardLayOut/AssignedParcels';
import PendingDeliveries from '../LayOuts/DashBoardLayOut/PendingDelivary';
import RiderRoute from '../Contexts/RiderRoute';
import CompletedDeliveries from '../Pages/CompletedDelivary';
import AdminDeliveredParcels from '../LayOuts/DashBoardLayOut/AllDeliveredData';

import DashBoardLayOut from '../LayOuts/DashBoardLayOut/DashBoardLayOut';
import About from '../Pages/About';


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayOut></RootLayOut>,
    children:[
        {
            index: true,
            element: <Home></Home>
        },
        {
          path: '/coverage',
          element: <PrivateRoute>
            <Coverage></Coverage>
          </PrivateRoute>,
          loader: () => fetch('/public/coverageData.json')
        },
        {
          path: '/about',
          element: <About></About>
        },
        {
          path: '/send-parcel',
          element: <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>,
          loader: () => fetch('/public/coverageData.json')
          
        },
        {
          path: 'be-a-rider',
          element: <PrivateRoute>
            <BeARider />
          </PrivateRoute>
        }

    ]
  },
  {
    path: '/',
    Component: AuthLayOut,
    children: [
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      }
    ]
  },
  {
    path: '/dashboard',
    element:(<PrivateRoute>
      <DashBoardLayOut></DashBoardLayOut>
    </PrivateRoute>),
    children: [
      {
        path : 'my-parcels',
        element: <MyParcels></MyParcels>
      },
      {
        path: 'payment/:id',
        element: <Payment></Payment>
      },
      {
        path: 'payment-history',
        element:<PaymentHistory></PaymentHistory>
      },
        {
          path: 'be-a-rider',
          element: <BeARider />
        },
        {
          path: 'pending-riders',
          element:<AdminRoute>
            <PendingRiders></PendingRiders>
          </AdminRoute>
        },
        {
          path: 'active-riders',
          element:<AdminRoute>
            <ActiveRiders></ActiveRiders>
          </AdminRoute>
        },
        {
          path: 'add-admin',
          element: <AdminRoute>
            <AdminPage />
          </AdminRoute>
        },
        {
          path: 'forbidden',
          element: <Forbidden />
        },
        {
          path: 'assign-rider',
          element:<AdminRoute>
            <AssignRider></AssignRider>
          </AdminRoute>
        },
        {
          path: 'assign-rider/:id',
          element:<AdminRoute>
            <AssignRiderForm/>
          </AdminRoute>
        },
        {
          path: 'assign-parcel',
          element:<AdminRoute>
            <AssignedParcels></AssignedParcels>
          </AdminRoute>
        },
        {
          path:'pending-delivery',
          element:
           <RiderRoute>
            <PendingDeliveries></PendingDeliveries>
           </RiderRoute>
          
        },
        {
          path: 'completed-deliveries',
          element:<RiderRoute>
            <CompletedDeliveries></CompletedDeliveries>
          </RiderRoute>
        },
        {
          path: 'delivered-parcels-admin-view',
          element:<AdminRoute>
            <AdminDeliveredParcels></AdminDeliveredParcels>
          </AdminRoute>
        }
      
    ]
  }
]);


export default router;