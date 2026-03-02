import React from 'react';
import UserOverview from './user/overview/UserOverview';
import AdminOverview from './Admin/Overview/AdminOverview';
import Loading from '../Loading/Loading';
import { useOutletContext } from 'react-router';


const DashboardHome = () => {
  
const { role } = useOutletContext();



  if (!role) return null;

  return (
    <div>
      {
        role === "Admin" ?  <AdminOverview></AdminOverview> : <UserOverview></UserOverview>
      }
     
    </div>
  );
};

export default DashboardHome; 