import {useState,useEffect} from "react";
import priceService from "../service/priceService";

const usePrice = () => {

    const [price, setPrice] = useState(0)

    useEffect(() => {
        let isFetch = true;

        (async () =>{
            try {
                if (isFetch) {
                    const response = await priceService.getPrice();
                    const {data:{btc_buy}} = response;
                    setPrice(btc_buy);
                }
            } catch (error) {
                console.log("EL ERROR", error)
            }
        })()

        return () => {
             isFetch = false;
         }
    },[])

    return {
        price
    };
}

export default usePrice;
