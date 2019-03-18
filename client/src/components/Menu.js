import React from 'react'
import MenuForm from './MenuForm'
import {Button, Icon, Segment} from 'semantic-ui-react'

export default class Menu extends React.Component {
    state = { 
        items: [], 
        showItems: false,
        editing: false 
    }

    toggleEdit = () => this.setState({ editing: !this.state.editing })

    render() {
        return (
            <Segment style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                {
                    this.state.editing ?
                        <MenuForm {...this.props } toggleEdit={this.toggleEdit} />
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
            </Segment>
        )
    }
}