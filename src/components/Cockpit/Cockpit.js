import React from 'react';
import Radium, { StyleRoot } from 'radium';
import CockPitCSS from './Cockpit.css';
import AuthContext from '../../context/auth-context';


const cockpit = (props) => {

    // creating react hook to use the reference property as provided by React.createRef();

    const toggleButtonRef = React.useRef(null);


    React.useEffect(() => { // useEffect is a react hook that is used to do some things that can be done by classes only. It add the functionality to the function components
        console.log("[Cockpit.js] useEffect");
        toggleButtonRef.current.click();
        // faking a http request
        // setTimeout(() => {
        //     // alert("Data saved to the cloud");
        // }, 2000)
    }, [props.person]);   // passing array to useEffect as second parameter gives us control over useEffect call as now useEffect will call if the props.person or the state has been changed so it calls whenever the state of the props is changed
    // if we want to call useEffect only once then pass [] as second argument to the useEffect    
    const style = {
        backgroundColor: 'green',
        color: 'white',
        font: 'inherit',
        border: 'none',
        padding: '10px',
        marginBottom: '20px',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: 'lightgreen',
            color: 'black'
        }
    }

    style.backgroundColor = 'red';
    style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
    }

    const classes = [];
    if (props.person.length <= 2) {
        classes.push('red');
    }
    if (props.person.length <= 1) {
        classes.push('bold');
    }

    //creating context in function based components by using react hooks
    const context = React.useContext(AuthContext);

    return (
        // StyleRoot is used as wrapper when using media queries
        <StyleRoot>
            <div className={CockPitCSS}>
                <h1>{props.title}</h1>
                <p className={classes.join(' ')}> Hello EveryOne this is the new paragraph</p>
                <button ref={toggleButtonRef} style={style} onClick={props.togglePerson}>Switch Name</button>

                {/* <AuthContext.Consumer>
                    {(context) => <button className = {CockPitCSS.login} onClick={context.login}>Login</button>}
                </AuthContext.Consumer> */}

                {<button onClick={context.login} > login </button>}

            </div>
        </StyleRoot>
    );
}

export default Radium(cockpit);