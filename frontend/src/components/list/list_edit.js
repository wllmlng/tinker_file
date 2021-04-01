import React, {useState } from 'react';
import { updateList } from '../../actions/list_actions';
import { useDispatch } from 'react-redux';
import '../../assets/stylesheets/list.css';


const ListEdit = ({listId, setEditSec, setForceUpdate}) => {

    const [editInput, setEditInput] = useState('');
    const dispatch = useDispatch();

    //update list
    const submitUpdateList = () => {

        let newUpdate = {
            list: editInput
        };
        if(editInput === ""){
            alert('Please provide a title');
        }else{
            dispatch(updateList(listId, newUpdate))
            // .then((res) => {
            //     setForceUpdate(true);
            // });
        }
    }

    return(
        <div className='listUpdateContainer'>
            <div className='listIndvTitle'>
                <input type='text' value={editInput} onChange={e => setEditInput(e.target.value)} className='listUpdateInput' />
            </div>
            <div>
                <input type='submit' value='Save' className='listDeleteBtn' onClick={() => submitUpdateList()} />
                <input type='submit' value='Cancel' className='listEditBtn' onClick={()=>setEditSec('')} />
            </div>
        </div>
    )
}

export default ListEdit;