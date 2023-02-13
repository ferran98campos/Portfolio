import { useState, useEffect, useRef, useLayoutEffect, useCallback} from 'react'
import axios from "axios";
import './neuronsComponent.css';
import FooterComponent from '../footer/footer'

class Neuron{
    constructor(id, posX, posY, type, size, animation){
        this.id = id;
        this.posX = posX;
        this.posY = posY;
        this.type = type;
        this.size = size;
        this.animation = animation;
    }
}

const NeuronsComponent = () => {
    const [width, setWidth] = useState(0)
    const [numNeurons, setNumNeurons] = useState(10)
    const [neuronList, setNeuronList] = useState(0)
    const [connectionsList, setConnectionList] = useState(0)
    
    const ref = useRef(null)

    const settings = {
		imagePath: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSIwIDAgMjAgMTgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+R3JvdXA8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGRlZnM+PC9kZWZzPiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAuMDAwMDAwLCA5LjAwMDAwMCkgcm90YXRlKC0zMzAuMDAwMDAwKSB0cmFuc2xhdGUoLTEwLjAwMDAwMCwgLTkuMDAwMDAwKSB0cmFuc2xhdGUoMC4wMDAwMDAsIC0xLjAwMDAwMCkiPiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQb2x5Z29uIiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjEwIC00LjA2MDI0NDJlLTE0IDE4LjY2MDI1NCA1IDE4LjY2MDI1NCAxNSAxMCAyMCAxLjMzOTc0NTk2IDE1IDEuMzM5NzQ1OTYgNSI+PC9wb2x5Z29uPiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQb2x5Z29uIiBmaWxsPSIjRjBGMEYwIiBwb2ludHM9IjEwIDEuNjI0MDk3NjhlLTE0IDE4LjY2MDI1NCA1IDE4LjY2MDI1NCAxNSAxMCAyMCAxLjMzOTc0NTk2IDE1IDkuOTk5OTk5NzYgMTAiPjwvcG9seWdvbj4gICAgICAgICAgICA8cG9seWdvbiBpZD0iUG9seWdvbiIgZmlsbD0iI0U3RTdFNyIgcG9pbnRzPSIxOC42NjAyNTQgMTUgMTAgMjAgMS4zMzk3NDU5NiAxNSA5Ljk5OTk5OTc2IDEwIj48L3BvbHlnb24+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=',
		imgWidth: 20,
		imgHeight: 18
	}

    useEffect(() => {
        createNeuronMatrix();
        window.addEventListener("resize", createNeuronMatrix, false);
    },[]);
 
    useLayoutEffect(() => {
    }, )

    const createNeuronMatrix = () =>{
        if (ref.current.offsetWidth > 0 && ref.current.clientHeight > 0){
            
            //Calculate number of points in matrix
            const pointsX = Math.floor((ref.current.offsetWidth / settings.imgWidth) / 2);
            const pointsY = Math.floor((ref.current.clientHeight / settings.imgHeight) / 2);

            //Create matrix and fill it with '0'
            var neuronMatrix = Array(pointsX).fill(-1);
            for(var i=0; i<pointsX; i++){
                neuronMatrix[i] = Array(pointsY).fill(-1);
            }

            //Determine position of neurons
            var neuronList;
            neuronList = positionNeurons(neuronMatrix, numNeurons, pointsX, pointsY);

            //Set value of matrix
            setNeuronList(neuronList);
            setConnections(neuronList);
        }
    }

    const getAvailableMatrixPosition = (matrix) =>{
        //This line avoid the '.map() is not a function' error
        var newmatrix = Array.from(matrix);
        //Returns all matrix positions where there is a 0
        return newmatrix.map((array, positionX) => array.map((value, positionY) => [value, positionX, positionY]).filter((value) => value[0] == -1).map(value => [value[1], value[2]])).flat(1);
    }

    const positionNeurons = (matrix, numNeurons, pointsX, pointsY) =>{
        var vitalSpaceX = 0;
        var vitalSpaceY = 0;
        
        //Get neuron spacing (so that they don't end up piled up)
        if(numNeurons <= 3){
            vitalSpaceX = Math.floor(pointsX / 3) - 1;
            vitalSpaceY = pointsY - 1;
        }else{
            vitalSpaceX = Math.floor(pointsX / Math.ceil(Math.sqrt(numNeurons))) - 10;
            vitalSpaceY = Math.floor(pointsY / Math.ceil(Math.sqrt(numNeurons))) - 10;
        }
        var counter = 1;
        var neurons = Array(numNeurons);
        for(var i = 0; i < numNeurons; i++){
            //Get available positions
            const positions = getAvailableMatrixPosition(matrix);

            if(positions.length == 0){
                break;
            }
                
            //Pick a random position
            const chosenPosition = Math.floor(Math.random() * positions.length);  
            const chosenPosX = positions[chosenPosition][0];
            const chosenPosY = positions[chosenPosition][1];

            //Position object
            matrix[chosenPosX][chosenPosY] = counter;
            counter++;

            var neuron = new Neuron(counter, chosenPosX * settings.imgWidth*2, chosenPosY* settings.imgHeight*2, "software", 1.1, "animation1"); //1.5 - XL 1.2-L 1.1-M 1.0-S 0.9-XS; 

            neurons[i] = neuron;

            //Substract vital space
            vitalSpace(matrix, chosenPosX, chosenPosY, vitalSpaceX, vitalSpaceY);
        }
        return neurons;
    }

    const vitalSpace = (matrix, positionX, positionY, vitalSpaceX, vitalSpaceY) =>{
        //Set the vital space as occupied
        for(var i=Math.max(0, positionX - vitalSpaceX); i < Math.min(matrix.length, positionX + vitalSpaceX); i++){
            for(var j=Math.max(0, positionY - vitalSpaceY); j < Math.min(matrix[0].length, positionY + vitalSpaceY); j++){
                if(matrix[i][j] == -1)
                    matrix[i][j] = 0;
            }
        }
    }

    const setConnections = (neurons) => {
        var connections = Array(numNeurons);
        for(var i=0; i< numNeurons;i++){
            var j=0;

            //Create an array from 0 to N (N = num Neurons). Then, we eliminate the element containing the same number as this node. We won't make a connection froma node to itself
            var availableNodes = Array.from(Array(numNeurons).keys())
            var index = availableNodes.indexOf(i);
            availableNodes.slice(index,1);
            var numConnections = Math.min(Math.floor(Math.random() * numNeurons), Math.ceil(10/numNeurons));
            connections[i] = Array(numConnections+1);
            do{
                //Select a node randomly
                var selectedNode = Math.floor( Math.random() * availableNodes.length);

                //Deleting it from the available list
                var nodeID = availableNodes[selectedNode];
                index = availableNodes.indexOf(nodeID);
                availableNodes.slice(index,1);

                //Get its coordinates
                var nodeX = neurons[nodeID].posX;
                var nodeY = neurons[nodeID].posY;
                connections[i][j] = [neurons[i].posX, neurons[i].posY, nodeX, nodeY];
                j++;
            }while(j < numConnections);
        }
        setConnectionList(connections.flat(1));
    }

    return (
        <div>
            <h1>PORTFOLIO</h1>
            <div ref={ref} id="neurons-layout">
                    {neuronList.length > 0 ? neuronList.map(neuron => {
                        return(
                            <img className={neuron.type} src={settings.imagePath} width={settings.imgWidth * neuron.size} height={settings.imgHeight * neuron.size} style={{left: neuron.posX, top: neuron.posY, animation: neuron.animation}}></img>
                        )
                    }):null}
                    
                    {connectionsList.length > 0 ? connectionsList.map(connection => {
                        return(
                            <svg>
                                <line strokeWidth="2px" stroke="rgba(225, 219, 255,0.2)"  x1={connection[0]+settings.imgWidth/2} y1={connection[1]+settings.imgHeight/2} x2={connection[2]+settings.imgWidth/2} y2={connection[3]+settings.imgHeight/2}/>
                            </svg>           
                        )
                    }):null}
            </div>
            <FooterComponent/>
        </div>
    )
}
 
export default NeuronsComponent