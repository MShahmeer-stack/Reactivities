import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';



export default function NavBar(){

    

    return(
        <Menu inverted fixed='top'>
            <Container>

                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="assets/logo.png" alt="logo" style={{marginRight : '10px'}}/>
                    KindCause
                </Menu.Item>
                <Menu.Item  as={NavLink} to='/activities' name='Timeline'></Menu.Item>
                <Menu.Item  as={NavLink} to='/contactUs' name='Contact Us'></Menu.Item>
                <Menu.Item  as={NavLink} to='/errors' name='Errors'></Menu.Item>
                <Menu.Item>
                    <Button positive as={NavLink} to='/createActivity' content="Create a Case" />
                </Menu.Item>



            </Container>
        </Menu>



    );

}


