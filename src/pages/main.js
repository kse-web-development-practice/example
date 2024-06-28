import React from 'react'
import { Layout } from '../Components/Layout/layout'
import { Header, HeaderLeft, HeaderRight } from '../Components/Header'
import { Logo } from '../Components/Logo/logo'
import { Counter } from '../Components/Counter/counter'
import { LogIn } from '../Components/LogIn/login'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import { Tab, TabContainer } from '../Components/TabContainer'
import { MapView } from '../view/mapView'
import { ListView } from '../view/listView'

export const Main = ({ filter }) => {
  const params = useParams()
  return (
    <>
      <Layout>
        <Header>
          <HeaderLeft>
            <Link to={'/'}>
              <Logo />
            </Link>
            <Link to={'/'}>
              <Counter active={filter === 'total'} type="total" value={10} />
            </Link>
            <Link to={'/closed'}>
              <Counter active={filter === 'done'} type="done" value={3} />
            </Link>
          </HeaderLeft>
          <HeaderRight>
            <LogIn isLogged={false} />
          </HeaderRight>
        </Header>
        <br />
        <TabContainer
          tabNames={['Мапа', 'Список']}
          initialTabName={params.page ? 'Список' : 'Мапа'}
          renderTab={(key, onChange, isActive) => (
            <Tab title={key} isActive={isActive} tabKey={key} onTab={onChange} />
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
