import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

const GoalItem = ({text,createdAt,_id}) => {
    const dispatch = useDispatch();
    return (
        <div className='goal'>
            <div>
                {new Date(createdAt).toLocaleString('en-IN')}
            </div>
            <h2>{text}</h2>
            <button className='close' onClick={()=> dispatch(deleteGoal(_id))}>X</button>
        </div>
    )
}

export default GoalItem
