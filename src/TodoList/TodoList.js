import React, {Component} from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import Grid from '@material-ui/core/Grid';

const api_url = `http://localhost:3001/api/v1/todos`

class TodoList extends Component {
  constructor(props){
    super(props)
    this.state = {
      items: []
    }
    this.updateTodoList =this.updateTodoList.bind(this);
  }
  componentDidMount(){
    this.getTasks();

  }

  getTasks(){
    fetch(api_url)
    .then(response => response.json())
    .then(response_items => {
      this.setState({
        items: response_items.reverse()
      })
    });
  }

  updateTodoList(item){
    let _items = this.state.items
    _items.unshift(item) //Adds to the beginning of array
    this.setState({
      items: _items
    })
  }



  render (){
    console.log(this.state.items);
    return(
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TodoForm api_url={api_url} updateTodoList={this.updateTodoList} />
        </Grid>
        <Grid item xs={12} id="todo_list">
          {this.state.items.map((item) => (
            <TodoItem key={item.id} item={item} />

          ))}
        </Grid>
      </Grid>
    )
  }
}

export default TodoList;
