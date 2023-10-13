/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

const LocationForm = () => {
    const [states, setStates] = useState([]);
    const [name, setName] = useState('');
    const [rooms, setRooms] = useState(0)
    const [state, setState] = useState('')
    const [city, setCity] = useState('')


    const fetchData = async () => {
        const url = 'http://localhost:8000/api/states/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setStates([...data.states]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const location = {
            name: name,
            room_count: rooms,
            city: city,
            state: state
        }
        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(location),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
          setName('');
          setRooms(0);
          setCity('');
          setState('');
        }
    }

    return (
        <div className='row'>
            <div className='offset-3 col-6'>
                <div className='shadow p-4 mt-4'>
                    <h1>Create a new location</h1>
                    <form onSubmit={handleSubmit} id='create-location-form'>
                        <div className='form-floating mb-3'>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Name'
                                value={name}
                                required
                                type='text'
                                name='name'
                                id='name'
                                className='form-control'
                            />
                            <label htmlFor='name'>Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input
                                placeholder='Room count'
                                onChange={(e) => setRooms(e.target.value)}
                                value={rooms}
                                required
                                type='number'
                                name='room_count'
                                id='room_count'
                                className='form-control'
                            />
                            <label htmlFor='room_count'>Room count</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input
                                onChange={(e) => setCity(e.target.value)}
                                placeholder='City'
                                value={city}
                                required
                                type='text'
                                name='city'
                                id='city'
                                className='form-control'
                            />
                            <label htmlFor='city'>City</label>
                        </div>
                        <div className='mb-3'>
                            <select
                                onChange={(e) => setState(e.target.value)}
                                required
                                value={state}
                                name='state'
                                id='state'
                                className='form-select'
                            >
                                <option
                                    defaultValue=''
                                    value=''
                                >
                                    Choose a state
                                </option>
                                {states.map((state, index) => (
                                        <option key={index} value={state.abbreviation}>
                                            {state.name}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                        <button className='btn btn-primary'>Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LocationForm;
