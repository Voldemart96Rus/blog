export const SET_LOADING = 'SET_LOADING';
export const GET_USER = 'GET_USER';
export const GET_USERS = 'GET_USERS';
export const GET_POST = 'GET_POST';
export const GET_POSTS = 'GET_POSTS';
export const GET_PAGINATION_DATA = 'GET_PAGINATION_DATA';
export const CLEAN_USERS = 'CLEAN_USERS';

export interface IPost {
    id: string;
    user_id: string;
    title: string;
    body: string;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    gender?: string;
    status?: string;
}

export interface IPagination {
    total: number;
    pages: number;
}

export interface IPostState {
    posts: IPost[];
    post: IPost | null;
    loading: boolean;
}

export interface IUserState {
    users: IUser[];
    user: IUser | null;
    pagination: IPagination;
    loading: boolean;
}

export interface IStoreState {
    post: IPostState;
    user: IUserState;
}

export interface GetUserAction {
    type: typeof GET_USER;
    payload: IUser;
}

export interface GetUsersAction {
    type: typeof GET_USERS;
    payload: IUser[];
}

export interface GetPostAction {
    type: typeof GET_POST;
    payload: IPost;
}

export interface GetPostsAction {
    type: typeof GET_POSTS;
    payload: IPost[];
}

export interface SetLoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
}

export interface GetPaginationDataAction {
    type: typeof GET_PAGINATION_DATA;
    payload: IPagination;
}

export interface CleanUsersAction {
    type: typeof CLEAN_USERS;
}

export type UserActionTypes =
    | GetUserAction
    | GetUsersAction
    | CleanUsersAction
    | SetLoadingAction
    | GetPaginationDataAction;
export type PostActionTypes = GetPostAction | GetPostsAction | SetLoadingAction;
