import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './reducers'
import { UserInfoMethods } from './reducers/UserReducer/thunk'
import { Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import AuthPage from './pages/AuthPage/AuthPage'

const App = () => {
  const notifications = useAppSelector( state => state.notification.notificationList )
  const dispatch = useAppDispatch()

  useEffect( () => {
    console.log( notifications )
  }, [notifications] )


  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path={'/'} exact={true}>

        </Route>
        <Route path={'/auth/:mode'}>
          <AuthPage />
        </Route>
      </Switch>
    </div>
  )
}

export default App