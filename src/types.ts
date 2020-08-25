export const SET_LOADING = 'SET_LOADING';
export const SET_TOKEN = 'SET_TOKEN';

export const GET_POST = 'GET_POST';
export const GET_POSTS = 'GET_POSTS';
export const CLEAN_POSTS = 'CLEAN_POSTS';
export const POST_ERROR = 'POST_ERROR';
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR';
export const SET_POSTS_PAGE = 'SET_POSTS_PAGE';

export const GET_USER = 'GET_USER';
export const GET_USERS = 'GET_USERS';
export const CLEAN_USERS = 'CLEAN_USERS';
export const USER_ERROR = 'USER_ERROR';
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR';
export const SET_USERS_PAGE = 'SET_USERS_PAGE';

export interface IPost {
    id: string;
    user_id: string;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
    comments?: IComment[];
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    gender?: string;
    status?: string;
}

export interface IComment {
    id: string;
    name: string;
    email: string;
    body: string;
    created_at: string;
    updated_at: string;
}

export interface IError {
    id: string;
    code: number;
    message: string;
}

export interface IPagination {
    total: number;
    pages: number;
    limit: number;
}

export interface IPostState {
    posts: IPost[];
    post: IPost | null;
    page: number;
    pagination: IPagination;
    errors: IError[];
    loading: boolean;
}

export interface IUserState {
    users: IUser[];
    user: IUser | null;
    page: number;
    pagination: IPagination;
    errors: IError[];
    loading: boolean;
}

export interface IAuthState {
    token: string | null;
}

export interface IStoreState {
    post: IPostState;
    user: IUserState;
    auth: IAuthState;
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

export interface PostErrorAction {
    type: typeof POST_ERROR;
    payload: IError;
}

export interface UserErrorAction {
    type: typeof USER_ERROR;
    payload: IError;
}

export interface SetLoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
}

export interface CleanUsersAction {
    type: typeof CLEAN_USERS;
}

export interface CleanPostsAction {
    type: typeof CLEAN_POSTS;
}

export interface SetUsersPageAction {
    type: typeof SET_USERS_PAGE;
    payload: number;
}

export interface SetPostsPageAction {
    type: typeof SET_POSTS_PAGE;
    payload: number;
}

export interface SetTokenAction {
    type: typeof SET_TOKEN;
    payload: string;
}

export interface DeleteUserErrorAction {
    type: typeof DELETE_USER_ERROR;
    payload: string;
}

export interface DeletePostErrorAction {
    type: typeof DELETE_POST_ERROR;
    payload: string;
}

export type UserActionTypes =
    | GetUserAction
    | GetUsersAction
    | UserErrorAction
    | CleanUsersAction
    | SetLoadingAction
    | DeleteUserErrorAction
    | SetUsersPageAction;

export type PostActionTypes =
    | GetPostAction
    | GetPostsAction
    | PostErrorAction
    | CleanPostsAction
    | SetLoadingAction
    | DeletePostErrorAction
    | SetPostsPageAction;

export type AuthActionTypes = SetTokenAction;
