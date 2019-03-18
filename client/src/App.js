import React from 'react'
import './App.css'
import MenuList from './components/MenuList'
import MenuForm from './components/MenuForm'
import { Container } from 'semantic-ui-react'
import axios from 'axios'

export default class App extends React.Component {
  state = { menus: [], }

  componentDidMount() {
    axios.get('/api/menus')
      .then( res => {
        this.setState({ menus: res.data })
      })
      .catch( err => {
        console.log(err)
      })
  }

  addMenu = (name) => {
    axios.post('/api/menus', { name })
      .then( res => {
        const { menus } = this.state
        this.setState({ menus: [...menus, res.data] })
      })
  }

  deleteMenu = (id) => {
    axios.delete(`/api/menus/${id}`)
      .then( res=> {
        const { menus } = this.state
        this.setState({ menus: menus.filter(m => m.id !== id) })
      })
  }

  editMenu = (menuData) => {
    const menus = this.state.menus.map( menu => {
      if (menu.id === menuData.id)
        return menuData
      return menu
    })
    this.setState({ menus })
  }

  render() {
    return (
      <Container>
        <MenuForm addMenu={this.addMenu} editMenu={this.editMenu} />
        <MenuList menus={this.state.menus} deleteMenu={this.deleteMenu} editMenu={this.editMenu} />
      </Container>
    );
  }
}

