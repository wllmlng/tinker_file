import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { postTask } from '../../actions/task_actions';
// import { fetchList } from '../../actions/list_actions';
import '../../assets/stylesheets/task.css';

const TaskForm = ({list, onChange, scrollToBottom}) => {

    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(false);
    const dispatch = useDispatch();

    //create list
    const submitTask = (e) => {
        e.preventDefault();

        let newTask = {
            list: list._id,
            task: task,
            description: description,
            status: status
        };

        
        if(task === "" || description === ''){
            alert('Task title and description are needed');
        }else{
            dispatch(postTask(newTask)).then((res) => {
                onChange(true);
                setTask('');
                setDescription('');
                scrollToBottom();

            });
        }
    }

    
    return(
        <div>
            <form onSubmit={submitTask} className='taskForm'>
                <div className='taskInputContainer'>
                    <label className='taskInput'>Task title:
                        <input type='text' value={task} onChange={e => setTask(e.target.value)} className='task_input1' />
                    </label>
                    <label className='taskInput'>Description:
                        <input type='text' value={description} onChange={e => setDescription(e.target.value)} className='task_input2' />
                    </label>
                </div>
                <div>
                    <label className="taskSubmitContainer">
                        <input type='submit' className="submitTaskButton" value='Add Task'/>
                    </label>
                </div>
            </form>
        </div>
    )
}

export default TaskForm;