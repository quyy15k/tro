import React, { useEffect, useState } from 'react';
import { Sitem } from './index';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';
import { Link } from 'react-router-dom';
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString';
import { path } from '../ultils/constant';

const RelatedPost = ({ newPost }) => {
    const { newPosts, outStandingPost } = useSelector(state => state.post);
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        newPost ? dispatch(actions.getNewPosts()) : dispatch(actions.getOutstandingPost());
    }, [newPost, dispatch]);

    useEffect(() => {
        newPost ? setPosts(newPosts) : setPosts(outStandingPost);
    }, [outStandingPost, newPosts, newPost]);

    return (
        <div className='w-full bg-white rounded-md p-4'>
            <h3 className='font-semibold text-lg mb-4'>{newPost ? 'Tin mới đăng' : 'Tin nổi bật'}</h3>
            <div className='w-full flex flex-col gap-2'>
                {posts?.map(item => {
                    // Đảm bảo đường dẫn ở đây đúng
                    const detailPath = `${path.DETAIL}${formatVietnameseToString(item.title.replaceAll('/', ''))}/${item.id}`;
                    return (
                        <Link key={item.id} to={detailPath}>
                            <Sitem
                                title={item.title}
                                price={item?.attributes?.price}
                                createdAt={item.createdAt}
                                image={JSON.parse(item.images.image)}
                                star={item?.star}
                            />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default RelatedPost;
