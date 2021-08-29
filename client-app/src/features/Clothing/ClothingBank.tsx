import React from "react";
import { Button, Card,Form, Grid,TextArea } from "semantic-ui-react";


export default function ClothingBank(){
    return(           
    <Grid>
    <Grid.Column width={2}></Grid.Column>       
        <Grid.Column width={12}>
            <Card fluid> 
                <Card.Content>
                    <Card.Header><h1 style={{color:'#1abfcb'}}>KindCause Clothing Bank</h1></Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <Card.Header> <h2 style={{color:'#1abfcb'}}>THE IDEA : </h2></Card.Header>
                    <Card.Description>
                        <div style={{fontSize:"110%"}}>
                        Being a developing country, People are striving to fulfill their basic necessities and needs. Our idea aims to work for such people who are struggling to get employed and fight through the vicious cycle of poverty.Our main aim of providing the lower class of our country with donations of new and smoothly worn clothing free of cost.
                         These donations are especially for those locals who face difficulty while searching for jobs or other daily things.
                         During this time of pandemic, the whole world has gone into crisis. Therefore, such donations are a dire need for the people of our country and KindCause would accommodate such locals of Lahore by providing them with good quality clothing and other important accessories
                        </div>
                    
                        <br />
                    <div style={{fontSize:"110%"}}>
                       <h2>We accept new and smoothly worn items such as:</h2>
                       <ul>
                            <li>Suits (both men and women)</li>
                            <li>Jackets, blazers and cardigans</li>
	                        <li>Office appropriate dresses</li>
                            <li> Dresses for children </li>
	                        <li>Shirts</li>
                        	<li>Camisoles and undergarments</li>
                        	<li>Dress shoes and boots</li>
	                        <li>Jewelry and accessories</li>
	                        <li>Outerwear</li>
                       </ul>
                    
                    <h2>Conditions:</h2>
                   <ol>
                   <li>Clothes must be in a good condition – (new or gently worn).</li>
                   <li>Clothes must be washed, pressed and ironed properly before being donated.</li>
                   <li> Torn, stained or clothes not in a wearable condition will not be accepted</li>
                   <li> Accessories such as Jewelry, watch, bags, shoes e.t.c must be in a good condition.</li> 
                   <li> Undergarments MUST be new. No used items in this regards would be accepted.</li>
                   </ol>
                    </div>
                    <div style={{fontSize:"110%"}}>
                        <h2>Delivery Scenerios:</h2>
                        <p> For the feasibility and convenience for you and our volunteers we have chosen two options which are as follows:</p>
                      
                        <ul>
                            <li>The riders at our center would pick up your clothing donations<br />
                                 free of cost provided that your residence falls in our service area</li>
                            <li>Drop off your clothes donation at our charity center if convenient.</li>
                        </ul>

                        <div> 
                            <h3>Have any Queries? Contact us on <a style={{color:'green'}}  href='https://wa.me/923215285624'>WhatsApp</a></h3> </div>
                        
                        
                    </div>

                    

                    </Card.Description>
                </Card.Content>
            </Card> 
         </Grid.Column>
         <Grid.Column width={2}></Grid.Column>
    </Grid>

        );

}

/*  <div  style={{fontSize:"110%"}} >
                        A huge variety of social service agencies refer clients to us and our volunteers help these people by assisting them in the selection of appropriate clothes to wear for their interviews and employment opportunities. We have a good team of hardworking volunteers who make our clients comfortable in every way possible. We aim to expand at a high pace and are currently taking care of thousands of disadvantaged locals of our society.
                        </div>
                        <br></br>
                        <div  style={{fontSize:"110%"}} >
                        Our foundation is open for all but the disadvantaged women are our first priority. Our target is to assist over 500 women each year and donate them with a handful of good quality clothing suitable to be worn at workplaces or even home, free of cost. Not only is this but apart from clothes our services would also include some basic necessities. 
                        <br />
                        <h3>Initially each of our kit would have the following items:</h3>
                            <ul>
                                <li>Toothbrush and toothpaste</li>
                                <li>Deodorants/ Perfume</li>
                                <li>Shampoo and conditioner</li>
                                <li>Comb or Hairbrush</li>
                                <li> Body soap </li>
                                <li>Female Hygiene products</li>
                                <li>Lotion</li>
                            </ul>

                        </div> */