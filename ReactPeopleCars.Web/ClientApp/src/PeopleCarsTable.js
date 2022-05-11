import React from 'react';
import axios from 'axios';
import PersonRow from './PersonRow';

class PeopleCarsTable extends React.Component {
    state = {
        people: [],
    }

    componentDidMount = async () => {
        await this.loadPeople();
    }

    loadPeople = async () => {
        const { data } = await axios.get('/api/PeopleCars/getall');
        this.setState({ people: data });
    }
    render() {
        return (
            <div>
                <table className='table table-hover table-bordered table-striped'>
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
                        {this.state.people.map(p =>
                            <PersonRow person={p} />
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PeopleCarsTable;