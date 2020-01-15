import React, { Component } from 'react'
import { FormControl, InputGroup,Button,ListGroup, Container,ButtonToolbar,ToggleButton,ToggleButtonGroup} from 'react-bootstrap';
import MyListItem from '../model/MyListItem';
import ListItemComponent from './ListItemComponent';
import './MyTodoListComponents.css';
export default class MyTodoListComponents extends Component {
    constructor(props) {
        super(props);

        this.todoList=[];
        this.todoList.push(new MyListItem(0, "feed the cat"));
        this.todoList.push(new MyListItem(1,"buy present"));
        this.state = {
            NewItemText: "",
            theListItems:this.todoList,
            ActiveItemsCount:this.todoList.filter(item=>item.isCompleted===false).length,
            FilterOptionIndex:1
        }

    }

    
    // handle input text change
    handleInputChange=(event)=> {
        const newText = event.target.value
        this.setState({
            NewItemText: newText
        });
    }

    // handle for enter key to accept changes
    handleKeyDownEvent=(event)=>{
        if (event.key === 'Enter') {
            this.HandleNewItem(event);
        }
    }

     // handle New item is added to the list
    HandleNewItem=(event)=>{    

        const {NewItemText}=this.state;
        let newListItem =new MyListItem(this.todoList[this.todoList.length-1].id+1, NewItemText);
        this.todoList.push(newListItem);
        this.setState({
            theListItems: this.todoList.concat(),
            NewItemText: "",
            ActiveItemsCount:this.state.ActiveItemsCount+1
        });
        

    }

    // set the index according to the button pressed ( handler to the button click)
    FilterResults=(event)=>{
        this.setState({
            FilterOptionIndex:event
        })
        

        
    }
    //actions to do when a task is completed
    CompletedTaskHandler=(count)=>{
        this.setState({
            ActiveItemsCount:this.state.ActiveItemsCount+count
        });
    }

    // Filter the list according to the buttom show all/ show completed/show active
    filterOptions=()=>
    {
        let filteredArray=[];
        switch (this.state.FilterOptionIndex) {
            case 1:
                filteredArray= this.todoList;
                break;
            case 2:
                filteredArray=this.todoList.filter(item=>item.isCompleted===false);
                break;
            case 3:
                filteredArray=this.todoList.filter(item=>item.isCompleted===true);
                break;
            default:
                filteredArray= this.todoList;
                break;
        }
     
        return filteredArray;
    }

    render() {
        const {NewItemText,ActiveItemsCount}=this.state;

        let filteredArray=this.filterOptions();
        let itemsLists=[];
        filteredArray.forEach(element => {
            itemsLists.push(<ListItemComponent item={element} OnCompletedTask={this.CompletedTaskHandler}></ListItemComponent>)
         }  );
          
    
        return (
          
               <Container  className="main-todo">
                   <h1>ToDos</h1>
                <div>
                   <ButtonToolbar >
                        <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={this.FilterResults}>
                            <ToggleButton variant="light" value={1}>Show All</ToggleButton>
                            <ToggleButton variant="light" value={2}>Show Active</ToggleButton>
                            <ToggleButton variant="light" value={3}>Show completed</ToggleButton>
                        </ToggleButtonGroup>
                </ButtonToolbar>
                <h5 className="left-items">{ActiveItemsCount} items left </h5>
                <ListGroup>
                    {itemsLists}
                </ListGroup>
              
                 <InputGroup className="mb-3" size="lg">
                    <FormControl className="input"
                        placeholder="Add new item..."
                        aria-label="Add new Item..."
                        aria-describedby="basic-addon2"
                        value={NewItemText} 
                         onChange={this.handleInputChange}
                         onKeyDown={this.handleKeyDownEvent}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary"  onClick={this.HandleNewItem}>Add item</Button>
                    </InputGroup.Append>
                </InputGroup>
                </div>
            </Container>
        )
    }
}
