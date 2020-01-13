import React, { Component } from 'react';
import { Checkbox } from 'react-bootstrap';
import './ListItemComponent.css';

export default class ListItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected:false
        };
    }
    handleCheckBoxChange = (event) => {
            console.log(event.target);
            if (event.target.checked) {
                this.props.item.isCompleted = true;
            }
            else {
                this.props.item.isCompleted = false;
            }
            this.setState({
                isSelected:event.target.checked
            });
        };
        render()
        {
            const { item } = this.props;
            let completedClass = "";
            if (item.isCompleted) {
                completedClass = "linethrough-text";
            }
            else {
                completedClass = "regular-text";
            }
            return (
            <div className="form-check">
                <label className={completedClass}>
                    <input
                        type="checkbox"
                        name={item.id}
                        checked={this.state.isSelected}
                        onChange={this.handleCheckBoxChange}
                        className="form-check-input"
                    />
                {item.description}
                </label>
            </div>
           
            );
        }
    
}
