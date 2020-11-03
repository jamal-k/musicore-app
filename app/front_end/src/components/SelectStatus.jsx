import React from "react";

class SelectStatus extends React.Component {

  render() {
    return (
        <select
        className={"form-control-alternative form-control " + this.props.classStyle}
        defaultValue={this.props.defaultStatus}
        onChange={this.props.func} >
        <option value="No Status">No Status</option>
        <option value="Contacted">Contacted</option>
        <option value="In Contact">In Contact</option>
        <option value="Successful">Successful</option>
        <option value="Unsuccessful">Unsuccessful</option>
        </select>
            );
        }
      }
      
export default SelectStatus;