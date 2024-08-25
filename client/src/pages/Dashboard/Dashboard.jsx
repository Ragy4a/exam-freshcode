import React from 'react';
import { useSelector } from 'react-redux';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';

const Dashboard = () => {
  const { role } = useSelector(state => state.userStore.data);
  
  return role === CONSTANTS.CUSTOMER ? (
    <CustomerDashboard />
  ) : (
    <CreatorDashboard />
  );
};

export default Dashboard;