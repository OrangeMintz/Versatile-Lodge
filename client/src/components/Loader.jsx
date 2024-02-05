import React, { useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

function Loader() {
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState('var(--main-color)');

    return (
        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <div className="sweet-loading">
                <PulseLoader
                    color={color}
                    loading={loading}
                    cssOverride=""
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    );
}

export default Loader;
