import React from 'react';
import axios from 'axios';

class DeleteCars extends React.Component {
    state = {
        person: {
            id: '',
            firstName: '',
            lastName: '',
            cars: []
        },
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/peoplecars/getbyid?id=${id}`);
        this.setState({ person: data });
    }


    onYesClick = async () => {
        const { id } = this.state.person;
        await axios.post('/api/peoplecars/DeleteCarsForPerson', { id });
        this.props.history.push('/');

    }

    onNoClick = async () => {
        this.props.history.push('/');
    }

    carRow = ({ id, make, model, year }) => {
        return (
            <tr key={id}>
                <td>{make}</td>
                <td>{model}</td>
                <td>{year}</td>
            </tr>
        )
    }

    render() {
        const { cars, firstName, lastName } = this.state.person;
        return (
            <div>

                <table className='table table-hover table-bordered table-striped'>
                    <thead>
                        <tr>
                            <td>Make</td>
                            <td>Model</td>
                            <td>Year</td>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(this.carRow)}
                    </tbody>
                </table>
                <h1 className='text-danger'>Are you sure you want to delete {firstName} {lastName}'s cars??</h1>
                <div className="row" style={{ marginBottom: 20 }}>
                    <div className="col-md-5">
                        <button className='btn btn-primary btn-block' onClick={this.onYesClick}>Yes</button>
                    </div>
                    <div className="col-md-5">
                        <button className='btn btn-warning btn-block' onClick={this.onNoClick}>No</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteCars;