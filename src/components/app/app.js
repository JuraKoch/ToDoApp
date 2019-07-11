import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  constructor() {
    super();

    this.maxId = 100;

    this.createTodoItem = (label) => {
      return {
        label,
        important: false,
        done: false,
        id: this.maxId++
      }
    };

    this.state = {
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a lunch')
      ],
      term: '',
      filter: 'all' // all, active, done
    };

    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: todoData.filter(item => item.id !== id)
        };
      })
    };

    this.addItem = (text) => {
      const newItem = this.createTodoItem(text);
      this.setState(({ todoData }) => {
        return {
          todoData: [...todoData, newItem]
        };
      })
    };

    this.toogleProperty = (arr, id, propName) => {
      return arr.map((item) => {
        return (item.id === id) ? {...item, [propName]: !item[propName]} : item;
      })
    };

    this.onToogleDone = (id) => {
      this.setState(( {todoData} ) => {
        return {
          todoData: this.toogleProperty(todoData, id, 'done')
        }
      });
    };

    this.onToogleImportant = (id) => {
      this.setState(( {todoData} ) => {
        return {
          todoData: this.toogleProperty(todoData, id, 'important')
        }
      });
    };

    this.onSearchPanelChanged = (term) => {
      this.setState({term});
    };

    this.onFilterChange = (filter) => {
      this.setState({filter});
    };
  }

  render () {
    let {todoData, term, filter} = this.state;
    let doneCount = todoData.reduce((sum, item) => {
      return item.done ? sum + 1 : sum;
    },0);
    let todoCount = todoData.length - doneCount;

    function searchFilterItems(items, term){
      return (term.length === 0) ? items : items.filter(item => item.label.toLowerCase().indexOf(term.trim().toLowerCase()) > -1)
    }

    function filterItems(items, filter){
      if (filter === 'all') return items;
      if (filter === 'active') return items.filter(item => !item.done);
      if (filter === 'done') return items.filter(item => item.done);
      return items;
    }

    let visibleItems = filterItems(searchFilterItems(todoData, term), filter);

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel 
            onSearchPanelChanged={this.onSearchPanelChanged}
          />
          <ItemStatusFilter 
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList 
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToogleImportant={this.onToogleImportant}
          onToogleDone={this.onToogleDone} />
        <ItemAddForm
          onItemAdded={this.addItem}
        />
      </div>
    );
  }
};
