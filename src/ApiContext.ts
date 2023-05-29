import { createContext } from "react";
import { IUserModel } from "./Users/IUserModel";

interface IApiContext {
    token :string | undefined,
    user :IUserModel | undefined,
    setToken(t :string) :any,
    dropToken() :any,
    url :string
}

export const ApiContext = createContext<IApiContext | undefined>(undefined);

export const actualApiContext = {
    url: process.env.REACT_APP_API_URL,
    setToken: () => {},
    dropToken: () => {},
    token: undefined,
    user: undefined
} as IApiContext