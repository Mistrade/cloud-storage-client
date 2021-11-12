import React from 'react'
import style from './style.module.sass'
import { HeaderProps } from './types'
import { useAppSelector } from '../../reducers'
import { Link } from 'react-router-dom'


export const Header: React.FC<HeaderProps> = () => {
  const isAuth = useAppSelector(state => state.userInfo.isAuth)

  return (
    <header className={style.header}>
      {isAuth ? (
        <>

        </>
      ) : (
        <>
          <Link className={style.headerLink} to={'/auth'}>
            Вход в систему
          </Link>
        </>
      )}
    </header>
  )
}