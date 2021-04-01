import React, {useState } from 'react';
import { useDispatch } from 'react-redux';
import { postComment } from '../../actions/task_actions';

const Comment = ({task}) => {

    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    //create list
    const submitComment = (e) => {
        e.preventDefault();

        let newComment = {
            comment: comment,     
        };
        
        if(comment === ""){
            alert("Note can't be blank");
        }else{
            dispatch(postComment(task._id, newComment)).then((res) => {
                setComment('');
            });
        }
    }
    
    return(
        <div>
            <form onSubmit={submitComment} className='taskForm'>
                <div className='taskInputContainer'>
                    <label className='taskInput'>Add a note:
                        <input type='text' value={comment} onChange={e => setComment(e.target.value)} className='task_input_comment' />
                    </label>
                </div>
                <div>
                    <label className="taskSubmitContainer">
                        <input type='submit' className="submitTaskButton" value='Add Node'/>
                    </label>
                </div>
            </form>
        </div>
    )
}

export default Comment;