import { Image } from "react-native"

import ImageAssets from "../assets/imageAssets"

export default function Icon({size,iconHref = "favicon"}) {

    return(
        <>
            <Image 
                source={ImageAssets.use(iconHref)}
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