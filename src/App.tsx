import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './reducers'
import { UserInfoMethods } from './reducers/UserReducer/thunk'
import { Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import AuthPage from './pages/AuthPage/AuthPage'
import { Preloader } from './components/Preloader'

const App = () => {
  const notifications = useAppSelector( state => state.notification.notificationList )
  const loader = useAppSelector( state => state.config.loader )
  const userInfo = useAppSelector( state => state.userInfo )
  const dispatch = useAppDispatch()

  useEffect( () => {
    console.log( notifications )
  }, [notifications] )

  useEffect( () => {
    dispatch( UserInfoMethods.checkSession( {
      email: 'liza.zhukova.112001@mail.ru',
      password: '12345678'
    } ) )
  }, [] )

  return (
    <div className="App">
      {loader.isActive ? (
        <Preloader message={loader.message || 'Загрузка данных...'}/>
      ) : <></>}
      <Header/>
      <Switch>
        <Route path={'/'} exact={true}>

        </Route>
        <Route path={'/auth/:mode'}>
          <AuthPage/>
        </Route>
        <Route path={'/work-space'} exact={true}>
          <h1>
            Рабочее пространство
          </h1>
        </Route>
        <Route path={'/storage'}>

        </Route>
        <Route path={'*'}>
          <h1>
            Страница не найдена!
          </h1>
        </Route>
      </Switch>
    </div>
  )
}

export default App