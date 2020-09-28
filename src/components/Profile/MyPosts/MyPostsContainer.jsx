import React from 'react';
import {addPostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {reset} from "redux-form";
import {getNewPostText, getPosts} from "../../../redux/users-selectorst";

const mapStateToProps = (state) => {
    return {
        posts: getPosts(state),
        newPostText: getNewPostText(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (post) => {
            dispatch(addPostActionCreator(post));
        },
        resetPostForm: (formName) =>{
            dispatch(reset(formName));
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;