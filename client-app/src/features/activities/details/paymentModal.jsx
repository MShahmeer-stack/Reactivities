import React from "react";

const container ={
    backgroundColor: 'white',
    padding:'auto',
    margin:'auto',
    width:"100%",
    height:"21%"
  
  }

  const inner={
    width:'80%',
    marginLeft:"10px",
    marginTop:"6px",
    marginBottom:"6px"
  }
export default function PaymentModal ({body, handleClose,open }){
    return (

<div class="container" style={container}>
  <div className="inner"  style={inner}>
  <div class="modal-dialog" role="dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Donate on this case</h2>
      </div>
   
      <br />
      <div class="modal-body">
        {body}
      </div>
    </div>
  </div>
  </div>
</div>
        
        
     
    )
}

/* <div className="container">
<div className="ui active modal" role="dialog">
<div className="header">Donate On This case</div>
<div className="content">
{body}
</div>
</div>
</div> */
