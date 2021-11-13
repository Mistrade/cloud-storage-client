import React from 'react'
import style from './style.module.sass'
import { HeaderProps } from './types'
import { useAppDispatch, useAppSelector } from '../../reducers'
import { Link } from 'react-router-dom'
import { Button } from '../Button'
import { UserInfoMethods } from '../../reducers/UserReducer/thunk'


export const Header: React.FC<HeaderProps> = () => {
  const isAuth = useAppSelector( state => state.userInfo.isAuth )
  const dispatch = useAppDispatch()
  return (
    <header className={style.header}>
      {isAuth ? (
        <>
          <Button type={'main'} text={'Выйти'} htmlType={'button'}
                  onClick={() => dispatch( UserInfoMethods.logout( '' ) )}/>
        </>
      ) : (
        <>
          <Link className={style.headerLink} to={'/auth/login'}>
            Вход в систему
          </Link>
        </>
      )}
    </header>
  )
}