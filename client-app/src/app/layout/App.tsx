import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';

import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


import LoadingComponents from './LoadingComponents';
import { UseStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
function App() {

  const {activityStore} = UseStore();


  useEffect(() =>{
     activityStore.loadActivities();
      }, [activityStore])


if (activityStore.loadingInitial) return <LoadingComponents content={"Loading app..."}/>


  return (
    <>
     <NavBar />
      <Container style={{marginTop : '7em'}}>
      <ActivityDashboard
      />
      </Container>
    </>
  );
}

export default observer(App);
