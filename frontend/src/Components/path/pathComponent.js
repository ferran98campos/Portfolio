import { useState, useEffect } from 'react'
import axios from "axios";
import './pathComponent.css';
 
const PathComponent = () => {
    const [Path, setTest] = useState([]);
 
    useEffect(() => {
        //getPath();
    }, []);
 
    const getPath = async () => {
        //const response = await axios.get('http://localhost:5000/test');
        //setTest(response.data);
    }
 
    return (
        <div>
            <div id="legend">
                <p>Project Complexity</p>
                <div></div><p>Small</p>
                <div></div><p>Medium</p>
                <div></div><p>Large</p>
            </div>

            <div id="compass">
                    <div><p>Software</p></div>
                    <div><p>Media</p></div>
                    <div><p>Oldest</p></div>
                    <div><p>Newest</p></div>
                    <div></div><div></div><div></div><div></div>
            </div>

            <div id="path">
                <div className="path-connector start"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

                <div className="path-item">
                    <div className="circle bronze"></div>
                    <p>Title Test</p>
                </div>

                <div className="path-connector left-right"><div></div><div></div><div></div><div></div></div>

                <div className="path-item">
                    <div className="circle silver"></div>
                    <p>Title Test</p>
                </div>

                <div className="path-connector right-left"><div></div><div></div><div></div><div></div></div>

                <div className="path-item">
                    <div className="circle gold"></div>
                    <p>Title Test</p>
                </div>

                <div className="path-connector left-right"><div></div><div></div><div></div><div></div></div>

                <div className="path-item">
                    <div className="circle silver"></div>
                    <p>Title Test</p>
                </div>

                <div className="path-connector right-left"><div></div><div></div><div></div><div></div></div>

                <div className="path-item">
                    <div className="circle gold"></div>
                    <p>Title Test</p>
                </div>

                <div className="path-connector end"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

                <div id="path-end">
                    <p>Yet To Explore...</p>
                </div>
            </div>
        </div>
        

    )
}
 
export default PathComponent