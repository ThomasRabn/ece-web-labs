import React from 'react';
import ReactDOM from 'react-dom';

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class SendMessage extends React.Component {

    // Constructor of the printing
    constructor(props) {
        // We call the super (constructor of React.Component)
        super(props); 
        // We save the value of the current message, and an array of messages
        this.state = {value: '', messages: []};
        // Necessary in order to use 'this' in the callback (https://reactjs.org/docs/handling-events.html)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // What to do when there is a submit
    handleSubmit(event) {
        // Prevent the submit to do its default action
        event.preventDefault();
        // If the message is not empty, we add it in the array of messages
        if(this.state.value.length !== 0) {
            this.setState(state => {
                const messages = state.messages.concat(state.value);
                return {
                    messages,
                    value: '',
                };
            });
        }
    }

    // What to do when there is a change (To have a working printing on screen)
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    // We print the messages on the screen
    /*renderSentMessages() {
        
        const listMessages = this.state.messages.map((messages, i) =>
            <li key={"message"+i++}>{messages}</li>
        );
        return (<ul>{listMessages}</ul>);
    }*/

    // Render the form and the sent messages
    render() {
        return (
            <Col id="main" className="justify-content-center">
                <h3 id="title" className="text-center">Your message: </h3>
                <form onSubmit={this.handleSubmit} className="send-message text-center">
                    <textarea type="text" id="textMessage" name="message" value={this.state.value} onChange={this.handleChange}/>
                    <Button variant="dark" type="submit" value="Submit" id="btn">Submit</Button>
                </form>
                <ProductTable product={this.state.messages}/>
            </Col>
        );
    }
}

class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product;
        
        return (
            <tr>
                <td>{name}</td>
            </tr>
        );
    }
}
    
class ProductTable extends React.Component {
    render() {
        var i = 0;
        const rows = [];
    
        this.props.product.forEach((product) => {
            rows.push(
                <ProductRow product={product} key={"message"+i++} />
            );
        });
    
        return (
            <table>
                <thead>
                    <tr>
                        <th id="subtitle">Former messages</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

ReactDOM.render(
    <div>
        <SendMessage />
    </div>,
    
    document.getElementById('root')
);