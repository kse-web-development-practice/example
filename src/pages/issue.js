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
import styles from './styles.module.css'
import { ErrorMessage } from '../Components/ErrorMessage'
import { Counters } from './parts/Counters'

export const Issue = () => {
  const userContext = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
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

  const markAsDone = () => {
    setIsLoading(true)
    mapItemClient
      .update({
        _id: params.id,
        isDone: true
      })
      .then((item) => {
        setItem(item)
        setIsLoading(false)
      })
      .catch(() => {
        setError('Не вдалось оновити запис')
      })
  }

  return (
    <>
      <Layout>
        <Header>
          <HeaderLeft>
            <Link to={'/'}>
              <Logo />
            </Link>
            <Counters />
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
          isDone={item.isDone}
        />
        {userContext.login && (
          <>
            <div className={styles.buttonRow}>
              <Button onClick={() => navigate(generatePath('/edit/:id', { id: item._id }))}>
                Редагувати
              </Button>
            </div>
            <div className={styles.buttonRow}>
              <Button onClick={() => markAsDone(params.id)}>Помітити як виконане</Button>
            </div>
            {error && <ErrorMessage errorMessage={error}></ErrorMessage>}
          </>
        )}
      </Layout>
    </>
  )
}
