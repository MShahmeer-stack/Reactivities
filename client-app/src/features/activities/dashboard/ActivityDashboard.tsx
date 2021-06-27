import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { Grid } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';

import { UseStore } from '../../../app/stores/store';

import ActivityList from './AcitivityList';


export default observer(function ActivityDashboard(){


        const {activityStore} = UseStore();
        const {loadActivities,activityRegistry } = activityStore; 
        


        useEffect(() =>{
           if(activityRegistry.size <= 1) loadActivities();
            }, [activityRegistry.size, loadActivities])
      
      
      if (activityStore.loadingInitial) return <LoadingComponents content={"Loading app..."}/>
    return(

        <Grid>
            <Grid.Column width='11'>
                <ActivityList />
            </Grid.Column>

            <Grid.Column width='5'>
             <h2>Activity Filters</h2>
            </Grid.Column>

        </Grid>




    );
})