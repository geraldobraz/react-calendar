import React from 'react';
import Calendar from '../../components/Calendar';
import { Informations } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <Informations>
        <h3>Welcome,</h3>
        <p>Jobsity Calendar </p>
      </Informations>
      <Calendar />
    </>
  );
};

export default Dashboard;
