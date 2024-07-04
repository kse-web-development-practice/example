import React, { useCallback, useContext } from 'react'
import { Layout } from '../Components/Layout/layout'
import { Header, HeaderLeft, HeaderRight } from '../Components/Header'
import { Logo } from '../Components/Logo/logo'
import { LogIn } from '../Components/LogIn/login'
import { Link } from 'react-router-dom'

import { LoginForm } from '../Components/LoginForm'
import userClient from '../clients/user'
import { UserContext } from '../user-contet'

export const Auth = () => {
  const userContext = useContext(UserContext)
  const handleAuth = useCallback(
    (login, pasword) => {
      userClient.auth(login, pasword).then((user) => {
        if (!user) {
          alert('Used does not exist')
        }
        userContext.setUser(user.login, user.token)
      })
    },
    [userContext]
  )

  return (
    <>
      <Layout>
        <Header>
          <HeaderLeft>
            <Link to={'/'}>
              <Logo />
            </Link>
          </HeaderLeft>
          <HeaderRight>
            {userContext.login ? (
              <LogIn isLogged={true} onClick={() => userContext.logout()} />
            ) : (
              <LogIn isLogged={false} />
            )}
          </HeaderRight>
        </Header>
        <br />
        <LoginForm onAuth={handleAuth} />
      </Layout>
    </>
  )
}

Auth.propTypes = {}
