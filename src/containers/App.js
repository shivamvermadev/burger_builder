import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium'; // radium allows us to add features of CSS like pseudoselectors and media queries  
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import AuthContext from '../context/auth-context';

class App extends Component {

  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }


  state = {
    person: [
      { id: "1", name: "Shivam", age: 23 },
      { id: "2", name: "Dev", age: 23 },
      { id: "3", name: "Deepak", age: 28 }
    ],
    otherData: "Some Random Data",
    showPersons: false,
    changeCounter: 0,
    authenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps ", props);
    return state;
  }

  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }


  switchNameClicked = (newName) => {
    console.log("Button clicked!")
    // this.state.person[1].name = "Ved";  Do not mutate state directly. Use setState()  react/no-direct-mutation-state
    this.setState({
      person: [
        { name: "Shivam", age: '23' },
        { name: newName, age: "55" },
        { name: "Deepak", age: 29 }
      ]
    });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.person.findIndex((person) => {
      return person.id === id;
    });

    const person = { ...this.state.person[personIndex] };
    person.name = event.target.value;
    const persons = [...this.state.person];
    persons[personIndex] = person;

    this.setState({ person: persons });

    // this.setState({ person: persons, changeCounter: this.state.changeCounter + 1 })
    // this.setState works asynchronously so do not use the above commented code to update the state as this wiil refer to some old state but not prev state
    // so the idea is to use the fuctional setState version when the data represents on the prev state
    this.setState((prevState, props) => {
      return {
        person: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  };

  togglePerson = () => {
    const currentShowState = this.state.showPersons;
    this.setState({ showPersons: !currentShowState });
  }

  deletePersonHandler = (index) => {
    const curPersons = [...this.state.person];
    curPersons.splice(index, 1);
    this.setState({ person: curPersons });
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log("[App.js] render");

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons
            persons={this.state.person}
            deletePersonHandler={this.deletePersonHandler}
            nameChangedHandler={this.nameChangedHandler}>
          </Persons>
        </div>
      );
    }

    return (
      <StyleRoot>
        <AuthContext.Provider value = {{authenticated: this.state.authenticated, login: this.loginHandler}}>
          <div className='App'>
            <Cockpit
              title={this.props.title}
              togglePerson={this.togglePerson}
              person={this.state.person}>
            </Cockpit>
            {persons}
          </div>
        </AuthContext.Provider>
      </StyleRoot>
    );

  }
}

export default Radium(App);
