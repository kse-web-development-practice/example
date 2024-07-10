import React, { useContext, useEffect, useState } from 'react'
import { Layout } from '../Components/Layout/layout'
import { Header, HeaderLeft, HeaderRight } from '../Components/Header'
import { Logo } from '../Components/Logo/logo'
import { Counter } from '../Components/Counter/counter'
import { LogIn } from '../Components/LogIn/login'
import PropTypes from 'prop-types'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Tab, TabContainer } from '../Components/TabContainer'
import { MapView } from '../view/mapView'
import { ListView } from '../view/listView'
import mapItemClient from '../clients/map/index'
import { UserContext } from '../user-contet'
import { Button } from '../Components/Button'

export const Main = ({ filter }) => {
  const userContext = useContext(UserContext)
  const params = useParams()
  const navigate = useNavigate()
  const [stat, setStat] = useState({
    total: 0,
    done: 0
  })

  useEffect(() => {
    mapItemClient.getStat().then((stat) => {
      const total =
        stat['true']['COUNT isDone'] +
        stat['false']['COUNT isDone'] +
        stat['undefined']['COUNT isDone']
      const done = stat['true']['COUNT isDone']

      setStat({
        total,
        done
      })
    })
  }, [])

  return (
    <>
      <Layout>
        <Header>
          <HeaderLeft>
            <Link to={'/'}>
              <Logo />
            </Link>
            <Link to={'/'}>
              <Counter active={filter === 'total'} type="total" value={stat.total} />
            </Link>
            <Link to={'/closed'}>
              <Counter active={filter === 'done'} type="done" value={stat.done} />
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
        {userContext.login && <Button onClick={() => navigate('/add')}>Додати</Button>}
        <TabContainer
          tabNames={['Мапа', 'Список']}
          initialTabName={params.page ? 'Список' : 'Мапа'}
          renderTab={(key, onChange, isActive) => (
            <Tab key={key} title={key} isActive={isActive} tabKey={key} onTab={onChange} />
          )}
          renderBody={(activeTab) => {
            return <>{getTabContent(activeTab)}</>
          }}
        />
      </Layout>
    </>
  )
}

function getTabContent(activeTab) {
  switch (activeTab) {
    case 'Мапа':
      return <MapView />

    default:
      return <ListView />
  }
}

Main.propTypes = {
  filter: PropTypes.oneOf(['total', 'done']).isRequired
}
