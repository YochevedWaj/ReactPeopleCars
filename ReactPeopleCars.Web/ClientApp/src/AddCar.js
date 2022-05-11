import React from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { Link } from 'react-router-dom';

class AddCar extends React.Component {
    state = {
        person:  {
            firstName: '',
            lastName: ''
        },

        personID: '',

        car: {
            make: '',
            model: '',
            year: ''
        }
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/peoplecars/getbyid?id=${id}`);
        this.setState({ person: data, personID: id });
    }

    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.car[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onSubmitClick = async () => {
        const { personID, car } = this.state;
        const copy = { ...car, personID: personID };
        await axios.post('/api/peoplecars/addcar', copy);
        console.log(copy);
        this.props.history.push('/'); //redirect back to '/' (home page)
    }

    render() {
        const { make, model, year } = this.state.car;
        return (
            <div clasName="row">
                <div className="col-md-6 offset-md-3 card card-body bg-light">
                    <input type="text" value={make} name='make' onChange={this.onTextChange} className="form-control" placeholder="Make" />
                    <br />
                    <input type="text" value={model} name='model' onChange={this.onTextChange} className="form-control" placeholder="Model" />
                    <br />
                    <input type="text" value={year} name='year' onChange={this.onTextChange} className="form-control" placeholder="Year" />
                    <br />
                    <button onClick={this.onSubmitClick} className="btn btn-primary btn-block">Submit</button>
                </div>
            </div>
        )
    }
}

export default AddCar;