import { useState, useEffect, useRef, useLayoutEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './neuronsComponent.css';
import './legend.css';
import FooterComponent from '../footer/footer'
import db from '../../Firebase/firebase.config'
import { doc, onSnapshot, collection, getDoc, getDocs, query, where} from "firebase/firestore";
import { faSync, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Neuron{
    constructor(id, projectName, posX, posY, type, size){
        this.id = id;
        this.projectName = projectName;
        this.posX = posX;
        this.posY = posY;
        this.type = type;
        this.size = size;
    }
}

export const settings = {
    imagePath: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSIwIDAgMjAgMTgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+R3JvdXA8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGRlZnM+PC9kZWZzPiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAuMDAwMDAwLCA5LjAwMDAwMCkgcm90YXRlKC0zMzAuMDAwMDAwKSB0cmFuc2xhdGUoLTEwLjAwMDAwMCwgLTkuMDAwMDAwKSB0cmFuc2xhdGUoMC4wMDAwMDAsIC0xLjAwMDAwMCkiPiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQb2x5Z29uIiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjEwIC00LjA2MDI0NDJlLTE0IDE4LjY2MDI1NCA1IDE4LjY2MDI1NCAxNSAxMCAyMCAxLjMzOTc0NTk2IDE1IDEuMzM5NzQ1OTYgNSI+PC9wb2x5Z29uPiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQb2x5Z29uIiBmaWxsPSIjRjBGMEYwIiBwb2ludHM9IjEwIDEuNjI0MDk3NjhlLTE0IDE4LjY2MDI1NCA1IDE4LjY2MDI1NCAxNSAxMCAyMCAxLjMzOTc0NTk2IDE1IDkuOTk5OTk5NzYgMTAiPjwvcG9seWdvbj4gICAgICAgICAgICA8cG9seWdvbiBpZD0iUG9seWdvbiIgZmlsbD0iI0U3RTdFNyIgcG9pbnRzPSIxOC42NjAyNTQgMTUgMTAgMjAgMS4zMzk3NDU5NiAxNSA5Ljk5OTk5OTc2IDEwIj48L3BvbHlnb24+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=',
    imgWidth: 20,
    imgHeight: 18
}

const NeuronsComponent = () => {
    const [width, setWidth] = useState(0)
    const [numNeurons, setNumNeurons] = useState(0)
    const [projectSnapshot, setProjectSnapshot] = useState(null)
    const [neuronList, setNeuronList] = useState(0)
    const [connectionsList, setConnectionList] = useState(0)
    const ref = useRef(null)
    const [blogs,setBlogs]=useState([])
    const [neuronHTMLList, setNeuronHTMLList] = useState(null)
    const [legendVisible, setlegendVisible] = useState(true)
    const [visibleNeurons, setVisibleNeurons] = useState([true, true, true, true])

    //Use effect for rendering the project map
    useEffect(() => {
        getNumberProjects(false);

        if(numNeurons>0){
            document.getElementById('loading-screen').style.visibility = "hidden";

            let timeout = null;
            
            createNeuronMatrix();
            window.addEventListener("resize", function(e){
                getNumberProjects(true);
                clearTimeout(timeout);
                
                // Make a new timeout set to go off in 1000ms (1 second)
                timeout = setTimeout(function () {
                    createNeuronMatrix();
                }, 1000);
            }, false);

            setTimeout(() => {
                let neurons = document.getElementsByClassName("neuron");
                console.log(neurons);
                setNeuronHTMLList([...neurons]);
                
            }, 1); 
        }

        
    },[numNeurons]);
 
    //Use Effect for the project name
    useEffect(() => {
        let projectName = document.getElementById('projectname');
        
        if(numNeurons>0 && document.getElementById('neurons-layout').innerHTML != ''){
            //Add Event Listener for each neuron, so that the title (projectName) appears under it with a triangle pointing at the neuron

            for(let i=0; i < neuronHTMLList.length ; i++){
                
                //When mouse is on top (hover)
                neuronHTMLList[i].addEventListener('mouseover', (event) => {
                    //console.log(neuronHTMLList[i].title);
                    //Get the neuron project title
                    projectName.innerHTML = neuronHTMLList[i].title;
                    //Get the position for the project title. Needs to be centered. It calculated by using (neuron.posX + neuron.width /2) - projectName.width / 2.
                    let projectNameLeft = parseFloat(neuronHTMLList[i].style.left.replace("px","")) - projectName.clientWidth  / 2 + neuronHTMLList[i].width / 2;

                    //However if the neuron is close to the left border of the screen. The position of the title will be 0 and its arrow moved just below the neuron
                    if(projectNameLeft < 0){
                        projectNameLeft = 0;
                        //The position of the triangle is calculate by: (neuron.posX + neuron.width /2) - projectName.width
                        projectName.style.setProperty("--arrow-position", (parseFloat(neuronHTMLList[i].style.left.replace("px","")) - projectNameLeft + neuronHTMLList[i].width / 2) + "px");
                    }else if(projectNameLeft + projectName.offsetWidth >= document.getElementById('neurons-layout').offsetWidth){
                        //If the neuron is close to the right border, then the position is calculated to the title dosnt go beyond the screen, and the triangle is positioned under the neuron
                        projectNameLeft = document.getElementById('neurons-layout').offsetWidth - projectName.offsetWidth;
                        //The position of the triangle is calculate by: (neuron.posX + neuron.width /2) - projectName.width
                        projectName.style.setProperty("--arrow-position", (parseFloat(neuronHTMLList[i].style.left.replace("px","")) - projectNameLeft + neuronHTMLList[i].width / 2) + "px");
                    }
                    else{
                        //Otherwise the triangle is always positioned in the middle.
                        projectName.style.setProperty("--arrow-position", "50%");
                    }

                    //We set the position on the DOM
                    projectName.style.left = projectNameLeft + "px";
                    
                    //Do the same with the position on the Y axis
                    projectName.style.top = (parseFloat(neuronHTMLList[i].style.top.replace("px","")) + neuronHTMLList[i].height * 1.5 ) + "px";
                    console.log(projectName.innerHTML);
                    //Set the image title to "" so that the name is not visible once the user hovers on the image
                    neuronHTMLList[i].title = "";
                    console.log(projectName.innerHTML);
                    //Setting the title to visible
                    projectName.style.visibility = "visible";
                })
            
                //Then, for each neuron, when the mouse is out, the projectTitle is hidden, and the name of the neuron stored back in the image title
                neuronHTMLList[i].addEventListener('mouseout', (event) => {
                    projectName.style.visibility = "hidden";
                    
                    neuronHTMLList[i].title = projectName.innerHTML;
                })
                
                
                
                    
                
            }
            
        }
        
    },[neuronHTMLList]);

    const toggleProject = async(buttonType)=> {
        let visibility = visibleNeurons;
        let buttons = document.getElementById('project-type').getElementsByTagName('div');
        let types = ["software", "interaction", "design", "others"];
        
        for (let i = 0; i< types.length; i++){
            if (types[i] == buttonType){
                visibility[i] = !visibility[i];
                if (buttons[i].getElementsByTagName('img')[0].classList.contains(types[i])){
                    buttons[i].getElementsByTagName('img')[0].classList.remove(types[i]);
                }else{
                    buttons[i].getElementsByTagName('img')[0].classList.add(types[i]);
                } 
            }
        }


        setVisibleNeurons([...visibility]);

        let parentNode = document.getElementById('neurons-layout');
        parentNode.innerHTML = '';
        document.getElementById('loading-screen').style.visibility = "visible";
        getNumberProjects(false);
        
    }

    const docRef = doc(db, "Projects", "FI5JVjREdnskRUszKYsz");

    function flatten(arr) {
        return arr.reduce(function (flat, toFlatten) {
          return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
        }, []);
      }

    const getNumberProjects = async (resize) => {
        if(!resize){

            let queries = [];

            //Queries
            const sof = await getDocs(query(collection(db, "Projects"), where('type', '==', "software")));
            const des = await getDocs(query(collection(db, "Projects"), where('type', '==', "design")));
            const inter = await getDocs(query(collection(db, "Projects"), where('type', '==', "interaction")));
            const oth = await getDocs(query(collection(db, "Projects"), where('type', '==', "others")));

            if(visibleNeurons[0]){
                queries.push(sof);
            }

            if(visibleNeurons[1]){
                queries.push(inter);
            }

            if(visibleNeurons[2]){
                queries.push(des);
            }

            if(visibleNeurons[3]){
                queries.push(oth);
            }
            
            Promise.all(queries).then((values) => {
                const result = flatten(values.map( value => {
                    return value.docs.map((d) => ({
                        id: d.id,
                        ...d.data()
                      }))
                }));

                //const projectsSnapshop = await getDocs(collection(db, "Projects"));
                setProjectSnapshot(result);
                setNumNeurons(result.length);
                
                });
        }

    }

    const fetchBlogs=async()=>{
        try {
            const doc = await getDoc(docRef);
            // Document was found in the cache. If no cached document exists,
            // an error will be returned to the 'catch' block below.
            //console.log("Cached document data:", doc.data());
          } catch (e) {
            console.log("Error getting cached document:", e);
          }
    }

    useLayoutEffect(() => {
    }, )

    const navigateHook = useNavigate();

    function navigateTo(id) {
        console.log(id);
        navigateHook("/"+id);
    }

    const legendVisibility = () => {
        if (window.getComputedStyle(document.getElementById('project-visibility')).display == 'none'){
            document.getElementById('project-visibility').style.display = 'block';
            setlegendVisible(true);
        }else{
            document.getElementById('project-visibility').style.display = 'none';
            setlegendVisible(false);
        }
    }

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

            var neuron = new Neuron(projectSnapshot[i].id, projectSnapshot[i].name , chosenPosX * settings.imgWidth*2, chosenPosY* settings.imgHeight*2, projectSnapshot[i].type, projectSnapshot[i].size); //2- XL 1.7-L 1.5-M 1.2-S 1-XS; 
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
                connections[i][j] = [neurons[i].posX, neurons[i].posY, neurons[i].size, nodeX, nodeY, neurons[nodeID].size];
                j++;
            }while(j < numConnections);
        }
        setConnectionList(connections.flat(1));
    }

    return (
        <div>
            <div id="loading-screen" style={{visibility: numNeurons>0 ? "hidden" : "visible"}}>
                <FontAwesomeIcon icon={faSync}/>
            </div>
            <div id="legend">
                <div id="legend-arrow" onClick={() => {legendVisibility()}}>
                    <FontAwesomeIcon icon={legendVisible ? faChevronDown : faChevronUp}/>
                </div>
                
                <div id="project-visibility">
                    <h2>Legend</h2>
                    <h3>Type of Project</h3>
                    <hr></hr>
                    <div id="project-type">
                        <div onClick={() => {getNumberProjects(false)}}>
                            <img src={settings.imagePath} className="software"></img>
                            <p>Software</p>
                        </div>
                        <div>
                            <img src={settings.imagePath} className="interaction"></img>
                            <p>Interaccion</p>
                        </div>
                        <div>
                            <img src={settings.imagePath} className="design"></img>
                            <p>Design</p>
                        </div>
                        <div>
                            <img src={settings.imagePath} className="others"></img>
                            <p>Other</p>
                        </div>
                    </div>
                </div>
            </div>
            <h1>PORTFOLIO</h1>
            <div ref={ref} id="neurons-layout">
                    <div id="projectname">
                        <span>This is a test</span>
                    </div>
                    {neuronList.length > 0 ? neuronList.map(neuron => {
                        return(
                            <img title={neuron.projectName} className={"neuron "+ neuron.type} src={settings.imagePath} width={settings.imgWidth * neuron.size} height={settings.imgHeight * neuron.size} style={{left: neuron.posX, top: neuron.posY}} onClick={() => {navigateTo(neuron.id)}}></img>
                            )
                    }):null}
                    
                    {connectionsList.length > 0 ? connectionsList.map(connection => {
                        return(
                            <svg>
                                <line strokeWidth="2px" stroke="rgba(225, 219, 255,0.2)"  x1={connection[0]+settings.imgWidth * connection[2]/2} y1={connection[1]+settings.imgHeight * connection[2] /2} x2={connection[3]+settings.imgWidth * connection[5] /2} y2={connection[4]+settings.imgHeight * connection[5] /2}/>
                            </svg>           
                        )
                    }):null}
            </div>
            <FooterComponent/>
        </div>
    )
}
 
export default NeuronsComponent