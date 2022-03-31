import React, { Component } from 'react';
import data from "./about.json";

class About extends Component {
	render() {
  
		return (
            <div>
                <pre>
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        );
    }
} 
export default About;