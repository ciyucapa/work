import {createContext, useMemo} from "react";
import PropTypes from 'prop-types';

import {PRICES_DEFAULT_VALUE, PRICE_KEY} from "./state";

const prices = (useStorage) => {
    const pricesContext = createContext();
    const {Provider} = pricesContext;

    const PricesProvider = (props) => {
        const [priceValue, updatePriceValue, hydrate] = useStorage({
            PRICE_KEY,
            PRICES_DEFAULT_VALUE,
        })

        const value = useMemo(
            () => ({
                priceValue,
                updatePriceValue,
                priceIsReady : hydrate,
            }),
            [priceValue, updatePriceValue, hydrate])

        return <Provider value={value} {...props}/>
    };

    PricesProvider.propTypes = {
        children: PropTypes.shape({}).isRequired,
    }

    return {
        PricesProvider,
    };
};

export default prices;
