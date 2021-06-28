import React from "react";
import { Container,Segment , Header , Image, Button } from "semantic-ui-react";
import {Link} from "react-router-dom";


export default function HomePage(){

    return(
 <Segment inverted textAlign="center" vertical className="masthead">
     <Container text>
         <Header as="h1" inverted>
             <Image size="massive" src="/assets/logo.png" alt="logo" style={{marginBottom: 12}} />
             Kind Cause
         </Header>
         <Header as='h2' inverted content='- Welcome to Kind Cause -'/>
         <Button as={Link} to='/activities' size="huge" inverted>
             Go To Timeline
             </Button> 
     </Container>

 </Segment>


    )
}