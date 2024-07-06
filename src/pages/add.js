import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Layout } from '../Components/Layout/layout'
import { Header, HeaderLeft, HeaderRight } from '../Components/Header'
import { Logo } from '../Components/Logo/logo'
import { LogIn } from '../Components/LogIn/login'
import { Link, useParams } from 'react-router-dom'

import mapItemClient from '../clients/map'
import { UserContext } from '../user-contet'
import { AddItemForm } from '../Components/AddItemForm'

export const Add = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [item, setItem] = useState(null)
  const params = useParams()
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
    (title, lat, lng) => {
      if (params.id) {
        mapItemClient.update({ _id: params.id, title, lat, lng }).then(() => {
          alert('updated successfully')
        })
      } else {
        mapItemClient.create(title, lat, lng).then(() => {
          alert('created')
        })
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
              <LogIn isLogged={false} onClick={() => (location.href = '/auth')} />
            )}
          </HeaderRight>
        </Header>
        <br />
        {isLoading && <>Loading...</>}
        <AddItemForm initialItem={item} onAdd={handleAdding} />
      </Layout>
    </>
  )
}

Add.propTypes = {}
