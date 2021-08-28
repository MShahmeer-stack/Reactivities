import {format} from "date-fns"
import { observer } from "mobx-react-lite";
import React  from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface Props{
    activity : Activity
}
export default observer(function ActivityListItem({activity} : Props){
  
    return(
       <Segment.Group>
           <Segment>
               {activity.isCancelled &&
               <Label attached='top' color='red' content="Cancelled" style={{textAlign : "center"}}></Label>
               }
               <Item.Group>
                   <Item>
                       <Item.Image style={{marginBottom: 40}} size='tiny' circular src={activity.host?.image ||'/assets/user.png'}></Item.Image>
                       <Item.Content>
                           <Item.Header as={Link} to={`/activities/${activity.id}`}>
                               {activity.title} 
                               </Item.Header>
                               <Item.Description>Created By <Link to={`/profiles/${activity.host?.userName}`}>{activity.host?.displayName}</Link></Item.Description>
                                 <Item.Description>
                                     <Label basic color='blue'>{activity.category}</Label>
                                 </Item.Description> 
                                 {activity.isHost &&(
                                     <Item.Description>
                                         <Label basic color='orange'> You Are Hosting this case </Label>
                                     </Item.Description>
                                 )}
                                 {activity.isGoing && !activity.isHost &&(
                                 <Item.Description>
                                    <Label basic color='green'>You liked this activity</Label>
                                     </Item.Description>
                                     )}
                               
                       </Item.Content>
                   </Item>
               </Item.Group>
           </Segment>
           <Segment>

               <span>
                   <Icon name='clock'/>{format(activity.date! , 'dd MMM yyyy h:mm aa')} -  <Icon name='money'/>{activity.amount}
               </span>
               
           </Segment>

           <Segment secondary>
                <ActivityListItemAttendee attendees= {activity.attendees!}/>
           </Segment>

           <Segment clearing>
               <span>{activity.description}</span>
               <Button 
               as={Link}
               to={`/activities/${activity.id}`}
               color='teal'
               floated='right'
               content='View'
               
               />
           </Segment>
       </Segment.Group>

    )
})




// <Item key={activity.id}>
// <Item.Content>
// <Item.Header as='a'> {activity.title}</Item.Header>
//  <Item.Meta>{activity.date}</Item.Meta>
//  <Item.Description>
//      <div>{activity.description}</div>
//      <div>{activity.city},{activity.venue}</div>
//  </Item.Description>

//  <Item.Extra>
//      <Button as={Link} to={`/activities/${activity.id}`} floated='right' content="View" color='blue'/>
//      <Button 
//      name={activity.id}
//      loading={loading && target === activity.id} 
//       onClick={(e) =>
//      handleActivityDelete(e, activity.id)} 
//      floated='right' 
//      content="Delete" 
//      color='red'/>
//      <Label basic content={activity.category} />
//  </Item.Extra>
// </Item.Content>
// </Item>