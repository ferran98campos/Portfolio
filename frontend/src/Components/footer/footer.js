import { useState, useEffect, useRef, useLayoutEffect, useCallback} from 'react'
import axios from "axios";
import './footer.css';
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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

    const defineHelpList = () =>{
        var helpList = Array(4);
        for (var i=1; i<helpList.length+1;i++){
            var text ="This is the test test number "+i;
            var image="/img/Help_"+i+".PNG"
            helpList[i-1] = [text, image];
            
        }
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
                <div id="user-persona">
                    <div id="user-persona-img">
                    </div>
                    <div id="user-persona-details">
                    </div>
                </div>
            </div>

            

            <div id="footer-main">
                <div id="Help" ref={helpButtonOpenRef}>Help</div>
                <div id="About" ref={personaButtonOpenRef}>More About Me</div>
                <div id="Links" className="dropup">Social
                    <div className="dropup-content">
                        <div><FontAwesomeIcon icon={faLinkedin}/><a href="https://www.linkedin.com/in/ferran-campos-llopart/"> LinkedIn</a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default FooterComponent