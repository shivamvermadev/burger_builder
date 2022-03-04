import React from 'react';
import Person from './Person/Person';

class Persons extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        console.log("[Persons.js] shouldComponentUpdate");
        return true;
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("[Persons.js] getSnapshotBeforeUpdate");
        return { message: 'Snapshot!' };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("[Persons.js] componentDidUpdate");
        console.log(snapshot)
    }

    render() {
        console.log("[Persons.js] rendering...");

        return (this.props.persons.map((person, index) => {
            return <Person
                click={() => this.props.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => { this.props.nameChangedHandler(event, person.id) }}>
            </Person>
        }));
    }
}

export default Persons;