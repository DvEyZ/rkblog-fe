import { IUserBriefModel } from "../Users/IUserModel"

export interface IPostUploadModel
{
    title :string,
    content :string
}

export interface IPostBriefModel
{
    title :string,
    author :string
}

export interface IPostFullModel
{
    title :string,
    content :string,
    author :IUserBriefModel
}