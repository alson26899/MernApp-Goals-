import React from 'react'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import { getGoals,reset } from '../features/goals/goalSlice'
import GoalItem from '../components/GoalItem'

const DashBoard = props => {
    const { user } = useSelector((state)=>state.auth);
    const { goals ,isLoading } = useSelector((state)=>state.goals);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
        dispatch(getGoals())

        return () => { dispatch(reset()) }
    },[user,navigate,dispatch])

    if(isLoading)
    {
        return (
            <Spinner/>
        )
    }

    const renderGoals = () => {
        return (
            <section className="content">
                {
                    goals.length > 0 ? 
                    (
                        <div className="goals">
                            {
                                goals.map((goal)=>{
                                    return <GoalItem key={goal._id} {...goal}/>
                                })
                            }
                        </div>
                    ) : 
                    (
                        <h3>You have not set goals yet!</h3>
                    )
                }
            </section>
        )
    }

    return (
        <>
            <section className="heading">
                Welcome {user && user.name}
            </section>
            <GoalForm/>
            {renderGoals()}
        </>
    )
}

DashBoard.propTypes = {

}

export default DashBoard
