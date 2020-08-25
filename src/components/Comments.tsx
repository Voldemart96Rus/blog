import React from 'react';
import {connect} from 'react-redux';
import Media from 'react-bootstrap/Media';

import CustomPagination from './layout/CustomPagination';
import {IComment, IPagination} from '../types';
import {setCommentsAndPage} from '../actions/post';

import './Comments.css';

interface IProps {
    postId: string;
    comments: IComment[];
    activePage: number;
    pagination: IPagination;
    setCommentsAndPage: (postId: string, page: number) => void;
}

const Comments: React.FC<IProps> = ({
    postId,
    comments,
    pagination: {total, limit, pages},
    activePage,
    setCommentsAndPage,
}) => {
    const setActivePage = (page: number): void => {
        setCommentsAndPage(postId, page);
    };

    return (
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
            {total > limit && (
                <CustomPagination
                    pages={pages}
                    activePage={activePage}
                    setActivePage={setActivePage}
                />
            )}
        </section>
    );
};

const mapStateToProps = (state: any) => ({
    postId: state.post.post.id,
    comments: state.post.post.comments,
    activePage: state.post.commentsPage,
    pagination: state.post.commentPagination,
});

export default connect(mapStateToProps, {setCommentsAndPage})(Comments);
