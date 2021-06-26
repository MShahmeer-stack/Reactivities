import { observer } from 'mobx-react-lite';

import { Grid } from 'semantic-ui-react';

import { UseStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../Forms/ActivityForm';
import ActivityList from './AcitivityList';


export default observer(function ActivityDashboard(){


        const {activityStore} = UseStore();
        const {selectedActivity, editMode} =activityStore ; 
    return(

        <Grid>
            <Grid.Column width='11'>
                <ActivityList />
            </Grid.Column>

            <Grid.Column width='5'>
                {selectedActivity && !editMode &&
                <ActivityDetails />}
               
                 { editMode &&
                <ActivityForm />}
            </Grid.Column>

        </Grid>




    );
})