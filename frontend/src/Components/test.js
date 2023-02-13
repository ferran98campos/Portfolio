import { useState, useEffect } from 'react'
import axios from "axios";
 
const TestList = () => {
    const [Test, setTest] = useState([]);
 
    useEffect(() => {
        getTest();
    }, []);
 
    const getTest = async () => {
        const response = await axios.get('http://localhost:5000/test');
        console.log("HEY");
        setTest(response.data);
    }
 
    return (
        <div>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TEXT</th>
                    </tr>
                </thead>
                <tbody>
                    { Test.map((Test, index) => (
                        <tr key={ Test.id }>
                            <td>{ index + 1 }</td>
                            <td>{ Test.text1}</td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}
 
export default TestList