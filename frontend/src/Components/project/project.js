import { useState, useEffect, useRef} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import './project.css';


const ProjectComponent = () => {

    const [projectId, setProjectId] = useState(null)

    let { id } = useParams();

    const navigateHook = useNavigate();

    function navigateTo() {
        console.log(id);
        navigateHook("/");
    }

    useEffect(() => {
    },[]);
 
    return (
        <div id="project-body">
            <div onClick={() => {navigateTo()}}>
                <FontAwesomeIcon icon={faArrowLeft}/><span> GO BACK</span>
            </div>
            <h1>Project Name number {id}</h1>
            <hr></hr>
            <div id="flex-abstract-image">
                <div id="abstract">
                    <h2>Abstract</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum lorem in aliquet tincidunt. Maecenas interdum, sapien non congue luctus, tellus lacus tincidunt ante, eget varius erat lectus a lectus. Proin ipsum metus, porttitor sit amet sollicitudin vel, luctus vitae ligula. Fusce molestie auctor tortor sit amet mollis. Aliquam purus urna, finibus nec ligula nec, venenatis tempor massa. Donec condimentum risus luctus vestibulum luctus. Quisque sit amet porta lacus. Quisque egestas neque tristique metus vehicula sodales. Morbi vitae volutpat ante, non rhoncus nisi. Phasellus fermentum non justo a aliquam. Curabitur semper nunc sit amet feugiat iaculis. Sed mollis accumsan viverra.

Sed cursus, metus eu dictum commodo, arcu dolor vestibulum leo, ac tincidunt ligula leo non lorem. Sed pellentesque odio et tempor viverra. Vivamus aliquet nisl quis leo pharetra, vitae pretium lacus luctus. In egestas purus nec risus posuere, a ornare diam efficitur. Nullam ultricies sapien eu purus pellentesque, pellentesque faucibus metus iaculis. Sed sit amet ligula tincidunt libero congue cursus a vitae velit. Nam porta vel ante quis dapibus. Vestibulum id massa et purus scelerisque malesuada. Quisque at eros purus. Sed tincidunt nibh et ullamcorper luctus. Aenean tristique enim ac enim interdum, quis tincidunt nibh lobortis. Vivamus ut purus sit amet quam pretium gravida non a purus. Nam eu leo lacinia, sollicitudin enim eget, lobortis eros. Etiam nunc nibh, blandit commodo massa cursus, finibus sodales sapien.

Nunc in nulla lobortis magna mattis facilisis vitae ac enim. Donec volutpat iaculis arcu, sit amet efficitur lorem tempus id. Sed semper porttitor mauris. Maecenas nec odio vel erat consectetur lobortis nec id risus. Phasellus varius a sem ac pulvinar. Donec mollis convallis ante at bibendum. Praesent congue magna nibh, in lacinia neque lacinia a. Pellentesque accumsan massa non odio elementum sagittis. Suspendisse mattis sed nunc congue dignissim. Aliquam a congue leo. Aenean convallis dapibus ex, gravida sodales magna laoreet eget. Donec pulvinar feugiat sem, et mollis nulla dictum a. Duis at gravida eros. Fusce vel fermentum diam. Nunc ultrices justo in leo elementum luctus.</p>
                </div>
                <img src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"></img>
            </div>
            <div id="project-body-text">
                {<b>"Prueba"</b>}
            </div>
            <div>
                <h2>Images</h2>
                <div id="image-flex">
                    <img src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"></img>
                    <img src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"></img>
                    <img src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"></img>
                    <img src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"></img>
                    <img src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"></img>
                    <img src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"></img>
                    <img src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"></img>
                    <img src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"></img>
                    <img src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"></img>
                </div>
            </div>
            <div>
                <h2>Links</h2>
                <ul>
                    <li>Link1</li>
                    <li>Link1</li>
                    <li>Link1</li>
                </ul>
            </div>
            <button onClick={() => {navigateTo()}}>Go Back</button>
        </div>
    )
}
 
export default ProjectComponent