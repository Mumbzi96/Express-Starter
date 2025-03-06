import React, { useEffect, useContext } from 'react';
import { useWindowSize } from "@uidotdev/usehooks";
import { useAuthContext } from '../context/useAuthContext';


function Default() {
    const size = useWindowSize();
    const { logout } = useAuthContext()

    return (
        <div style={{ textAlign: 'center', width: size.width }}>
            Home Page {"=>"} <button onClick={logout}>Click Here!</button>
        </div>
    )
}

export default Default;