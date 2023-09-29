import React, {Component} from 'react';
import './css/styles.css'

export default
class Preloader extends Component{
    
    render(){
        return (
            <div className='Preloader'>
                <p><i className="fa fa-refresh fa-spin fa-2x fa-fw"></i>
                Загрузка...</p> 
            </div>
        )
    }
    
}