import React from 'react';
import Table from 'react-bootstrap/Table';

import {IPost} from '../types';

type PropType = {
    posts: IPost[];
    activePage: number;
    onClick: (id: string) => void;
};

const PostsTable: React.FC<PropType> = ({posts, activePage, onClick}) => (
    <Table striped bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Заголовок</th>
            </tr>
        </thead>
        <tbody>
            {posts.map((post: IPost, index: number) => (
                <tr
                    key={post.id}
                    className="cursor-pointer"
                    onClick={() => onClick(post.id)}
                >
                    <td>{index + (activePage - 1) * posts.length + 1}</td>
                    <td>{post.title}</td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default PostsTable;
