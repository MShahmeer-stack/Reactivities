import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tab } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import profileStore from '../../app/stores/profileStore';
import { UseStore } from '../../app/stores/store';
import ProfileAbout from './ProfileAbout';
import ProfileFollowings from './ProfileFollowings';
import ProfilePhotos from './profilePhotos';

interface Props{
    profile: Profile;
}

export default observer(function ProfileContent({profile} : Props){
    const {profileStore} = UseStore();
    const panes=[
        {menuItem: 'About' , render:()=> <ProfileAbout />},
            {menuItem: 'Photos' , render:()=>  <ProfilePhotos profile={profile}/>},
            {menuItem: 'Followers' , render:()=> <ProfileFollowings />},
            {menuItem: 'Following' , render:()=> <ProfileFollowings />}
    ]

    return(
        <Tab menu={{fluid: true , vertical: true}}
            menuPosition='right'
            panes={panes}
            onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
        >
            
        </Tab>
    )
})