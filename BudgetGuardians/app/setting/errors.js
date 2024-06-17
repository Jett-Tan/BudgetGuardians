const ErrorMap = new Map([
    ["auth/email-already-exists","Email already exists"],
    ["auth/email-already-in-use","Email already exists"],
    ["auth/invalid-email","Invalid Email"],
    ["auth/invalid-password","Invalid Password. It must be at least six characters."],
    ["auth/user-not-found","User not found"],
    ["auth/invalid-credential","Wrong password or Email"],
    ["auth/missing-email","Missing Email"],
    ["auth/weak-password","Weak Password. It must be at least six characters"],
    ["auth/email-unverified","Email not verified"],
    //
    ["email/improper-email","Improper Email"],
    //
    ["pwd/unmatched-password","Passwords do not match!"],
    ["pwd/invalid-password","Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character."],
])
export default Errors = {
    errorGetter: (error) => {
        return ErrorMap.get(error)
    },
    handleError: (input, type = "default", props = {}) => {
        switch (type) {
            case "password":
                if (input.length < 8 || 
                    !input.match(/[A-Z]/) || 
                    !input.match(/[a-z]/) || 
                    !input.match(/[0-9]/) || 
                    !input.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
                    return "pwd/invalid-password"
                } else {
                    return ''
                }
                break;

            case "confirm":
                if(props.password !== props.confirmPassword) {
                    return "pwd/unmatched-password"
                } else {
                    return ''
                }
                break;

            case "email":
                if (input.includes("@") && input.includes(".")) {
                    return ''
                } else {
                    return "email/improper-email"
                }
                
                break;
            
            case "emailExist":
                return "auth/email-already-in-use"
                break;
                
            default:
                return ''
                break;
        }
    },
}