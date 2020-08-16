
import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm, Field } from 'redux-form'
import {maxLengthCreator, required} from "../../../utils/validators";
import {Textarea} from "../../common/formControls/formControls";

const  MyPosts = React.memo(props => {
    console.log('render')
    console.log(props)
    let postsElements =
        props.posts.map( p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    const submitForm = (e) =>{
        props.addPost(e.postText);
        props.resetPostForm('post')
    };

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <ReduxPostForm onSubmit={submitForm}/>
            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    )
});

const maxLength10 =  maxLengthCreator(10);

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field type="textarea"
                       name='postText'
                       component={Textarea}
                       placeholder='some post'
                        validate={[required, maxLength10 ]}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
};

const ReduxPostForm = reduxForm({
    form : 'post'
})(PostForm);


export default MyPosts;



