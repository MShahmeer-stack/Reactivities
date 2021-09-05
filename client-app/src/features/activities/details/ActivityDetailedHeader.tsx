import { observer } from 'mobx-react-lite';
import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image, Label} from 'semantic-ui-react'
import {Activity} from "../../../app/models/activity";
import {format} from "date-fns"
import { UseStore } from '../../../app/stores/store';
import StripeCheckout from './StripeCheckout.jsx';
import PaymentModal from './paymentModal.jsx';
import { toast } from 'react-toastify';
const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    activity: Activity
}




export default observer (function ActivityDetailedHeader({activity}: Props) {

    const [openModal, setOpenModal] = useState(false);
    const [errors, setErrors] = useState({
        cardNumber: "" ,
        expiry: "",
        cvv: "",
        amount: "",
    });
    const [paymentForm, setPaymentForm] = useState({
        cardNumber: "" ,
        expiry: "",
        cvv: "",
        amount: "",
    })
        
    const handleModalOpen = () =>{ setOpenModal(true); console.log("clicked", paymentForm)};
    const handleModalClose = () => {
        setOpenModal(false)
        setPaymentForm({
            cardNumber: "" ,
            expiry: "",
            cvv: "",
            amount: "",
        })
        setErrors({
            cardNumber: "" ,
            expiry: "",
            cvv: "",
            amount: "",
        })
    };

    const handlePaymentSubmit = () => {
        console.log("submitted");
        setTimeout(()=>{
            toast.success("Donated Successfully");
            handleModalClose();
        }, 1000)
    };


    const handleChange = (e: any) => {
        const {name, value} = e.target;
        const data = {...paymentForm};
        const allErrors = {...errors};
        if (name === 'cardNumber'){
            data.cardNumber = value;
            if(value.length < 16) {
                allErrors.cardNumber= "Card Number Must be 16 Digits";
            }else{
                allErrors.cardNumber=""
            }
        }else if (name === 'expiry'){
            data.expiry = value;
             if(value.length < 1) {
                allErrors.expiry= "Expiry Date is Required";
            }else{
                allErrors.expiry=""
            }
        }else if (name === 'cvv'){
            data.cvv = value;
            if(value.length < 3) {
                allErrors.expiry= "CVV must be at least 3 digits";
            }else{
                allErrors.expiry=""
            }
        }else if (name === 'amount'){
            data.amount = value;
            if(value.length < 3) {
                allErrors.amount= "Amount is required";
            }else{
                allErrors.amount=""
            }
        }
        setPaymentForm(data);
        setErrors(allErrors);
    }

   const {activityStore : {updateAttendance,loading,cancelActivityToggle}} = UseStore();
    return (
        <>
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                {activity.isCancelled &&
                <Label style={{position:'absolute' , zIndex:1000 , left: -14 ,top:20}}
                ribbon color='red' content='Cancelled'></Label>}
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle}/>
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format(activity.date! , 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong><Link to={`/profiles/${activity.host?.userName}`}>{activity.host?.displayName}</Link></strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {activity.isHost ?(
             <>
              <Button color={activity.isCancelled ? 'green':'red' }floated='left' basic 
              content={activity.isCancelled ?'Re-activate case' : 'Cancel'}
              onClick={cancelActivityToggle} loading={loading}
              />
                <Button 
               disabled={activity.isCancelled} as={Link} 
                to={`/manage/${activity.id}`}color='orange' floated='right'>
                    Manage Case
                </Button>
             </>
                ) : activity.isGoing ?( 
                <Button loading={loading} onClick={updateAttendance}>Undo</Button>) :
                 ( <Button loading={loading} disabled={activity.isCancelled}
                    onClick={updateAttendance} color='teal'>Like Activity</Button>
                )}
                <Button positive 
                onClick={handleModalOpen} >
                    Donate
                </Button>
            </Segment>
        </Segment.Group>

        {openModal && 
            <PaymentModal 
                open={openModal} 
                handleClose={handleModalClose}
                body={
                    <StripeCheckout 
                    data={paymentForm}
                        handleChange={handleChange}
                        handleSubmit={handlePaymentSubmit}
                        errors={errors}
                        handleClose={handleModalClose}
                    />
                }
            />  
        }
        </>
    )
})
