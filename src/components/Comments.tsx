import React from 'react';
import {connect} from 'react-redux';
import Media from 'react-bootstrap/Media';

import CustomPagination from './layout/CustomPagination';
import {IPost, IPagination, IStoreState} from '../types';
import {setCommentsAndPage} from '../actions/post';

import './Comments.css';

interface IProps {
    post: IPost | null;
    activePage: number;
    pagination: IPagination;
    setCommentsAndPage: (postId: string, page: number) => void;
}

const Comments: React.FC<IProps> = ({
    post,
    pagination: {total, limit, pages},
    activePage,
    setCommentsAndPage,
}) => {
    const setActivePage = (page: number): void => {
        if (post) setCommentsAndPage(post.id, page);
    };

    if (post && post.comments)
        return (
            <section className="mt-5">
                {post.comments.map(({id, name, body, created_at}) => (
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

    return null;
};

const mapStateToProps = (state: IStoreState) => ({
    post: state.post.post,
    activePage: state.post.commentsPage,
    pagination: state.post.commentPagination,
});

export default connect(mapStateToProps, {setCommentsAndPage})(Comments);
