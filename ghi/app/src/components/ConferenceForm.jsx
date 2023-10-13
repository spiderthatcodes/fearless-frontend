/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

const ConferenceForm = () => {
    const [locations, setLocations] = useState([]);
    const [name, setName] = useState('');
    const [starts, setStarts] = useState('');
    const [ends, setEnds] = useState('');
    const [description, setDescription] = useState('');
    const [presentations, setPresentations] = useState(0);
    const [attendees, setAttendees] = useState(0);
    const [location, setLocation] = useState(0)

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const conference = {
            name: name,
            starts: starts,
            ends: ends,
            description: description,
            max_presentations: presentations,
            max_attendees: attendees,
            location: location
        }

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
        method: "post",
        body: JSON.stringify(conference),
        headers: {
            'Content-Type': 'application/json',
        },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            setAttendees(0)
            setDescription('')
            setEnds('')
            setLocation(0)
            setName('')
            setPresentations(0)
            setStarts('')
            }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='offset-3 col-6'>
                    <div className='shadow p-4 mt-4'>
                        <h1>Create a new conference</h1>
                        <form onSubmit={handleSubmit} id='create-conference-form'>
                            <div className='form-floating mb-3'>
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    placeholder='Name'
                                    required
                                    type='text'
                                    id='name'
                                    name='name'
                                    className='form-control'
                                />
                                <label htmlFor='name'>Name</label>
                            </div>

                            <div className='form-floating mb-3'>
                                <input
                                    onChange={(e) => setStarts(e.target.value)}
                                    value={starts}
                                    type='date'
                                    name='starts'
                                    id='starts'
                                    className='form-control'
                                />
                                <label htmlFor='starts'>Starts</label>
                            </div>

                            <div className='form-floating mb-3'>
                                <input
                                    onChange={(e) => setEnds(e.target.value)}
                                    value={ends}
                                    type='date'
                                    name='ends'
                                    id='ends'
                                    className='form-control'
                                />
                                <label htmlFor='ends'>Ends</label>
                            </div>

                            <div className='form-floating mb-3'>
                                <textarea
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    value={description}
                                    name='description'
                                    id='description'
                                    cols='50'
                                    rows='5'
                                    className='form-control'
                                ></textarea>
                                <label htmlFor='description'>Description</label>
                            </div>

                            <div className='form-floating mb-3'>
                                <input
                                    onChange={(e) =>
                                        setPresentations(e.target.value)
                                    }
                                    value={presentations}
                                    placeholder='Max presentations'
                                    required
                                    type='number'
                                    id='max_presentations'
                                    name='max_presentations'
                                    className='form-control'
                                />
                                <label htmlFor='max_presentations'>
                                    Max presentations
                                </label>
                            </div>

                            <div className='form-floating mb-3'>
                                <input
                                    onChange={(e) =>
                                        setAttendees(e.target.value)
                                    }
                                    value={attendees}
                                    placeholder='Max attendees'
                                    required
                                    type='number'
                                    id='max_attendees'
                                    name='max_attendees'
                                    className='form-control'
                                />
                                <label htmlFor='max_attendees'>
                                    Max attendees
                                </label>
                            </div>

                            <div className='mb-3'>
                                <select
                                    onChange={(e) => setLocation(e.target.value)}
                                    value={location}
                                    required
                                    id='location'
                                    name='location'
                                    className='form-select'
                                >
                                    <option>
                                        Choose a location
                                    </option>
                                    {locations.map((loc, index) => (
                                        <option
                                            key={index}
                                            value={loc.id}
                                        >
                                            {loc.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button className='btn btn-primary'>Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConferenceForm;
