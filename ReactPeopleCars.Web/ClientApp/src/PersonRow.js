import React from 'react';
import { Link } from 'react-router-dom';

export default function PersonRow({ person }) {
    const { firstName, lastName, age, cars, id } = person;
    return (
        <tr key={id}>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>{cars.length}</td>
            <td>
                <Link to={`/addcar/${id}`}>
                    <button className='btn btn-warning'>Add Car</button>
                </Link>
            </td>
            <td>
                <Link to={`/deletecars/${id}`}>
                    <button className='btn btn-danger'>Delete Cars</button>
                </Link>
            </td>
        </tr>
    )
}