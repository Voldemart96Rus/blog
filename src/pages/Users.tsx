import React, {useState, useEffect} from 'react';
import {History} from 'history';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';

import {IUser, IStoreState, IPagination} from '../types';
import {getUsers, cleanUsers} from '../actions/user';
import {getPaginationItems} from '../utils';

type PropType = RouteComponentProps & {
    users: IUser[];
    pagination: IPagination;
    loading: boolean;
    history: History;
    getUsers: (page: number) => void;
    cleanUsers: () => void;
};

const Users: React.FC<PropType> = ({
    users,
    pagination: {total, pages, limit},
    loading,
    history,
    getUsers,
    cleanUsers,
}) => {
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        getUsers(activePage);
        return () => {
            cleanUsers();
        };
    }, [activePage, getUsers, cleanUsers]);

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
                    {users.map((user: IUser, index: number) => (
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
            {total > limit && (
                <Pagination>
                    <Pagination.First onClick={() => setActivePage(1)} />
                    <Pagination.Prev
                        onClick={() =>
                            setActivePage(Math.max(activePage - 1, 1))
                        }
                    />
                    {getPaginationItems(pages, activePage, setActivePage)}
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
    cleanUsers,
})(withRouter(Users));
