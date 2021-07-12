import React from "react";
import { Button, Card,Form, Grid,TextArea } from "semantic-ui-react";


export default function ContactUs(){
    return(

           
    <Grid>
    <Grid.Column width={2}></Grid.Column>       
        <Grid.Column width={12}>
            <Card fluid> 
                <Card.Content>
                    <Card.Header>Contact Us</Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <Form>
                        <Form.Field>
                            <label>First Name</label>
                            <input placeholder='First Name' />
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <input placeholder='Last Name' />
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input placeholder='Last Name' />
                        </Form.Field>
                        <Form.Field>
                            <label>Enter Your Message</label>
                            <TextArea placeholder='Tell us more' style={{ minHeight: 100 }} />    
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Card.Content>
            </Card> 
         </Grid.Column>
         <Grid.Column width={2}></Grid.Column>
    </Grid>

        );

}

