import React from 'react';
import Radium from 'radium';
import classes from './Person.css';
import Auxilary from '../../../hoc/Auxilary';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends React.Component {
    constructor(props) {
        super(props);

        // creating ref by more advanced way provided by react
        this.inputElementRef = React.createRef();
    }

    //creating context by using fixeed variable name as defined by the react (contextType) and assigning the value to it as your importing file
    static contextType = AuthContext;

    componentDidMount() {
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render() {
        console.log("[Person.js] rendering...");
        const style = {
            '@media (min-width: 500px)': {
                width: '700px'
            }
        }

        return (
            <Auxilary className={classes.Person} style={style} >

                {/* native version of using context by Consumer and Provider thing */}
                {/* <AuthContext.Consumer>
                    {(context) => context.authenticated ? <p>Authenticated!</p> : <p>Please Log in!</p>  

                    }
                </AuthContext.Consumer> */}


                {/* work is done here by using context provided by the React */}
                {this.context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>}

                <p onClick={this.props.click}>This person has a name {this.props.name} and a age of {this.props.age} {this.props.children} </p>
                <input
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name}
                    // to bring focus to the last element - one technique
                    // ref = {(inputEl) => {inputEl.focus()}}

                    // to bring focus to the last element - second technique and then calling this.inputElement.focus() in componentDidMount
                    // ref={(inputEl) => { this.inputElement = inputEl }}

                    // another way of focus 
                    ref={this.inputElementRef}
                />
            </Auxilary>
        );
    }
}

// proptypes is used to make props variable strongly typed but in a warning way ie it gives warning if wrong type of props variable are passed to the compnents
Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default Radium(Person);