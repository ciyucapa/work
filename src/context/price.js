import {createContext, useContext, useMemo, useCallback} from "react";
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

    const usePrices = () => {
        const context = useContext(pricesContext);

        if (!context) {
            throw new Error('usePrices must be used within a PricesProvider');
        }

        const {priceValue, updatePriceValue: update, priceIsReady, ...rest} = context;

        const updatePriceValue = useCallback(
            (newValue) => {
                update(newValue);
            },
            [priceValue, update])

        return {
            ...rest,
            priceValue,
            updatePriceValue,
            priceIsReady,
        };
    };

    return {
        PricesProvider,
        usePrices,
    };
};

export default prices;
