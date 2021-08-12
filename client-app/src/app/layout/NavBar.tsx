import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu , Image, Dropdown } from 'semantic-ui-react';
import { UseStore } from '../stores/store';



export default observer(function NavBar(){
    const {userStore : {user, logout}}  = UseStore();
    

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
                <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right'></Image>
                    <Dropdown pointing='top left' text={user?.displayName}>

                      <Dropdown.Menu>
                      <Dropdown.Item as={Link} to={`/profile/${user?.userName}`}
                        text='My Profile' icon='user'
                        ></Dropdown.Item>
                        <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
                      </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>



            </Container>
        </Menu>



    );

})


