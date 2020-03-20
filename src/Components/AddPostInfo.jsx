import React, { Component } from 'react';
import  Navbar  from './Navbar';

class AddPostInfo extends Component {
    render() {
        return (
            <>
                 <Navbar/>
                <h1 className="text-center font-weight-bolder my-4" >Submit a product</h1>
            </>
        );
    }
}

export default AddPostInfo;