import Comment from '../comment/comment';
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask, fetchTask, deleteComment, deleteTask, clearComments } from '../../actions/task_actions';
import { fetchList } from '../../actions/list_actions';
import { closeModal } from '../../actions/modal_actions';
import CommentEdit from '../comment/comment_edit';
import '../../assets/stylesheets/task.scss';

const Task = ({task}) => {

    const [taskStatus, setTaskStatus] = useState(true);
    const [commentUpdate, setCommentUpdate] = useState('');
    const [forceUpdate,setForceUpdate] = useState(false)

    const currentUser = useSelector(state => state.entities.currentUser);
    const stateComments = useSelector(state => state.entities.tasks.comments);
    const dispatch = useDispatch();

    //initialize state with boolean from prop. Task component will take over from there.
    //fetches task information
    useEffect(() => {
        setTaskStatus(task.status);
        dispatch(fetchTask(task._id));
    },[])

    useEffect(() => {
        dispatch(fetchTask(task._id));
        setForceUpdate(false);
        setCommentUpdate('');
    },[forceUpdate])


    useEffect(() => {
        return() => {
            dispatch(clearComments());
        }
    },[])

    //toggles task status boolean
    const statusToggle = () => {
        let updateStatus;

        if (task.status === true){
            updateStatus = false
        } else {
            updateStatus = true
        };

        let newUpdate = {
            status: `${updateStatus}`
        };

        dispatch(updateTask(task._id, newUpdate)).then(() => {
            setTaskStatus(updateStatus);
            dispatch(fetchList(currentUser.id));
        });
    }

    //delete comment on buttton click
    const handleCommentDel = (commentId) => {
        dispatch(deleteComment(task._id, commentId)).then(() => {
            dispatch(fetchTask(task._id))
        })
    }

    //delete task on buttton click
    
    const handleTaskDel = (taskId) => {
        dispatch(deleteTask(taskId)).then(() => {
            dispatch(fetchList(currentUser.id));
            dispatch(closeModal());
        })
    }
    

    return(
        <div>
            <div className='taskTitleContainer'>
                <h1 className='taskTitleh1'>{task.task}</h1>
            </div>
            <div className='taskDeleteContainer'>
                <button type='submit' className='taskDeleteBtn' onClick={()=>(handleTaskDel(task._id))}>Delete</button>
            </div>
            <div className='descriptStatusContainer'>
                <div className="descriptionContainer">
                    <label>Description:</label>
                    <div className='descriptionInfo'>
                        {task.description}
                    </div>
                </div>
                <div className='toggleContainer'>
                    <div>
                        <button type='submit' onClick={() => statusToggle()} className='doneButton' >
                            {taskStatus ? 'Reopen' : 'Mark as Done'}
                        </button>
                    </div>
                    <div className='taskHeaderSec'>
                        {taskStatus ? <div className='finish'>Done &#10003; </div> : <div className='unfinish'>In progress &#10007;</div>}
                    </div>
                </div>
            </div>
            <div className='notesContainer'>
                <h1>Notes:</h1>
                <ul>
                {stateComments?.map((comment) => {
                    return(
                        <div key={comment._id} className='individualCommentContainer'>
                            {commentUpdate === comment._id ? 
                                <div>
                                    <CommentEdit commentObj={comment} taskObj={task} setForceUpdate={setForceUpdate}/>
                                </div>
                            
                            :
                                <div className='list'>
                                    {comment.comment}
                                </div>
                            }
                            <div className='commentBtnContainer'>
                                {commentUpdate !== comment._id ?
                                    <div>
                                        <button type='submit' onClick={() => setCommentUpdate(comment._id)}>Update</button>
                                    </div>
                                :
                                    <div>
                                        <button type='submit' onClick={() => setCommentUpdate('')}>Cancel</button>
                                    </div>
                                }
                                <div>
                                    <button type='submit' onClick={() => handleCommentDel(comment._id)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                </ul>
            </div>
            <Comment task={task} />
        </div>
    )
}

export default Task;