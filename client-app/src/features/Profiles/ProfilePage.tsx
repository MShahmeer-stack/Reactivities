import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponents from '../../app/layout/LoadingComponents';
import { UseStore } from '../../app/stores/store';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';


export default observer(function ProfilePage(){
    const {userName} = useParams<{userName : string}>();
    const{profileStore} = UseStore();
    const{loadProfile , loadingProfile, profile} = profileStore;

    useEffect( () =>{
        loadProfile(userName);
    }, [loadProfile ,userName])

    if(loadingProfile)  return <LoadingComponents content="Loading Profiles" />
    
    return(
        <Grid>
            <Grid.Column width={16}>
                {profile &&
                <>
                
                <ProfileHeader profile={profile}/>
                <ProfileContent profile={profile}/>
                </>}
            </Grid.Column>
        </Grid>
    );
})