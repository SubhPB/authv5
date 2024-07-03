// Byimaan

'use client';

import React, {useEffect, useState} from "react";

export const FixHydration = ({children}:{children: React.ReactNode}) => {

    const [serverRendering, setServerRendering] = useState(true);

    useEffect(
        () => {
            setServerRendering(false)
        }, []
    );

    return (
        <>
            {!serverRendering && children}
        </>
    )
}