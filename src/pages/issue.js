import React, { useContext, useEffect, useState } from 'react'
import { Layout } from '../Components/Layout/layout'
import { Header, HeaderLeft, HeaderRight } from '../Components/Header'
import { Logo } from '../Components/Logo/logo'
import { LogIn } from '../Components/LogIn/login'
import { generatePath, Link, useNavigate, useParams } from 'react-router-dom'
import mapItemClient from '../clients/map'
import { DetailedView } from '../Components/DetailedView'
import { LoadingState } from '../Components/LoadingState'
import { UserContext } from '../user-contet'
import { Button } from '../Components/Button'

export const Issue = () => {
  const userContext = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  const [item, setItem] = useState(null)
  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    setIsLoading(true)
    mapItemClient.getDetailedInfo(params.id).then((item) => {
      setItem(item)
      setIsLoading(false)
    })
  }, [params.id])

  if (isLoading || !item) {
    return <LoadingState />
  }

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
        <DetailedView
          title={item.title}
          description={item.description}
          lat={item.lat}
          lng={item.lng}
        />
        {userContext.login && (
          <Button onClick={() => navigate(generatePath('/edit/:id', { id: item._id }))}>
            Редагувати
          </Button>
        )}
      </Layout>
    </>
  )
}
