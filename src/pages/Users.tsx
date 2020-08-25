import React, {useEffect} from 'react';
import {History} from 'history';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import {IUser, IStoreState, IPagination} from '../types';
import {getUsers, cleanUsers, setUsersPage} from '../actions/user';
import CustomPagination from '../components/layout/CustomPagination';

// все аналогично posts
type PropType = RouteComponentProps & {
    users: IUser[];
    pagination: IPagination;
    loading: boolean;
    activePage: number;
    history: History;
    getUsers: (page: number) => void;
    cleanUsers: () => void;
    setUsersPage: (page: number) => void;
};

const Users: React.FC<PropType> = ({
    users,
    pagination: {total, pages, limit},
    loading,
    history,
    activePage,
    getUsers,
    cleanUsers,
    setUsersPage,
}) => {
    useEffect(() => {
        getUsers(activePage);
        return () => {
            cleanUsers();
        };
    }, [activePage, getUsers, cleanUsers]);

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
                    {users.map((user: IUser, index: number) => (
                        <tr
                            key={user.id}
                            className="cursor-pointer"
                            onClick={() => history.push(`/users/${user.id}`)}
                        >
                            <td>
                                {index + (activePage - 1) * users.length + 1}
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {total > limit && (
                <CustomPagination
                    pages={pages}
                    activePage={activePage}
                    setActivePage={setUsersPage}
                />
            )}
        </main>
    );
};

const mapStateToProps = (state: IStoreState) => ({
    users: state.user.users,
    pagination: state.user.pagination,
    loading: state.user.loading,
    activePage: state.user.page,
});

export default connect(mapStateToProps, {
    getUsers,
    cleanUsers,
    setUsersPage,
})(withRouter(Users));
