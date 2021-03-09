import React from 'react';
import Calendar from '../../components/Calendar';
import { Informations, Welcome } from './styles';
import calendarIcon from '../../assets/calendar.svg';

const Dashboard: React.FC = () => {
  return (
    <>
      <Informations>
        <img src={calendarIcon} alt="calendar" />
        <Welcome>
          <h3>Welcome,</h3>
          <p>React Calendar </p>
        </Welcome>
      </Informations>
      <Calendar />
    </>
  );
};

export default Dashboard;
