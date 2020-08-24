import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Table from 'react-bootstrap/Table';

import {getUsers} from '../actions/user';
import {getUserPosts} from '../actions/post';

// interface I {
//     id: string;
// }

// interface T extends EventTarget {
//     id: string;
// }

// interface M {
//     target: EventTarget & I;
// }

interface IProps {
    users: any;
    loading: boolean;
    getUsers: (page: number) => void;
    getUserPosts: (id: string) => void;
}

const Home: React.FC<IProps> = ({users, loading, getUsers, getUserPosts}) => {
    useEffect(() => {
        getUsers(1);
    }, []);

    const clickUser = (e: any): void => {
        if (e) getUserPosts(e.target.id);
    };

    // <Preloader />
    return loading ? (
        <div>Loading...</div>
    ) : (
        <div>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Имя</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody onClick={clickUser}>
                    {users.map((user: any, index: number) => (
                        <tr className="pointer" key={user.id} id={user.id}>
                            <td id={user.id}>{index + 1}</td>
                            <td id={user.id}>{user.name}</td>
                            <td id={user.id}>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    users: state.user.users,
    loading: state.user.loading,
});

export default connect(mapStateToProps, {getUsers, getUserPosts})(Home);
