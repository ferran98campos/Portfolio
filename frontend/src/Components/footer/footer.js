import { useState, useEffect, useRef, useLayoutEffect, useCallback} from 'react'
import axios from "axios";
import './footer.css';
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faArrowLeft, faFile, faX, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const FooterComponent = () => {

    const [helpList, setHelpList] = useState(0)
    const [personaShowing, setPersonaShowing] = useState(false)
    const [helpShowing, setHelpShowing] = useState(false)
    const [helpSlide, setHelpSlide] = useState(-1)
    const helpButtonOpenRef = useRef(null)
    const helpButtonCloseRef = useRef(null)
    const personaButtonOpenRef = useRef(null)
    const personaButtonCloseRef = useRef(null)

    useEffect(() => {
        defineHelpList();
        helpButtonOpenRef.current.addEventListener("click", openHelpLayout);
        helpButtonCloseRef.current.addEventListener("click", closeHelpLayout);
        personaButtonOpenRef.current.addEventListener("click", openPersonaLayout);
        checkTutorial();
    },[]);
 
    const checkTutorial = () =>{
        if(localStorage.getItem('tutorialCompleted') == undefined){
            openHelpLayout();
            localStorage.setItem('tutorialCompleted',true);
        }else{
            setHelpSlide(0);
        }
    }

    const helpJumpForward = () =>{
        if(helpSlide < helpList.length - 1){
            setHelpSlide(helpSlide+1);
        }
    }

    const helpJumpBack= () =>{
        if(helpSlide > -1){
            setHelpSlide(helpSlide-1);
        }
    }

    const closeHelpLayout = () =>{
        setHelpShowing(false);
    }

    const openHelpLayout = () =>{
        setHelpShowing(true);
    }

    const openPersonaLayout = () =>{
        setPersonaShowing(true);
    }

    const closePersonaLayout = () =>{
        setPersonaShowing(false);
    }

    const defineHelpList = () =>{
        var helpList = Array(4);
        for (var i=1; i<helpList.length+1;i++){
            var image="/img/Help_"+i+".PNG"
            helpList[i-1] = ["",image];
        }
        helpList[0][0] = "This portfolio is a constellation of projects. You will notice some 'cubes' or 'stars' connected to each other, varying in both size and colour. Each cube represents a project, you can find out about it by clicking on it."
        helpList[1][0] = "The project's colour represents the topic of the project. There are a total of four possible colours: Red (Software); Green (Interaction); Pink (Design); and Yellow (Other topics)."
        helpList[2][0] = "The cubes can also vary in size. The size represents the complexity of the project: the bigger the cube, the more complex it is."
        helpList[3][0] = "Last but not least. You can find more about me in the footer. You will find access to more information about me, and links that might be of your interests."

        setHelpList(helpList);
    }

    return (
        <div id="footer">
            <div id="help-background" style={{display: helpShowing==true ? "block" : "none"}}>
                <div id="help-display">
                    {(helpList.length > 0 && helpSlide == -1) &&
                        <div id="help-upper">
                            <div id="help-arrow-back" onClick={helpJumpBack} style={helpSlide==-1? {visibility:'hidden'} : {visibility:'visible'}}></div>
                            <div id="help-text-main">
                                <h2>Welcome to my Portfolio</h2>
                                <br></br>
                                <p>Let me guide you through my portfolio. If you prefer to dive directly into it, you can press the Orange button below. Otherwise, use the arrows at both sides to navigate through this tutorial.</p>
                            </div>
                            <div id="help-arrow-forward" onClick={helpJumpForward} style={helpSlide==(helpList.length-1)  ? {visibility:'hidden'} : {visibility:'visible'}}><FontAwesomeIcon icon={faArrowRight} /></div>
                        </div>
                    }
                    {(helpList.length > 0 && helpSlide > -1) &&
                        <div id="help-upper">
                            <div id="help-arrow-back" onClick={helpJumpBack}><FontAwesomeIcon icon={faArrowLeft} /></div>
                            <div id="help-image"><img src={helpList[helpSlide][1]}></img></div>
                            <div id="help-text">
                                <p>{helpList[helpSlide][0]}</p>
                            </div>
                            <div id="help-arrow-forward" onClick={helpJumpForward} style={helpSlide==(helpList.length-1)  ? {visibility:'hidden'} : {visibility:'visible'}}><FontAwesomeIcon icon={faArrowRight} /></div>
                        </div>
                    }
                    <div id="help-button"><button type="button" ref={helpButtonCloseRef}>Understood</button></div>
                </div>
            </div>

            <div id="user-persona-background" style={{display: personaShowing==true ? "block" : "none"}}>
                <div id="user-persona" >
                    <FontAwesomeIcon icon={faX} id="user-persona-close" onClick={closePersonaLayout}/>
                    <div id="persona-image" style={{backgroundImage:'url(\'/img/persona_photo.png\')'}}>
                        <div id="user-persona-quote">
                            <p>"I believe the user should always be the cornerstone of software development"</p>
                        </div>
                    </div>

                    <div id="user-persona-details">
                        <div id="user-persona-name">
                            <h2><b>FERRAN</b> CAMPOS LLOPART</h2>
                            <p><i>Software Developer specializing in HCI</i></p>
                        </div>
                        <div id="user-persona-flex">
                            <div id="user-persona-bio">
                                <h3>About Me</h3>
                                <hr></hr>
                                <p>I am a <b>Interactive Media Technology Master’s student</b> at <i>KTH (Stockholm, Sweden)</i>, with a background in<b> Computer Science and Software Development</b> and some professional experience in the field. I am aware of how crucial it is to have the end users’ needs in mind when designing and building technology, I realized about this during my Bachelor's degree and I reaffirmed it along my job experience. My goal is to extend my professional career and deliver valuable software solutions to our users.</p>
                            </div>
                            <div id="user-persona-flex-mid">
                                <div id="user-persona-skills">
                                    <h3>Soft Skills</h3>
                                    <hr></hr>
                                    <ul>
                                        <li>Organized</li>
                                        <li>Fast Learner</li>
                                        <li>Self-Reliance</li>
                                        <li>Team Work</li>
                                    </ul>
                                </div>
                                <div id="user-persona-languages">
                                    <h3>Languages</h3>
                                    <hr></hr>
                                    <ul>
                                        <li>English</li>
                                        <li>Spanish</li>
                                        <li>Catalan</li>
                                    </ul>
                                </div>
                            </div>
                            <div id="user-persona-flex-mid">
                                <div id="user-persona-interests">
                                    <h3>Interests</h3>
                                    <hr></hr>
                                    <p>I believe that my interests are varied. Aside from software and interaction, I am also a music enthusiast, reason why you may find some projects related to it, even though they might not have any relationship with software development or human interaction. </p>
                                </div>
                                <div id="user-persona-links">
                                    <h3>Contact Me</h3>
                                    <hr></hr>
                                    <ul>
                                        <li><FontAwesomeIcon icon={faEnvelope}/><b> Email: </b>ferran98campos@gmail.com</li>
                                        <li><FontAwesomeIcon icon={faPhone}/><b> Phone (ES): </b>+34 674203066</li>
                                        <li><FontAwesomeIcon icon={faPhone}/><b> Phone (SE): </b>+46 727809427</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            

            <div id="footer-main">
                <div id="Help" ref={helpButtonOpenRef}>Help</div>
                <div id="About" ref={personaButtonOpenRef}>More About Me</div>
                <div id="Links" className="dropup">Social
                    <div className="dropup-content">
                        <div><FontAwesomeIcon icon={faGithub}/><a href="https://github.com/ferran98campos?tab=repositories"> Github</a></div>
                        <div><FontAwesomeIcon icon={faLinkedin}/><a href="https://www.linkedin.com/in/ferran-campos-llopart/"> LinkedIn</a></div>
                        <div><FontAwesomeIcon icon={faFile}/><a href="https://www.linkedin.com/in/ferran-campos-llopart/"> CV</a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default FooterComponent