import React, { useEffect, useState } from 'react'
import style from './style.module.sass'
import { MainInput } from '../../components/Inputs/MainInput'
import { RegistrationSection } from './Registration'
import { RouteComponentProps, useHistory, withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { Wrapper } from '../../components/Wrapper'

export type AuthType = 'login' | 'registration' | 'forgot-password'

const AuthPage: React.FC<RouteComponentProps<{ mode: AuthType }>> = ( { match } ) => {
  const [mode, setMode] = useState<AuthType>( match.params.mode)
  const history = useHistory()

  useEffect( () => {
    history.push( '/auth/' + mode )
  }, [mode] )

  return (
    <Wrapper justifyBody={'center'} sectionStyle={{ marginTop: '10vh' }}>
      <Switch>
        <Route path={'/auth/registration'} exact={true}>
          <RegistrationSection formTitle={'Регистрация пользователя'}/>
        </Route>
        <Route path={'/auth/forgot-password'} exact={true}>

        </Route>
        <Route path={'/auth'} exact={true}>

        </Route>
      </Switch>
    </Wrapper>
  )
}

export default withRouter(AuthPage)