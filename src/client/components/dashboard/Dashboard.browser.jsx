import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'

export default class Dashboard extends Component {
  static propTypes = {
    open: PropTypes.bool,
    children: PropTypes.node,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props, context) {
    console.log('dash', props)
    super(props, context)
    this.state = { open: false }
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  logout = () => {
    this.context.router.push('/login')
  }

  render() {
    return (
      <main className="app">
        <AppBar
          title="Note de Frais"
          iconElementLeft={<IconButton><NavigationMenu /></IconButton>}
          onTitleTouchTap={this.handleToggle}
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        { this.props.children }
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <MenuItem onTouchTap={this.logout}>
            Logout
          </MenuItem>
          <Link	to="/">
            <MenuItem onTouchTap={this.handleClose}>
              Home
            </MenuItem>
          </Link>
          <Link	to="/note">
            <MenuItem onTouchTap={this.handleClose}>
              Notes
            </MenuItem>
          </Link>
        </Drawer>
      </main>
    )
  }
}
