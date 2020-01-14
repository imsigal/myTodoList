import React, { Component } from 'react'
import { FormControl, InputGroup,Button,ListGroup, Container,ButtonToolbar,ToggleButton,ToggleButtonGroup} from 'react-bootstrap';
import MyListItem from '../model/MyListItem';
import ListItemComponent from './ListItemComponent';

export default class MyTodoListComponents extends Component {
    constructor(props) {
        super(props);

        this.todoList=[];
        this.todoList.push(new MyListItem(0, "feed the cat"));
        this.todoList.push(new MyListItem(1,"buy present"));
        this.state = {
            NewItemText: "",
            theListItems:this.todoList,
            ActiveItemsCount:this.todoList.filter(item=>item.isCompleted===false).length
        }

    }

    
    
    handleInputChange=(event)=> {
        const newText = event.target.value
        this.setState({
            NewItemText: newText
        });
    }

    handleKeyDownEvent=(event)=>{
        if (event.key === 'Enter') {
            this.handleChange(event);
        }
    }

    handleChange=(event)=>{    

        const {NewItemText}=this.state;
        let newListItem =new MyListItem(this.todoList[this.todoList.length-1].id+1, NewItemText);
        this.todoList.push(newListItem);
        this.setState({
            theListItems: this.todoList.concat(),
            NewItemText: "",
            ActiveItemsCount:this.state.ActiveItemsCount+1
        });

    }

    FilterResults=(event)=>{
        
        let filteredArray=[];
        switch (event) {
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
        this.setState({
            theListItems: filteredArray
        }); 
    }

    CompletedTaskHandler=(count)=>{
        this.setState({
            ActiveItemsCount:this.state.ActiveItemsCount+count
        });
    }


    render() {
        const {theListItems,NewItemText,ActiveItemsCount}=this.state;
        let itemsLists=[];
        theListItems.forEach(element => {
            itemsLists.push(<ListItemComponent item={element} OnCompletedTask={this.CompletedTaskHandler}></ListItemComponent>)
         }  );
          
    
        return (
          
               <Container>
                   <h1>ToDos</h1>

                   <ButtonToolbar >
                        <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={this.FilterResults}>
                            <ToggleButton variant="light" value={1}>Show All</ToggleButton>
                            <ToggleButton variant="light" value={2}>Show Active</ToggleButton>
                            <ToggleButton variant="light" value={3}>Show completed</ToggleButton>
                        </ToggleButtonGroup>
                </ButtonToolbar>
                <h3>{ActiveItemsCount} items left </h3>
                <ListGroup>
                    {itemsLists}
                </ListGroup>
              
                 <InputGroup className="mb-3" size="lg">
                    <FormControl
                        placeholder="Add new item..."
                        aria-label="Add new Item..."
                        aria-describedby="basic-addon2"
                        value={NewItemText} 
                         onChange={this.handleInputChange}
                         onKeyDown={this.handleKeyDownEvent}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary"  onClick={this.handleChange}>Add item</Button>
                    </InputGroup.Append>
                </InputGroup>
              
            </Container>
        )
    }
}
