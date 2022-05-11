import React from 'react';
import Layout from './Layout';
import AddPerson from './AddPerson';
import PeopleCarsTable from './PeopleCarsTable';
import AddCar from './AddCar';
import { Route} from 'react-router-dom';
import DeleteCars from './DeleteCars';

export default function App() {
    return (
        <Layout>
            <Route exact path='/' component={PeopleCarsTable} />
            <Route exact path='/AddPerson' component={AddPerson} />
            <Route exact path='/AddCar/:id' component={AddCar} />
            <Route exact path='/DeleteCars/:id' component={DeleteCars} />
        </Layout>
    )
}