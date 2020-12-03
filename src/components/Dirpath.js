import React, {Component} from 'react';

class Dirpath extends Component {
    render(){
        return this.props.path.map((path,index,arr)=>(
        <div style={{display: "inline"}}>
            <span onClick={()=>this.props.onChange(index+1)} >{path}</span>
            <span>{index!==arr.length-1?">":""}</span>
        </div>
        ));
    }
}

export default Dirpath;