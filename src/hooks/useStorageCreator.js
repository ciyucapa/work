import {useCallback, useEffect, useState} from 'react';

const useStorageCreator = (storage) => {
    const useStorage = (key, defaultValue) => {

        const [state, setState] = useState({
            hydrated: false,
            storageValue: defaultValue,
        });

        const {hydrated, storageValue} = state;

        const getStorageValue = useCallback(async () => {
            let value = defaultValue;
            let fromStorage = null;
            try {
                fromStorage = await storage.getItem(key);
            } catch (e) {} finally {
                if (fromStorage) {
                    value = JSON.parse(fromStorage);
                }
                setState({
                    hydrated: true,
                    storageValue: value,
                });
            }
        }, [key, defaultValue]);

        const updateStorage = useCallback(
            async (newValue) => {
                try {
                    if (newValue === null) {
                        await storage.removeItem(key);
                        setState({
                            hydrated: true,
                            storageValue: defaultValue,
                        });
                    } else {
                        const stringifiedValue = JSON.stringify(newValue);
                        await storage.setItem(key, stringifiedValue);
                        await getStorageValue();
                    }
                } catch (e) {}
            },
            [defaultValue, getStorageValue, key],
        );

        useEffect(() => {
            getStorageValue();
        }, [getStorageValue]);

        return [storageValue, updateStorage, hydrated];
    };

    return useStorage;
};

export default useStorageCreator;
