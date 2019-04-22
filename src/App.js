import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import NavBar from './components/NavBar.js';
import Table from 'react-bootstrap/Table'

import ReactTable from "react-table";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [{'Try': 'Searching'}]
    }
  }
  onResponse = (resp) => {
    this.setState({results: resp});
  }

  render() {
    const data = this.state.results
    const columns = (data.length && Object.keys(this.state.results[0]).map((key, id) => {
      return {Header: key, accessor: key}
    }))
    return (<div className="App">
      <NavBar onResponse={this.onResponse}/>
      <div>
        <link rel="stylesheet" href="https://unpkg.com/react-table@latest/react-table.css"/>
        {data.length ? <ReactTable data={data} columns={columns}/> : <h1>No Results</h1>}
      </div>
    </div>);
  }
}

export default App;
