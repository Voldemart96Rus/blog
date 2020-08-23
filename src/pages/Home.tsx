import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Table from 'react-bootstrap/Table';

import {getUsers} from '../actions/user';

interface IProps {
    users: any;
    loading: boolean;
    getUsers: (page: number) => void;
}

const Home: React.FC<IProps> = ({users, loading, getUsers}) => {
    useEffect(() => {
        getUsers(1);
    }, []);

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
                <tbody>
                    {users.map((user: any, index: number) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
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

export default connect(mapStateToProps, {getUsers})(Home);
