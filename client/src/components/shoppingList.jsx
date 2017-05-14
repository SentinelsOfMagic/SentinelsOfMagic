import axios from 'axios';
import auth from '../lib/clientAuth.js';
import FlatButton from 'material-ui/FlatButton';
import Nav from './Nav.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn} from 'material-ui/Table';



class ShoppingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {shoppingListItems: [], page: 'shop', selected: []};

    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  componentWillMount() {
    auth(this.props.history);
    axios.get('/api/shop')
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          this.setState({
            shoppingListItems: res.data});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submitShopping() {

    let submissionItems = this.state.selected.map((index) => {
      return this.state.shoppingListItems[index];
    });

    axios.post('/api/shop', {
      data: submissionItems
    })
    .then((res) => {
      this.setState({
        shoppingListItems: res.data,
        selected: []});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleRowSelection(selectedRows) {

    if (Array.isArray(selectedRows)) {
      this.setState({
        selected: selectedRows
      });
    } else if (selectedRows === 'all') {
      this.setState({
        selected: this.state.shoppingListItems.map((item, index) => index)
      });
    }

  }

  isSelected(index) {
    // Kind of ugly but not problematic at any reasonable number of selections
    return this.state.selected.includes(index);
  }


  render() {

    return (
      <div>
        <Nav page={this.state.page}/>
        <FlatButton label="Mark as Purchased" onTouchTap={this.submitShopping.bind(this)} />
        <Table multiSelectable={true} enableSelectAll={true} onRowSelection={this.handleRowSelection}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Select All</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody stripedRows={true}>
            {this.state.shoppingListItems.map((item, index) => {
              return (
                <TableRow key={index} selected={this.isSelected(index)}>
                  <TableRowColumn>{item.itemname}</TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default ShoppingList;
