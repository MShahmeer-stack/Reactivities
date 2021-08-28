import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { UseStore } from '../../app/stores/store';


export default observer (function LoginForm(){
    const {userStore} = UseStore();
    return(
        
        <Formik
        initialValues={{email:'' , password:'' ,error :null}}

        onSubmit={(values, {setErrors} )=> userStore.login(values)
        .catch(error => setErrors({error :"Invalid Email Or Password"}))}        
        >
                {({handleSubmit , isSubmitting , errors}) => (
                    <Form className="ui form" autoComplete='off' onSubmit={handleSubmit} >
                           <Header as='h2' content='Login' color='teal' textAlign='center' />
                           <hr />
                           <br /> <br /> <br />
                           
                            <MyTextInput name="email" placeholder="Email"></MyTextInput>
                            <MyTextInput name="password" placeholder="Password" type="password"></MyTextInput>
                           <ErrorMessage 
                           name="error" render={()=> <Label style={{marginBottom:10}}basic

                            color='red'  content={errors.error} />}
                           />
                            <Button loading={isSubmitting} positive content="Login" type="submit" fluid></Button>
                    </Form>
                )}



        </Formik>
    );
})