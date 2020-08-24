export const SET_LOADING = 'SET_LOADING';
export const GET_USER = 'GET_USER';
export const GET_USERS = 'GET_USERS';
export const GET_POST = 'GET_POST';
export const GET_POSTS = 'GET_POSTS';
export const CLEAN_USERS = 'CLEAN_USERS';
export const CLEAN_POSTS = 'CLEAN_POSTS';

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
    limit: number;
}

export interface IPostState {
    posts: IPost[];
    post: IPost | null;
    pagination: IPagination;
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
    payload: {users: IUser[]; pagination: IPagination};
}

export interface GetPostAction {
    type: typeof GET_POST;
    payload: IPost;
}

export interface GetPostsAction {
    type: typeof GET_POSTS;
    payload: {posts: IPost[]; pagination: IPagination};
}

export interface SetLoadingAction {
    type: typeof SET_LOADING;
}

export interface CleanUsersAction {
    type: typeof CLEAN_USERS;
}

export interface CleanPostsAction {
    type: typeof CLEAN_POSTS;
}

export type UserActionTypes =
    | GetUserAction
    | GetUsersAction
    | CleanUsersAction
    | SetLoadingAction;

export type PostActionTypes =
    | GetPostAction
    | GetPostsAction
    | CleanPostsAction
    | SetLoadingAction;
