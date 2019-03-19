import React from 'react'
import MenuForm from './MenuForm'
import { Button, Icon, Segment } from 'semantic-ui-react'
import axios from 'axios'

export default class Menu extends React.Component {
    state = {
        items: [],
        showItems: false,
        editing: false
    }

    componentDidMount() {
        axios.get(`/api/menus/${this.props.id}/items`)
            .then(res => {
                this.setState({ items: [res.data] })
            })
            .catch(err => {
                console.log(err)
            })
    }

    toggleShow = () => this.setState({ showItems: !this.state.showItems })

    toggleEdit = () => this.setState({ editing: !this.state.editing })

    render() {
        return (
            <Segment.Group>
                <Segment style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {
                        this.state.editing ?
                            <MenuForm {...this.props} toggleEdit={this.toggleEdit} />
                            :
                            <h1>{this.props.name}</h1>
                    }
                    <Button icon color='blue' onClick={this.toggleEdit}>
                        <Icon name='pencil' />
                    </Button>
                    <Button
                        icon
                        color='red'
                        size='tiny'
                        onClick={() => this.props.deleteMenu(this.props.id)}
                    >
                        <Icon name='trash' />
                    </Button>
                    <Button
                        icon
                        color='green'
                        size='tiny'
                        onClick={this.toggleShow}
                    >
                        <Icon name={this.state.showItems ? 'angle double up' : 'angle double down'} />
                    </Button>
                </Segment>
                <Segment>
                    {
                        this.state.showItems ?
                            <h2>{this.state.items}</h2>
                            :
                            null
                    }
                </Segment>
            </Segment.Group>
        )
    }
}