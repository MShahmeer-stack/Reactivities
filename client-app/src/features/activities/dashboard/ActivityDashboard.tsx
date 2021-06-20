import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../Forms/ActivityForm';
import ActivityList from './AcitivityList';

interface Props{
    activities : Activity[] ;
    selectedActivity :Activity | undefined ;
    editMode : boolean;
    selectActivity :(id : string) => void;
    cancelSelectActivity : () => void;
    formOpen : (id :string) => void;
    formClose : () => void; 
    createOrEdit : (activity :Activity) => void;
    deleteActivity :(id : string) => void;
    submitting : boolean;
}
export default function ActivityDashboard({activities, 
    selectedActivity, selectActivity , cancelSelectActivity,
     editMode,  formOpen , formClose , createOrEdit, deleteActivity, submitting} : Props){

    return(

        <Grid>
            <Grid.Column width='11'>
                <ActivityList activities = {activities} 
                selectActivity ={selectActivity}
                deleteActivity ={deleteActivity}
                submitting={submitting}
                />
            </Grid.Column>

            <Grid.Column width='5'>
                {selectedActivity && !editMode &&
                <ActivityDetails activity ={selectedActivity} 
                cancelSelectActivity={cancelSelectActivity}
                formOpen = {formOpen}
                />}
                 { editMode &&
                <ActivityForm 
                submitting={submitting}
                formClose= {formClose}
                 activity= {selectedActivity} 
                createOrEdit={createOrEdit}/>}
            </Grid.Column>

        </Grid>




    );
}