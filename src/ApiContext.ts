import { createContext } from "react";
import { IUserBriefModel } from "./Users/IUserModel";

interface IApiContext {
    token :string | undefined,
    user :IUserBriefModel | undefined,
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