import React from 'react';

const AttendeesList = ({attendees}) => {
    return (
        <div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Conference</th>
                    </tr>
                </thead>
                <tbody>
                    {attendees.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.conference}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendeesList;
