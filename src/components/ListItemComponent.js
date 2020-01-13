import React, { Component } from 'react';
import './ListItemComponent.css';

export default class ListItemComponent extends Component {
    constructor(props) {
        super(props);
    
          this.state = {
            wasChanged:false
        };

    }
  

    handleCheckBoxChange = (event) => {
                 if (event.target.checked!==this.props.item.isCompleted)
            {
                this.props.item.isCompleted=event.target.checked;
                this.setState({
                    wasChanged:true
                    });
            }

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
                        checked={item.isCompleted}
                        onChange={this.handleCheckBoxChange}
                        className="form-check-input"
                    />
                {item.description}
                </label>
            </div>
           
            );
        }
    
}
