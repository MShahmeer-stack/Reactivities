import React from "react"

export default function RegisterForm({handleChange, data, handleSubmit, errors , handleClose}){
    
    const renderInput = (type, name) => {
        return <> 
            <input type={type} name={name} value={data[name]} onChange={handleChange} />
            {errors[name]?.length > 0 && <p>{errors[name]}</p>}
        </>
    }

    return (
        <div className="ui form">
            <div className="field">
              <label>Card Number:</label>
                {renderInput("text", "cardNumber")}
            </div>
            <div className="field">
                <label>Expiry Date:</label>
                {renderInput("text", "expiry")}
            </div>
            <div className="field">
                <label>CVV:</label>
                {renderInput("text", "cvv")}
            </div>

            <div className="field">
                <label>Amount:</label>
                {renderInput("text", "amount")}
            </div>
            <button className="ui positive button" onClick={handleSubmit}>Donate</button> 
            <button   className="ui button" onClick={handleClose}>Close</button>
            <br/>

        </div>
    )
        
}