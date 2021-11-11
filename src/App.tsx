import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './reducers'
import { UserInfoMethods } from './reducers/UserReducer'

function App() {
  const notifications = useAppSelector(state => state.notification.notificationList)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(UserInfoMethods.registration({
      email: 'djnsfabhvfsabfk;saljkh',
      password: '81267459628',
      confirmPassword: '492186795468'
    }))
  }, [dispatch])

  useEffect(() => {
    console.log(notifications)
  }, [notifications])


  return (
    <div className="App">
      Its my cloud storage
    </div>
  );
}

export default App;