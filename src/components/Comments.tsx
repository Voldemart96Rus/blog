import React from 'react';
import Media from 'react-bootstrap/Media';

import './Comments.css';

import {IComment} from '../types';

interface IProps {
    comments: IComment[];
}

const Comments: React.FC<IProps> = ({comments}) => (
    <section className="mt-5">
        {comments.map(({id, name, body, created_at}) => (
            <Media key={id}>
                <img
                    src="/images/user.svg"
                    alt="Пользователь"
                    className="user-icon mr-3"
                />
                <Media.Body>
                    <div className="comment-top">
                        <h5>{name}</h5>
                        <small className="text-muted">
                            {new Date(created_at).toLocaleString()}
                        </small>
                    </div>
                    <p>{body}</p>
                </Media.Body>
            </Media>
        ))}
    </section>
);

export default Comments;
