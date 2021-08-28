import React ,{ useState } from  'react';
import {Grid,Header,Tab,Button } from 'semantic-ui-react';

import { UseStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import ProfileEdit from './ProfileEdit';


export default observer(function ProfileAbout() {
    const{profileStore} = UseStore();
    const {isCurrentUser , profile} =profileStore;
    const[editMode , setEditMode] =useState(false);

    return(

        <Tab.Pane>
            <Grid>
                <Grid.Column width='16'>
                    <Header floated='left' icon='user' content={`About ${profile?.displayName}`}></Header>
                    {isCurrentUser && (
                       <Button basic floated='right'
                       content={editMode ? 'Cancel': 'Edit Profile'}
                       onClick={()=> setEditMode(!editMode)}
                       />
    )}
                </Grid.Column>
                <Grid.Column width='16'>
                   {editMode ? <ProfileEdit setEditMode= {setEditMode} /> :
                   <span style={{whiteSpace : 'pre-wrap'}}>{profile?.bio}</span>
                   }
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})