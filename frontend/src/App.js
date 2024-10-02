import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import PolicyDetails from './components/PolicyDetails';
import FormFilling from './components/FormFilling';
import Chatbot from './components/Chatbot';

const App = () => {
    const [policy, setPolicy] = useState(null);
    const [isFormFilling, setIsFormFilling] = useState(false);

    const selectPolicy = (selectedPolicy) => {
        setPolicy(selectedPolicy);
        setIsFormFilling(false);
    };

    const proceedToForm = () => {
        setIsFormFilling(true);
    };

    return (
        <div>
            {!isFormFilling ? (
                !policy ? (
                    <LandingPage selectPolicy={selectPolicy} /> // Pass selectPolicy to LandingPage
                ) : (
                    <PolicyDetails
                        policyType={policy}
                        proceedToForm={proceedToForm}
                    />
                )
            ) : (
                <FormFilling policyType={policy} />
            )}
            <Chatbot />
        </div>
    );
};

export default App;
