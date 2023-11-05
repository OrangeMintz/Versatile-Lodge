import { React, useState } from 'react'
import HashLoader from "react-spinners/HashLoader";
// import PropagateLoader from "react-spinners/PropagateLoader";

// const override: css = {
//     display: "block",
//     margin: "0 auto",
//     borderColor: "red",
// };

function Loader() {

    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");


    return (
        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
            <div className="sweet-loading">
                <HashLoader
                    color={color}
                    loading={loading}
                    cssOverride=""
                    size={70}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    )
}

export default Loader