import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';

import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
//import HomePage from '../../features/Home/Hompage';
import ActivityForm from '../../features/activities/Forms/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ContactUs from '../../features/ContactUs/ContactUs';
import TestErrors from '../../features/errors/TestErrors';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/Users/LoginForm';
import { UseStore } from '../stores/store';
import LoadingComponents from './LoadingComponents';
import ModalContainer from '../common/modals/ModalContainer';
import Homepage from '../../features/Home/Homepage';
import ProfilePage from '../../features/Profiles/ProfilePage';

function App() {

 
const location = useLocation();
const {commonStore, userStore} = UseStore();
    useEffect( ()=> {
      if(commonStore.token){
        userStore.getUser().finally(()=> commonStore.setAppLoaded());
      }
      else{
        commonStore.setAppLoaded();
      }
      
    }, [commonStore , userStore])
    
    if(!commonStore.appLoaded) return <LoadingComponents content="Loading app..."/>

return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar />
    <ModalContainer />
     <Route exact path='/' component={Homepage}/>
     <Route path= {'/(.+)'}
     
     render={()=>(
        <>
         <NavBar />
      <Container style={{marginTop : '7em'}}>
     <Switch>
     <Route exact path='/activities' component={ActivityDashboard}/>
      <Route exact path='/contactUs' component={ContactUs}/>
      <Route path='/activities/:id' component={ActivityDetails}/>
      <Route key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm}/>
      <Route path='/profiles/:userName' component={ProfilePage}/>
      <Route path='/errors' component={TestErrors}/>
      <Route path='/server-error' component={ServerError}/>
      <Route path='/login' component={LoginForm}/>
      <Route component={NotFound}/>
     </Switch>
      </Container>
        </>
     )}
      />
    
    </>
  );
}

export default observer(App);
