import React from 'react'
import PropTypes from 'prop-types'
import tabStyles from './tab.module.css'
import tabBodyStyles from './tabBody.module.css'
import containerStyles from './container.module.css'
import classnames from 'classnames'

export const TabContainer = ({ tabNames, renderTab, renderBody, initialTabName }) => {
  const [activeTab, setActiveTab] = React.useState(initialTabName ?? tabNames[0])
  const onTabChange = (key) => {
    setActiveTab(key)
  }

  return (
    <div className={containerStyles.container}>
      <ul className={containerStyles.tabList}>
        {tabNames.map((name) => {
          const isActive = activeTab === name
          return renderTab(name, onTabChange, isActive)
        })}
      </ul>
      <TabBody>{renderBody(activeTab)}</TabBody>
    </div>
  )
}

TabContainer.propTypes = {
  tabNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  renderTab: PropTypes.func.isRequired,
  renderBody: PropTypes.func.isRequired,
  initialTabName: PropTypes.string
}

TabContainer.defaultProps = {
  tabNames: ['Tab1', 'Tab2'],
  renderTab: (name, callback, isActive) => (
    <Tab title={name} tabKey={name} onTab={callback} isActive={isActive} />
  ),
  renderBody: (activeTab) => (
    <>
      {activeTab === 'Tab1' && <div>Tab 1 is active</div>}
      {activeTab === 'Tab2' && <div>Tab 2 is active</div>}
    </>
  ),
  initialTabName: null
}

export const Tab = ({ title, isActive, onTab, tabKey }) => {
  const onClick = () => {
    onTab(tabKey)
  }
  return (
    <li
      className={classnames(tabStyles.tab, {
        [tabStyles.tabActive]: isActive
      })}
    >
      <button onClick={onClick}>{title}</button>
    </li>
  )
}

Tab.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onTab: PropTypes.func.isRequired,
  tabKey: PropTypes.string.isRequired
}

Tab.defaultProps = {
  title: 'Tab1',
  isActive: false
}

export const TabBody = ({ children }) => {
  return <div className={tabBodyStyles.body}>{children}</div>
}

TabBody.propTypes = {
  children: PropTypes.node.isRequired
}
