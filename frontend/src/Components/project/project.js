import { useState, useEffect, useRef} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { faArrowLeft,faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import db from '../../Firebase/firebase.config'
import { doc, getDoc} from "firebase/firestore";
import axios from "axios";
import './project.css';


const ProjectComponent = () => {

    let { id } = useParams();
    let projectRetrieved = false;
    const [projectSnapshot, setProjectSnapshot] = useState(null)
    const [projectName, setProjectName] = useState('')
    const [projectAbstract, setProjectAbstract] = useState('')
    const [projectBody, setProjectBody] = useState('')
    const [projectMainImage, setProjectMainImage] = useState('')
    const [projectOtherImages, setProjectOtherImages] = useState([])
    const [projectLinks, setProjectLinks] = useState([])
    const navigateHook = useNavigate();

    function navigateTo() {
        console.log(id);
        navigateHook("/");
    }

    useEffect(() => {
        getProject()
    },[]);
 
    const docRef = doc(db, "Projects", id);

    const getProject = async()=>{
        try {
            const doc = await getDoc(docRef);
            setProjectName(doc.data().name);
            setProjectAbstract(doc.data().abstract);
            setProjectMainImage(doc.data().mainImage);
            setProjectBody(doc.data().body);
            setProjectLinks(doc.data().links);
            setProjectOtherImages(doc.data().otherImages);
            projectRetrieved = true;
          } catch (e) {
            console.log("Error getting cached document:", e);
          }
    }

    const replaceWithBr = (string) =>{
        return string.replaceAll("[SPACE]", "<br /><br />");
    }

    return (
        <div id="project-body">
            <div onClick={() => {navigateTo()}}>
                <FontAwesomeIcon icon={faArrowLeft}/><span> GO BACK</span>
            </div>
            <div id="loading-screen" style={{visibility: projectName!="" ? "hidden" : "visible"}}>
                <FontAwesomeIcon icon={faSync}/>
            </div>
            <h1>{projectName}</h1>
            <hr></hr>
            <div id="flex-abstract-image">
                <div id="image">
                    <img src={'https://ferran98campos.github.io/Portfolio/img/'+id+'/'+projectMainImage}></img>
                </div>
                <div id="abstract">
                    <h2>Abstract</h2>
                    <p dangerouslySetInnerHTML={{__html: replaceWithBr(projectAbstract)}}/>
                </div>
            </div>
            <hr></hr>
            <div id="project-body-text">
                <p dangerouslySetInnerHTML={{__html: replaceWithBr(projectBody)}}/>
            </div>
            <hr></hr>
            <div>
                <h2>Images</h2>
                <div id="image-flex">
                    {
                        projectOtherImages.map(path=> {
                            return(
                                <img src={'https://ferran98campos.github.io/Portfolio/img/'+id+'/'+path}></img>
                            )
                        })
                    }
                </div>
            </div>
            <hr></hr>
            <div>
                <h2>Links</h2>
                <ul>
                    {
                        projectLinks.map(pathArray => {
                            const nonArray = pathArray.replace('[','').replace(']','');
                            const array = nonArray.split(',')
                            return(
                                <li><b><a href={array[1]}>{array[0]}</a></b></li>
                            )
                        })
                    }
                </ul>
            </div>
            <button onClick={() => {navigateTo()}}>Go Back</button>
        </div>
    )
}
 
export default ProjectComponent