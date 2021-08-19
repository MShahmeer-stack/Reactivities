import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { UseStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSideBar from './ActivityDetailedSideBar';



export default observer(function ActivityDetails(){
    
  const{activityStore} = UseStore();
  const{selectedActivity : activity , loadActivity, loadingInitial} = activityStore;
 const{id} = useParams<{id :string}>();

  useEffect(() =>{
    if(id) loadActivity(id);
  },[id, loadActivity]
  )
  if(  loadingInitial || !activity ) return <LoadingComponents />;
  return(
      
    <Grid>
      <Grid.Column width={10}>
       
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity}/>
        <ActivityDetailedChat />
        

      </Grid.Column>
      
      
      <Grid.Column width={6}>
        <ActivityDetailedSideBar activity = {activity} />
      </Grid.Column>
    </Grid>
    )
})





/* <Card fluid> 
<Image src={`/assets/categoryImages/${activity.category}.jpg`} />
<Card.Content>
  <Card.Header>{activity.title}</Card.Header>
  <Card.Meta>
    <span>{activity.date}</span>
  </Card.Meta>
  <Card.Description>
    {activity.description}
  </Card.Description>
  <Card.Content extra>
      <Button.Group widths='2'>
          <Button as={Link} to={`/manage/${activity.id}`} basic color='blue' content ='Edit' />
          <Button as={Link} to={'/activities'} basic color='grey' content ='Cancel' />
      </Button.Group>
  </Card.Content>
</Card.Content>
<Card.Content extra>
</Card.Content>
</Card> */

