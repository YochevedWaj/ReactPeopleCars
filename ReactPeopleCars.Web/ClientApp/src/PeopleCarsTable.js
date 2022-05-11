import React from 'react';
import axios from 'axios';
import PersonRow from './PersonRow';
import { Link } from 'react-router-dom';
import { produce } from 'immer';

class PeopleCarsTable extends React.Component {
    state = {
        people: [],
        text: ''
    }

    componentDidMount = async () => {
        await this.loadPeople();
    }

    loadPeople = async () => {
        const { data } = await axios.get('/api/PeopleCars/getall');
        this.setState({ people: data });
    }

    onSearchChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.text = e.target.value;
        });
        this.setState(nextState);
    }

    onClearClick = () => {
        console.log('working')
        this.setState({text: ''});
    }
    render() {
        const { people, text } = this.state;
        return (
            <div>
                <div className='row'>
                    <div className='col-md-10'>
                        <input type='text' className='form-control form-control-lg' onChange={this.onSearchChange} value={text} placeholder='Search People'/>
                    </div>
                    <div className='col-md-2'>
                        <button className='btn btn-info btn-lg btn-block' onClick={this.onClearClick}>Clear</button>
                    </div>
                    <Link to='/AddPerson' className="nav-link text-light">
                        <button className="btn btn-info btn-block btn-lg mt-3" >Add Person</button>
                    </Link>
                </div>
                <table className='table table-hover table-bordered table-striped mt-5'>
                    <thead>
                        <tr>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Age</td>
                            <td>Car Count</td>
                            <td>Add Car</td>
                            <td>Delete Cars</td>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map(p =>
                            (p.firstName.includes(text) || p.lastName.includes(text)) &&
                            <PersonRow person={p} key={p.id} />
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PeopleCarsTable;