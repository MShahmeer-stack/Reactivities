import { observer } from 'mobx-react-lite';
import React from 'react';
import { Form, Formik } from 'formik';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { UseStore } from '../../app/stores/store';
import MyTextInput from '../../app/common/form/MyTextInput';
import MyTextArea from '../../app/common/form/MyTextArea';

interface Props{
    setEditMode : (editMode:boolean) =>void;
}

export default observer(function ProfileEdit({setEditMode}:Props){
    const {profileStore : {profile, updateProfile}} = UseStore();
    return(
        <Formik
        initialValues={{displayName : profile?.displayName , bio: profile?.bio}}

        onSubmit={values =>{
                updateProfile(values).then(()=> {
                    setEditMode(false);
                })
        }}
        
        validationSchema = {Yup.object({
            displayName :Yup.string().required()
        })}
        >
                {({isSubmitting , isValid , dirty}) => (
                    <Form className="ui form">
                           <MyTextInput placeholder='Display Name' name='displayName' />
                           <MyTextArea rows={3} placeholder='Add your Bio' name='bio'></MyTextArea>
                            <Button loading={isSubmitting} 
                            positive
                             content="Update Profile"
                              type="submit" 
                              floated='right'
                              disabled = {!isValid || !dirty}
                              />
                    </Form>
                )}



        </Formik>
    )
})


