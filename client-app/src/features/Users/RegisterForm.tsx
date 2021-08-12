import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { UseStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';

export default observer (function RegisterForm(){
    const {userStore} = UseStore();
    return(
        
        <Formik
        initialValues={{displayName:'', userName:''  ,email:'' , password:'' , accountNumber:'' ,error :null}}

        onSubmit={(values, {setErrors} )=> userStore.register(values).
        catch(error => setErrors({error}))}        
        validationSchema={Yup.object({
            displayName: Yup.string().required(),
            userName: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required(),
            accountNumber: Yup.string().required().matches(/^[0-9]+$/, "Must be only digits")
            .min(16, 'Must be exactly 16 digits')
            .max(16, 'Must be exactly 16 digits')
            
        })}
>
                {({handleSubmit , isSubmitting , errors ,isValid , dirty}) => (
                    <Form className="ui form error" autoComplete='off' onSubmit={handleSubmit} >
                           <Header as='h2' content='Sign Up' color='teal' textAlign='center' />
                           <hr />
                           <br />
                           <MyTextInput name="displayName" placeholder="Display Name"></MyTextInput>
                           <MyTextInput name="userName" placeholder="User Name"></MyTextInput>
                            <MyTextInput name="email" placeholder="Email"></MyTextInput>
                            <MyTextInput name="accountNumber" placeholder="Account Number"></MyTextInput>
                            <MyTextInput name="password" placeholder="Password" type="password"></MyTextInput>
                           
                           <ErrorMessage 
                           name="error" render={()=> 
                                <ValidationErrors errors={errors.error} />
                        }
                           />
                            <Button disabled={!isValid || !dirty || isSubmitting}
                             loading={isSubmitting} positive content="Register" type="submit" fluid></Button>
                    </Form>
                )}



        </Formik>
    );
})