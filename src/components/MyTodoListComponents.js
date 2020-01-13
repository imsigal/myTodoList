import React, { Component } from 'react'
import { FormControl, InputGroup,Button,ListGroup,ButtonGroup,ToggleButton, Container,Form } from 'react-bootstrap';
import MyListItem from '../model/MyListItem'

export default class MyTodoListComponents extends Component {
    constructor(props) {
        super(props);


        this.todoList=[];
        this.todoList.push(new MyListItem(0, "feed the cat"));
        this.todoList.push(new MyListItem(1,"buy present"));
        this.state = {
            NewItemText: "",
            theListItems:this.todoList
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
            NewItemText: ""
        });
        //this.props.onFilterChange(this.state.NewItemText);
    }


    render() {
        const {theListItems,NewItemText}=this.state;
        let itemsLists=[];
        theListItems.forEach(element => {
            // if (!element.isCompleted)
            // {
            //     itemsLists.push(<ListGroup.Item action variant="secondary">{element.description}</ListGroup.Item>);   
            // }
            // else{
            //     itemsLists.push(<ListGroup.Item action variant="success">{element.description}</ListGroup.Item>);   
            // }

            itemsLists.push(
            <ListGroup.Item action variant="secondary">

                     <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label={element.description} id={element.id} />
                    </Form.Group>

            </ListGroup.Item>);    


        }  );
    
        return (
          
               <Container>
                   <h1>ToDos</h1>
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
