import { isDevMode } from "@angular/core";

export interface IUser {
    "username": string,
    "name": string,
    "bio": string,
    "image": string,
    "url": string,
    "location": string,
    "blog": string | null,
    "twitter_url": string | null,
    "public_repos": number
}

export interface IRepos {
    "name": string,
    "description": string,
    "url": string,
    "topics": string[],
    "language": string | null,
}

export const baseURL = isDevMode() ? 'http://127.0.0.1:5000' : ''