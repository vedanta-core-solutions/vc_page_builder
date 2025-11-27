'use client';
import { createContext, useContext } from "react";

const ConfigContext = createContext(null);

export function useConfig() {
    return useContext(ConfigContext);
}

export default function ConfigProviderClient({ config, children }) {
    return (
        <ConfigContext.Provider value={config}>
            { children }
        </ConfigContext.Provider>
    );
}