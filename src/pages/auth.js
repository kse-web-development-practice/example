import React, { useCallback, useContext, useState } from 'react'
import { Layout } from '../Components/Layout/layout'
import { Header, HeaderLeft, HeaderRight } from '../Components/Header'
import { Logo } from '../Components/Logo/logo'
import { LogIn } from '../Components/LogIn/login'
import { Link, useNavigate } from 'react-router-dom'

import { LoginForm } from '../Components/LoginForm'
import userClient from '../clients/user'
import { UserContext } from '../user-contet'

export const Auth = () => {
  const userContext = useContext(UserContext)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const handleAuth = useCallback(
    (login, pasword) => {
      userClient.auth(login, pasword).then((user) => {
        if (!user) {
          setError('Used does not exist')
          return
        }
        setError(null)
        userContext.setUser(user.login, user.token)
        navigate('/')
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
              <LogIn isLogged={false} onClick={() => navigate('/auth')} />
            )}
          </HeaderRight>
        </Header>
        <br />
        <LoginForm onAuth={handleAuth} error={error} />
      </Layout>
    </>
  )
}

Auth.propTypes = {}
