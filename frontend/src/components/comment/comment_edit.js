// import React, {useState } from 'react';
// import { updateComment } from '../../actions/task_actions';
// import { useDispatch } from 'react-redux';
// import '../../assets/stylesheets/task.scss';


// const CommentEdit = ({commentObj, taskObj, setForceUpdate}) => {

//     const [newComment, setNewComment] = useState('');
//     const dispatch = useDispatch();

//     //update comment
//     const submitUpdateComment = () => {

//         let newUpdate = {
//             comment: newComment
//         };


//         if(newComment === ""){
//             alert("Update can't be blank");
//         }else{
//             dispatch(updateComment(taskObj._id, commentObj._id, newUpdate)).then((res) => {
//                 setNewComment('');
//                 setForceUpdate(true);
//             });
//         }
//     }

//     //update comment on buttton click

//     return(
//         <div className='commentEditContainer'>
//             <div>
//                 <input type='text' placeholder='add a note...' value={newComment} onChange={e => setNewComment(e.target.value)} className='commentInputSec'/>
//             </div>        
//             <div>
//                 <input type='submit' value='Save' onClick={()=>submitUpdateComment()} />
//             </div>
//         </div>
//     )
// }

// export default CommentEdit;