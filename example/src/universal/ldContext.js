import {createContext} from 'react';
const {Provider: FlagProvider, Consumer: FlagConsumer} = createContext(); // TODO: workout the default values for the context
export {FlagProvider, FlagConsumer};