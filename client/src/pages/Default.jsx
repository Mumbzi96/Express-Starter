import React, { useEffect, useContext } from 'react';
import { useWindowSize } from "@uidotdev/usehooks";


function Default() {
    const size = useWindowSize();

    return (
        <div style={{ textAlign: 'center', width: size.width }}>
            Home Page
        </div>
    )
}

export default Default;