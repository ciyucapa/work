import {useCallback, useEffect, useState} from "react";

const useStorageCreator = ( key, defaultValue) => {
    const useStorage = (storage) => {
        const [state, setState] = useState({
            hydrate: false,
            storageValue: defaultValue,
        });

        const {hydrate, storageValue} = state;

        const getStorageValue = useCallback(async () => {
            let value = defaultValue;
            let fromStorage = null;
            try {
                fromStorage = await storage.getItem(key);
            } catch (e) {}
            finally {
                if (fromStorage) {
                    value = JSON.parse(fromStorage);
                } setState({
                    hydrate: true,
                    storageValue: value,
                })
            }
        }, [key, defaultValue]);

        const updateStorageValue = useCallback(
            async (newValue) => {
            try {
                if (newValue === null) {
                    await storage.removeItem(key);
                    setState({
                        hydrate: true,
                        storageValue: defaultValue,
                    })
                } else {
                    const stringifiedValue = JSON.stringify(newValue);
                    await storage.getItem(key, stringifiedValue);
                    await getStorageValue();
                }
            } catch (e) {}
        }, [defaultValue, key, getStorageValue])

        useEffect(() => {
            getStorageValue();
        }, [getStorageValue])

        return [storageValue, updateStorageValue, hydrate]
    };

    return {
        useStorage,
    };
};

export default useStorageCreator;
