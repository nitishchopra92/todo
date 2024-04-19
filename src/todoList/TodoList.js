import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGroup, fetchTodoData, deleteGroup } from './actions';

function TodoList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodoData());
    }, [dispatch]);

    const todoData = useSelector(state => state.completionStatus);
    const groups = useSelector(state => state.groups);

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [error, setError] = useState('');
    const [showStatus, setShowStatus] = useState(false);

    const validateNewGroup = (newFrom) => {
        if (groups.length === 0) {
            return newFrom === 1;
        } else {
            const lastGroup = groups[groups.length - 1];
            const expectedFrom = lastGroup.to + 1;
            return newFrom === expectedFrom;
        }
    };

    const handleAddGroup = () => {
        const newFrom = parseInt(from, 10);
        const newTo = parseInt(to, 10);

        if (isNaN(newFrom) || isNaN(newTo)) {
            setError('Please enter valid numbers in both "from" and "to" fields.');
            return;
        }

        if (groups.length === 0 && newFrom === 0) {
            setError('Value must start with number 1 when there are no groups.');
            return;
        }

        if (newTo <= newFrom) {
            setError('"To" value must be greater than "From" value.');
            return;
        }

        if (validateNewGroup(newFrom)) {
            dispatch(addGroup(newFrom, newTo));
            setFrom('');
            setTo('');
            setError('');
        } else {
            setError(`The new group must start with ${groups[groups.length - 1].to + 1}.`);
        }
    };

    const handleShowStatus = () => {
        setShowStatus(true);
    };

    const handleHideStatus = () => {
        setShowStatus(false);
    };

    const filterItemsInGroup = (group) => {
        const { from, to } = group;
        
        if (!Array.isArray(todoData)) {
            console.error('todoData is not an array');
            return [];
        }
        return todoData.filter(item => item.id >= from && item.id <= to);
    };

    const calculateGroupCompletionStatus = (group) => {
        const itemsInGroup = filterItemsInGroup(group);
        const completedItems = itemsInGroup.filter(item => item.completed).length;
        const totalItems = itemsInGroup.length;
        return `${completedItems} out of ${totalItems} completed`;
    };

    return (
        <div className='inner-page'>
            <div className='container'>
                <h1>New Task - To-Do List</h1>
                <div className='form-wrapper'>
                    <div className='form-row'>
                        <div className='form-col'>
                            <label>From</label>
                            <input type="number" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Enter Start Value" />
                        </div>
                        <div className='form-col'>
                            <label>To</label>
                            <input type="number" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Enter End Value" />
                        </div>
                        <div className='form-col'>
                            <button className='btn' onClick={handleAddGroup}>Add Group</button>
                        </div>
                    </div>
                    {error && <div className='error-msg'>{error}</div>}
                    
                </div>
                
                <div className='group-items'>
                    {groups.map((group, index) => (
                        <div key={index} className="item">
                            <div className='col'>
                                Group ID<span>{index + 1}</span>
                            </div>
                            <div className='col'>
                                Range<span>{group.from} To {group.to}</span>
                            </div>
                            <div className='col'>
                                Status
                                <div className='status'>
                                    {showStatus ? (
                                        <>
                                            {filterItemsInGroup(group).map(item => (
                                                <>
                                                    <span>{item.id} - {item.completed ? 'true' : 'false'}</span>
                                                </>
                                            ))}
                                        </>
                                    ) : (
                                        <><span className='blank'>Click status button to check status</span></>
                                    )}
                                    
                                </div>
                            </div>
                            <div className='col close'>
                                <button onClick={() => dispatch(deleteGroup(group.id))} className="btn-close">
                                    <img src="/close.webp" alt="close" />
                                    Delete Group</button>
                            </div>
                        </div>
                    ))}
                </div>


                {groups.length > 0 && (
                    <>
                        <div className='show-status'>
                            <button onClick={handleShowStatus} className="btn">Show Status</button>
                            <button onClick={handleHideStatus} className="btn">Hide Status</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default TodoList;
