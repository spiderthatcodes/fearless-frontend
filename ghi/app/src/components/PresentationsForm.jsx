import { useEffect, useState } from 'react';

const PresentationsForm = () => {
    const [conferences, setConferences] = useState([]);
    const [presenter, setPresenter] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [conference, setConference] = useState(0);

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setConferences(data.conferences);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const presentation = {
            presenter_name: presenter,
            presenter_email: email,
            company_name: company,
            title: title,
            synopsis: synopsis,
        };
        let conferenceId = conference;
        const locationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(presentation),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            setCompany('')
            setCompany('')
            setEmail('')
            setPresenter('')
            setTitle('')
            setSynopsis('')
        }
    };
    return (
        <div className='container'>
            <div className='row'>
                <div className='offset-3 col-6'>
                    <div className='shadow p-4 mt-4'>
                        <h1>Create a new presentation</h1>
                        <form
                            onSubmit={handleSubmit}
                            id='create-presentation-form'
                        >
                            <div className='form-floating mb-3'>
                                <input
                                    onChange={(e) =>
                                        setPresenter(e.target.value)
                                    }
                                    value={presenter}
                                    placeholder='Presenter name'
                                    required
                                    type='text'
                                    name='presenter_name'
                                    id='presenter_name'
                                    className='form-control'
                                />
                                <label htmlFor='presenter_name'>
                                    Presenter name
                                </label>
                            </div>
                            <div className='form-floating mb-3'>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder='Presenter email'
                                    required
                                    type='email'
                                    name='presenter_email'
                                    id='presenter_email'
                                    className='form-control'
                                />
                                <label htmlFor='presenter_email'>
                                    Presenter email
                                </label>
                            </div>
                            <div className='form-floating mb-3'>
                                <input
                                    onChange={(e) => setCompany(e.target.value)}
                                    value={company}
                                    placeholder='Company name'
                                    type='text'
                                    name='company_name'
                                    id='company_name'
                                    className='form-control'
                                />
                                <label htmlFor='company_name'>
                                    Company name
                                </label>
                            </div>
                            <div className='form-floating mb-3'>
                                <input
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    placeholder='Title'
                                    required
                                    type='text'
                                    name='title'
                                    id='title'
                                    className='form-control'
                                />
                                <label htmlFor='title'>Title</label>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='synopsis'>Synopsis</label>
                                <textarea
                                    onChange={(e) =>
                                        setSynopsis(e.target.value)
                                    }
                                    value={synopsis}
                                    className='form-control'
                                    id='synopsis'
                                    rows='3'
                                    name='synopsis'
                                ></textarea>
                            </div>
                            <div className='mb-3'>
                                <select
                                    onChange={(e) =>
                                        setConference(e.target.value)
                                    }
                                    value={conference}
                                    required
                                    name='conference'
                                    id='conference'
                                    className='form-select'
                                >
                                    <option defaultValue=''>
                                        Choose a conference
                                    </option>
                                    {conferences.map((item, index) => (
                                        <option
                                            key={index}
                                            value={item.id}
                                        >
                                            {item.name}
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

export default PresentationsForm;
