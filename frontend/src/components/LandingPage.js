import React from 'react';
import './LandingPage.css';

const LandingPage = ({ selectPolicy }) => {
    const policies = [
        { id: 1, name: 'Health Insurance' },
        { id: 2, name: 'Car Insurance' },
        // Add more policies as needed
    ];

    return (
        <div className="landing-page">
            <h1>Welcome to Insurance Portal</h1>
            <h2>Select a Policy to Explore</h2>
            {policies.map((policy) => (
                <button key={policy.id} onClick={() => selectPolicy(policy)}>
                    Explore {policy.name}
                </button>
            ))}
        </div>
    );
};

export default LandingPage;
