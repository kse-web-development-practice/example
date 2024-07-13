import React, { useContext } from 'react'
import { Layout } from '../Components/Layout/layout'
import { Header, HeaderLeft, HeaderRight } from '../Components/Header'
import { Logo } from '../Components/Logo/logo'
import { LogIn } from '../Components/LogIn/login'
import PropTypes from 'prop-types'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Tab, TabContainer } from '../Components/TabContainer'
import { MapView } from '../view/mapView'
import { ListView } from '../view/listView'
import { UserContext } from '../user-contet'
import { Button } from '../Components/Button'
import { Counters } from './parts/Counters'

export const Main = ({ filter }) => {
  const userContext = useContext(UserContext)
  const params = useParams()
  const navigate = useNavigate()

  return (
    <>
      <Layout>
        <Header>
          <HeaderLeft>
            <Link to={'/'}>
              <Logo />
            </Link>
            <Counters filter={filter} />
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
