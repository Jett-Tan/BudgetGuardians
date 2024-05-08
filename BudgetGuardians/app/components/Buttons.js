import { Link, Pressable } from "expo-router";
import { Button } from "react-native";


const loginButton = () => {
    return (
        <Link href="/Login" asChild>
            <Pressable>
                <Text>Login</Text>
            </Pressable>
        </Link>
    )
}


export default { loginButton };