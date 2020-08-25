import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import {IPost} from '../types';

type PropType = RouteComponentProps & {
    posts: IPost[];
    history: History;
    activePage: number;
    onClick: (id: string) => void;
};

const PostsTable: React.FC<PropType> = ({
    posts,
    history,
    activePage,
    onClick,
}) => (
    <Table striped bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Заголовок</th>
                <th>Редактировать</th>
            </tr>
        </thead>
        <tbody>
            {posts.map((post: IPost, index: number) => (
                <tr
                    key={post.id}
                    className="cursor-pointer"
                    onClick={(e: any) => {
                        if (e.target.tagName === 'BUTTON')
                            history.push(
                                `/create-or-edit-post?post_id=${post.id}`
                            );
                        else onClick(post.id);
                    }}
                >
                    <td>{index + (activePage - 1) * posts.length + 1}</td>
                    <td>{post.title}</td>
                    <td>
                        <Button variant="dark">Редактировать</Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default withRouter(PostsTable);
