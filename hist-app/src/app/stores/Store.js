import { createContext, useContext } from "react";
import MapStore from "./MapStore";

export const store = {
    mapStore: new MapStore()
}

export const StoreContext = createContext(store);

// simple react hook
export function useStore() {
    return useContext(StoreContext);
}