import React, {Component} from 'react';

export default
class Preloader extends Component{
    
    render(){
        return (
            <div>
                <p><i className="fa fa-refresh fa-spin fa-2x fa-fw"></i>
                Загрузка...</p> 
            </div>
        )
    }
    
}