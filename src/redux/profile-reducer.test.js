import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
import React from "react";

let state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
}

it('length post should be incremented', () => {
    // 1. test data
    let actions = addPostActionCreator('something.test.com')

    // 2. actions

    let newState = profileReducer(state,actions)
    //3. expectations
    expect(newState.posts.length).toBe(5)
});
it('after deleting length of messages should be decrement', () => {
    // 1. test data
   let actions = deletePost(1);

   let newState = profileReducer(state,actions)

    expect(newState.posts.length).toBe(4)
});