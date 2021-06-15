import {useState} from "react";
import usePrice from "./usePrice";

const useQuote = () => {

    const[sendAmount, setSendAmount] = useState(0);
    const[reviceAmount, setReviceAmount] = useState(0);
    const {price} = usePrice();

    const changeSendAmount = (event) => {
        const amount = event.target.value;
        setSendAmount(amount);
        if (amount !== 0) {
            setReviceAmount(amount / price);
        }
    };

    const changeReviceAmount = (event) => {
        const amount = event.target.value;
        setReviceAmount(amount);
        setSendAmount(amount * price)
    };

    return {
        price,
        sendAmount,
        reviceAmount,
        changeReviceAmount,
        changeSendAmount,
    };
};

export default useQuote;
