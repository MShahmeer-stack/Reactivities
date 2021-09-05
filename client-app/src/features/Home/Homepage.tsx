import React from "react";
import { Container,Segment , Header , Image, Button} from "semantic-ui-react";
import {Link} from "react-router-dom";
import { UseStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoginForm from "../Users/LoginForm";
import RegisterForm from "../Users/RegisterForm";


export default observer(function HomePage(){
  const {userStore , modalStore} = UseStore();
    return(
        <>
 <Segment inverted textAlign="center" vertical className="masthead">
    <Container text>
<Header as="h1" inverted>
    <Image size="massive" src="/assets/logo.png" alt="logo" style={{marginBottom: 12}} />
    Kind Cause
</Header>

        {userStore.IsLoggedIn ? (
        <>
            <Header as='h2' inverted content='- Welcome to Kind Cause -'/>
            <Button as={Link} to='/activities' size="huge" inverted>
                    Go To Timeline
            </Button> </>
        ) :(
            
<>
<Button onClick={()=>modalStore.openModal(<LoginForm />)} size="huge" inverted>
    Login
    </Button> 
    
<Button onClick={()=>modalStore.openModal(<RegisterForm />)} size="huge" inverted>
    Register
    </Button> 
</>
        )}

</Container>
 </Segment>
</>
    )
})








