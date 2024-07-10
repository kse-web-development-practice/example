import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Layout } from '../Components/Layout/layout'
import { Header, HeaderLeft, HeaderRight } from '../Components/Header'
import { Logo } from '../Components/Logo/logo'
import { LogIn } from '../Components/LogIn/login'
import { Link, useNavigate, useParams } from 'react-router-dom'

import mapItemClient from '../clients/map'
import { UserContext } from '../user-contet'
import { AddItemForm } from '../Components/AddItemForm'
import { SuccessMessage } from '../Components/SuccessMessage'

export const Add = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRequesting, setIsRequesting] = useState(false)
  const [succesMessage, setSuccesMessage] = useState(null)

  const [item, setItem] = useState(null)
  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (!params.id) return

    setIsLoading(true)
    mapItemClient.getDetailedInfo(params.id).then((item) => {
      setItem(item)
      setIsLoading(false)
    })
  }, [params.id])

  const userContext = useContext(UserContext)

  const handleAdding = useCallback(
    (title, lat, lng, description) => {
      setIsRequesting(true)
      if (params.id) {
        mapItemClient
          .update({ _id: params.id, title, lat, lng, description })
          .then(() => {
            setSuccesMessage('Успішно оновлено!')

            setTimeout(() => {
              navigate('/')
            }, 1000)
          })
          .finally(() => setIsRequesting(false))
      } else {
        mapItemClient
          .create(title, lat, lng, description)
          .then(() => {
            setSuccesMessage('Успішно додано!')
            setIsRequesting(false)

            setTimeout(() => {
              navigate('/')
            }, 1000)
          })
          .finally(() => setIsRequesting(false))
      }
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
        {isLoading && <>Loading...</>}
        {succesMessage && <SuccessMessage message={succesMessage} />}
        <AddItemForm
          initialItem={item}
          onAdd={handleAdding}
          disabled={isRequesting || !!succesMessage}
        />
      </Layout>
    </>
  )
}

Add.propTypes = {}
