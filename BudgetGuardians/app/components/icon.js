import { useState } from "react"
import { Image } from "react-native"
export default function Icon({size}) {
    return(
        <>
            <Image 
                source={require('../assets/favicon.png')}
                style={
                    {
                        width:size,
                        height:size
                    }
                }
            />
        </>
    )
}