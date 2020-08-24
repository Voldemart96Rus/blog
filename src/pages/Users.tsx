import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';

import {IUser, IStoreState, IPagination} from '../types';
import {getUsers, getUserPagination} from '../actions/user';

type PathParamsType = {
    history: any;
};

type PropType = RouteComponentProps<PathParamsType> & {
    users: IUser[];
    pagination: IPagination;
    loading: boolean;
    history: any;
    getUsers: (page: number) => void;
    getUserCount: () => void;
};

const Users: React.FC<PropType> = ({
    users,
    pagination: {total, pages},
    loading,
    history,
    getUsers,
    getUserCount,
}) => {
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        getUserCount();
    }, []);

    useEffect(() => {
        getUsers(activePage);
        // todo cleanup
    }, [activePage]);

    const getPaginationItems = () => {
        const paginationItems = [];
        const takenPageNumbers = [];
        const PAGE_GROUP_LENGTH = 7;
        const PAGE_SUBGROUP_LENGTH = (PAGE_GROUP_LENGTH - 1) / 2;

        if (1 <= pages && pages <= 13) {
            for (let i = 1; i <= pages; i++) {
                paginationItems.push(
                    <Pagination.Item
                        onClick={() => setActivePage(i)}
                        active={i === activePage}
                    >
                        {i}
                    </Pagination.Item>
                );
            }

            return paginationItems;
        }

        // todo to constants
        for (
            let i = activePage - PAGE_SUBGROUP_LENGTH;
            i <= activePage + PAGE_SUBGROUP_LENGTH;
            i++
        ) {
            if (1 <= i && i <= pages) {
                paginationItems.push(
                    <Pagination.Item
                        onClick={() => setActivePage(i)}
                        active={i === activePage}
                    >
                        {i}
                    </Pagination.Item>
                );
                takenPageNumbers.push(i);
            }
        }

        if (paginationItems.length < PAGE_GROUP_LENGTH) {
            const additionalPages = [];
            let isStartAddition = false;
            let start, end;
            if (takenPageNumbers.includes(1)) {
                isStartAddition = true;
                start = takenPageNumbers[takenPageNumbers.length - 1] + 1;
                end =
                    start +
                    Math.min(PAGE_GROUP_LENGTH - paginationItems.length, pages);
            } else {
                start = Math.max(
                    takenPageNumbers[0] -
                        (PAGE_GROUP_LENGTH - paginationItems.length),
                    1
                );
                end = takenPageNumbers[0] - 1;
            }
            for (let i = start; i <= end; i++) {
                additionalPages.push(
                    <Pagination.Item
                        onClick={() => setActivePage(i)}
                        active={i === activePage}
                    >
                        {i}
                    </Pagination.Item>
                );
                takenPageNumbers.push(i);
            }
            if (isStartAddition) {
                paginationItems.push(...additionalPages);
            } else {
                paginationItems.splice(0, 0, ...additionalPages);
            }
        }

        takenPageNumbers.sort((a, b) => a - b);

        const leftmostPageNumber = takenPageNumbers[0];
        const rightmostPageNumber =
            takenPageNumbers[takenPageNumbers.length - 1];

        if (!takenPageNumbers.includes(1)) {
            paginationItems.unshift(
                <Pagination.Item onClick={() => setActivePage(1)}>
                    1
                </Pagination.Item>
            );

            if (leftmostPageNumber > 2) {
                paginationItems.splice(1, 0, <Pagination.Ellipsis />);
            }
        }

        if (!takenPageNumbers.includes(pages)) {
            if (pages - rightmostPageNumber > 1) {
                paginationItems.push(<Pagination.Ellipsis />);
            }

            paginationItems.push(
                <Pagination.Item onClick={() => setActivePage(pages)}>
                    {pages}
                </Pagination.Item>
            );
        }

        return paginationItems;
    };

    // <Preloader />
    return loading ? (
        <main>Loading...</main>
    ) : (
        <main className="main">
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Имя</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any, index: number) => (
                        <tr onClick={() => history.push(`/users/${user.id}`)}>
                            <td>
                                {index + (activePage - 1) * users.length + 1}
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {total > 20 && (
                <Pagination>
                    <Pagination.First onClick={() => setActivePage(1)} />
                    <Pagination.Prev
                        onClick={() =>
                            setActivePage(Math.max(activePage - 1, 1))
                        }
                    />
                    {getPaginationItems()}
                    <Pagination.Next
                        onClick={() =>
                            setActivePage(Math.min(activePage + 1, pages))
                        }
                    />
                    <Pagination.Last onClick={() => setActivePage(pages)} />
                </Pagination>
            )}
        </main>
    );
};

const mapStateToProps = (state: IStoreState) => ({
    users: state.user.users,
    pagination: state.user.pagination,
    loading: state.user.loading,
});

export default connect(mapStateToProps, {
    getUsers,
    getUserCount: getUserPagination,
})(withRouter(Users));
