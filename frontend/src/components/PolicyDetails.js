import React from 'react';
import './PolicyDetails.css';

const PolicyDetails = ({ policyType, proceedToForm }) => {
    return (
        <div className="policy-details">
            <h2 className="policy-title">{policyType.name}</h2>
            <p className="policy-description">{policyType.description}</p>
            <button className="proceed-button" onClick={proceedToForm}>
                Proceed to Fill Form
            </button>
        </div>
    );
};

export default PolicyDetails;
