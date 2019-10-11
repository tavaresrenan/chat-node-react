import React, { Component } from 'react'
import Input from './Input'
import Mensagem from './Mensagem'

const URL = 'ws://localhost:3030'

class Chat extends Component {
  state = {
    name: 'Renan',
    messages: [],
  }

  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data)
      this.addMessage(message)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }))

  submitMessage = messageString => {
    const message = { nome: this.state.nome, message: messageString }
    this.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }

  render() {
    return (
            <div>
            <label htmlFor="nome">
          Nome: 
            <input type="text"
                   id={'nome'}
                   placeholder={'Nome...'}
                   value={this.state.nome}
                   onChange={e => this.setState({ nome: e.target.value })}
          />
        </label>
                <Input ws={this.ws}
                           onSubmitMessage={messageString =>
                    this.submitMessage(messageString)}
                    />
                    {this.state.messages.map((message, index) =>
                      <Mensagem key={index} message={message.message} name={message.nome} />,
                    )}
                    </div>
                )}
        }

export default Chat