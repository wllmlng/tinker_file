import React, {useState, useEffect, useRef} from 'react';
import NavBar from '../nav/navbar';
import TaskForm from '../task/task_form';
import ListEdit from './list_edit';
import ModalContainer from '../modal/modal_container';
import '../../assets/stylesheets/list.css';

import { useSelector, useDispatch } from 'react-redux';
import { postList, fetchList, deleteList, clearLists } from '../../actions/list_actions';
import { openModal } from '../../actions/modal_actions';

const List = (props) => {

    const [list, setList] = useState('');
    const [task, setTask] = useState(false);
    const [taskModal, setTaskModal] = useState('');
    const [editSec, setEditSec] = useState('');
    const [forceUpdate,setForceUpdate] = useState(false)
    
    const allLists = useSelector(state => state.entities.lists);
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    //componentDidMount and componentDidUpdate
    useEffect(() => {
        dispatch(fetchList(currentUser.id))
        // setTask(false);
    }, []);

    //forceupdate for changes made in child component
    // useEffect(() => {
    //     dispatch(fetchList(currentUser.id));
    //     setForceUpdate(false);
    //     setEditSec('');
    // },[forceUpdate])


    // componentWillUnmount list on logout
    useEffect(() => {
        return() => {
            dispatch(clearLists());
        }
    },[]);


    //create list
    const submitList = (e) => {
        e.preventDefault();

        let newList = {
            user: currentUser.id,
            list: list
        };

        if(list === ""){
            alert('Please provide a List title');
        }else{
            dispatch(postList(newList)).then((res) => {
                setList('');
            });
        }
    }

    //deleting a list
    const removeList = (listId) => {
        dispatch(deleteList(listId));
    }


    const bottomRef = useRef();
    const scrollToBottom = () => {
    };

    //displaying task modal
    const taskModals = ( task ) => {
        setTaskModal(task);
        dispatch(openModal('task'))
    }


    //displaying list edit option
    const listEditSec = ( list ) => {
        setEditSec(list._id)
    }

    return(
        <div className='listContainer'>
            <NavBar />
            <ModalContainer task={taskModal}/>
            <div>
                <form onSubmit={submitList} className='listForm'>
                    <div>
                        <label className='listInput'>
                            Add a List:
                            <input type='text' value={list} onChange={e => setList(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label className="ques_button_err">
                            <input type='submit' className="submit-question-button" value='Save' />
                        </label>
                    </div>
                </form>



            </div>
            {allLists.length ? 
                <div>
                    <ul className='allListContainer'>
                        {allLists.map((list) => (
                            <li key={list._id} className='listContainer'>
                                <div className='listItem'>
                                    <div className='listHeadContainer'>
                                        <div>
                                            {editSec === list._id ? 
                                                <div>
                                                    <ListEdit listId={editSec} setEditSec={setEditSec} setForceUpdate={setForceUpdate}/>
                                                </div>
                                            :
                                            <div className='listAndBtn'>
                                                <div className='listIndvTitle'>
                                                    {list.list}
                                                </div>
                                                <div className='listBtn'>
                                                    <div>
                                                        <input type='submit' value='Edit' className='listEditBtn' onClick={() => listEditSec(list)} />
                                                        <input type='submit' value='Delete' className='listDeleteBtn' onClick={() => removeList(list._id)} />
                                                    </div>
                                                </div>
                                            </div>
                                            }
                                        </div>

                                    </div>

                                    <div className='taskContainer' ref={bottomRef}>
                                        {list.tasks.length ? 
                                            <div>
                                                {list.tasks.map((task) => {
                                                    return (
                                                        <div key={task._id} className='taskIndvTitle'>
                                                            <div onClick={() => taskModals(task)} className='listIndivid'>
                                                                <div className='actualTitle'>
                                                                    {task.task}
                                                                </div>
                                                                <div className='taskDeleteSec'>
                                                                    <div>
                                                                        {task.status ? <div className='finish'> &#10003; </div> : <div className='unfinish'>&#10007;</div>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div ref={bottomRef} className="list-bottom"></div> */}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        :
                                            <div></div>
                                        }
                                    </div>
                                </div>
                                
                                <div>
                                    <TaskForm list={list} currentUser={currentUser} onChange={setTask} scrollToBottom={scrollToBottom}/>
                                </div>

                            </li>
                        ))} 
                    </ul>
                </div>
                
            :
                <div>yo</div>
            }


        </div>
    )
}

export default List;