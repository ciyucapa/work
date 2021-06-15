import {useCallback, useMemo, useState} from "react";
import {validateEmail} from "../utils";
import userService from "../service/userService";

const useForm = () => {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const changeEmail = (event) => {
        setEmail(event.target.value);
    };

    const changePassword = (event) => {
        setPassword(event.target.value);
    };

    const login = useCallback(async () => {
        try {
            const response = await userService.login(email, password);
            const{data:{data}} = response;
           console.log(data);
        }catch (error){
            console.log("error", error)
        }
    }, [email, password])

    const isFormValid = useMemo(() => {
        return password && email && validateEmail(email);
    }, [email, password]);

    return {
        email,
        password,
        changePassword,
        changeEmail,
        isFormValid,
        login,
    };
};

export default useForm;
