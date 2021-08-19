import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button,Card,FormField,Header,Label,Segment } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { UseStore } from '../../../app/stores/store';
import{v4 as uuid} from "uuid";
import { Formik  ,Form, ErrorMessage  } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';

import { CategoryOptions } from '../../../app/common/options/categoryOptions';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity, ActivityFormValues } from '../../../app/models/activity';


export default observer(function  ActivityForm(){
    
    const history=useHistory();
    
    const {activityStore} = UseStore();
    const{createActivity,updateActivity,
        loading,loadingInitial, loadActivity}= activityStore;

    const{id} = useParams<{id : string}>();
    const[activity , setActivity] = useState<ActivityFormValues>(new ActivityFormValues());
    const validationSchema = Yup.object({
        title : Yup.string().required("The activity title is required."),
        description : Yup.string().required("The activity description is required."),
        category : Yup.string().required(),
        date : Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city : Yup.string().required(),
        amount : Yup.string().required('Please Enter the amount'),
        phone : Yup.string().required('Phone Number is required')
    })
   
    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)))
    },[id, loadActivity])

    function handleFormSubmit(activity:ActivityFormValues){
           if(!activity.id){
               let newActivity={
                   ...activity,
                   id : uuid()
                }

                createActivity(newActivity).then(()=> history.push(`/activities/${newActivity.id}`))


           }else{
            updateActivity(activity).then(()=> history.push(`/activities/${activity.id}`))
           }
    }
    
//  <MyTextInput name='amount' placeholder="Enter Amount" />
    //if(loadingInitial) return <LoadingComponents content="Loading activity..."/>
    return(
            <Segment clearing>
                <Header size='huge' color='teal' content='Create Your Case:'/>
                <hr></hr>
                <Header sub color='teal' content='Activity Details'/>
                <Formik 
                validationSchema={validationSchema}
                enableReinitialize
                 initialValues={activity}
                  onSubmit={values => handleFormSubmit(values)}> 
                    {( {handleSubmit ,isValid, isSubmitting , dirty}) => (
                        <Form  className="ui form" onSubmit={handleSubmit} autoComplete='off'> 
                        <MyTextInput name='title' placeholder="Title" />
                       
                        <MySelectInput options={CategoryOptions} placeholder="Choose Category" name='category' />
                       
                        <MyTextArea rows={3} placeholder="Description about your case" name='description' />
                        <MyDateInput 
                        placeholderText="Date"
                          name='date' 
                        showTimeSelect
                        timeCaption='time'
                        dateFormat = 'MMMM d, yyyy h:mm aa'
                        />
                    <Header sub color='teal' content='Location Details'/>
                        <MyTextInput placeholder="City"  name='city'  />
                        <MyTextInput placeholder="Venue"  name='venue' />
                        <MyTextInput name='phone' placeholder="Phone" />
                        <MyTextInput name='amount' placeholder="Amount - If No, then please enter none" />
                      
                        <Button
                        disabled = {isSubmitting || !isValid || !dirty } 
                        loading= {isSubmitting} floated='right' positive type="submit" content='Submit' />
                        <Button as={Link} to='/activities' floated='right'  type="button" content='Cancel' />
                
                    </Form>
                    )}
                </Formik>
            </Segment>



    )
})


