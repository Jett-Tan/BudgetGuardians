import { Image } from "react-native"
export default function Icon() {
    return(
        <>
            <Image 
                source={require('../assets/favicon.png')}
                style={
                    {
                        width:300,
                        height:300
                    }
                }
            />
        </>
    )
}