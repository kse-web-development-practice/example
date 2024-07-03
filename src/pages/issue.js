import React, { useEffect, useState } from 'react'
import { Layout } from '../Components/Layout/layout'
import { Header, HeaderLeft, HeaderRight } from '../Components/Header'
import { Logo } from '../Components/Logo/logo'
import { LogIn } from '../Components/LogIn/login'
import { Link, useParams } from 'react-router-dom'
import mapItemClient from '../clients/map'
import { DetailedView } from '../Components/DetailedView'
import { LoadingState } from '../Components/LoadingState'

export const Issue = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [item, setItem] = useState(null)
  const params = useParams()
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
            <LogIn isLogged={false} />
          </HeaderRight>
        </Header>
        <br />
        <DetailedView
          title={item.title}
          description={item.description}
          lat={item.lat}
          lng={item.lng}
        />
      </Layout>
    </>
  )
}
