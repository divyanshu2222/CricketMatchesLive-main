import React from 'react';

const ApiKeyTest = () => (
  <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px' }}>
    <h3>API Key Verification:</h3>
    <p>
      Loaded Key:{' '}
      <strong>{process.env.REACT_APP_RAPIDAPI_KEY || 'NOT FOUND'}</strong>
    </p>
    <p>Variable name: REACT_APP_RAPIDAPI_KEY</p>
  </div>
);

export default ApiKeyTest;
