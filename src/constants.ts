import {IPagination} from './types';

export const BASE_URL = 'https://gorest.co.in/public-api/';
export const SERVER_ERROR = {code: 500, message: 'Internal server error.'};
export const PAGE_GROUP_LENGTH = 7;
export const PAGE_SUBGROUP_LENGTH = (PAGE_GROUP_LENGTH - 1) / 2;
export const PAGE_MAX_GROUP_LENGTH = 13;
export const INITIAL_PAGINATION_STATE: IPagination = {
    total: 0,
    pages: 0,
    limit: 20,
};
