import React, { Component } from 'react';

import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Col } from 'react-bootstrap';

const placeHolderDict = {
  'movies/find': ['name','year', 'Search'],
  'quotes/find': ['movie', '', 'Search'],
  'quotes': ['limit', '', 'Search'],
  'movies/create':['name','year', 'Add'],
  'quotes/create':['quote','movie', 'Add']
};
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {action: 'movies/find', twoInputs: true};
  }
  onSubmit = (e) => {
    if(e) e.preventDefault();
    const input1 = this.refs.input1.value;
    var input2 = '';
    const key1 = placeHolderDict[this.state.action][0];
    var key2 = '';
    var obj = {}
    obj[key1] = input1

    if (this.refs.input2){
      input2 = this.refs.input2.value;
      key2 = placeHolderDict[this.state.action][1];
      obj[key2] = input2;
    }

    fetch('https://bhfv7s8zka.execute-api.us-east-1.amazonaws.com/alpha/'+this.state.action, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    }).then(res => res.json())
      .then((result) => { this.props.onResponse(result) })
      .catch((error) => {
     console.error(error);
   });
  };
  render() {
    const formInput = (
      <Form inline onSubmit={this.onSubmit}>
        {this.state.twoInputs ?
          <Form.Row>
            <Col>
              <Form.Control ref='input1' placeholder={placeHolderDict[this.state.action][0]} />
            </Col>
            <Col>
              <Form.Control ref='input2' placeholder={placeHolderDict[this.state.action][1]} />
            </Col>
          </Form.Row> :
          <FormControl ref='input1' type="text" placeholder={placeHolderDict[this.state.action][0]} className="mr-sm-2" />}
        <Button variant="primary" type="submit">{placeHolderDict[this.state.action][2]}</Button>
      </Form>
    );
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Movies and Quotes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title={this.state.action} id="basic-nav-dropdown">
                <NavDropdown.Item onSelect={() => { this.setState({action: 'movies/find', twoInputs: true}) }} href="#action/find/movie">Find Movies</NavDropdown.Item>
                <NavDropdown.Item onSelect={() => { this.setState({action: 'quotes/find', twoInputs: false}) }} href="#action/find/quotes">Find Quotes by Movie</NavDropdown.Item>
                <NavDropdown.Item onSelect={() => { this.setState({action: 'quotes', twoInputs: false}) }} href="#action/random/quotes">Get Random Quotes</NavDropdown.Item>
                <NavDropdown.Item onSelect={() => { this.setState({action: 'movies/create', twoInputs: true}) }} href="#action/add/movie">Add a Movie</NavDropdown.Item>
                <NavDropdown.Item onSelect={() => { this.setState({action: 'quotes/create', twoInputs: true}) }} href="#action/add/quote">Add a Quote</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {formInput}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
