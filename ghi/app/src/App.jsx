import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import AttendeesList from './components/AttendeesList';
import LocationForm from './components/LocationForm';
import ConferenceForm from './components/ConferenceForm';
import PresentationsForm from './components/PresentationsForm';
import MainPage from './components/MainPage';

const App = ({ attendees }) => {
    return (
        <>
            <Router>
                <Nav />
                    <Routes>
                        <Route
                            path='/attendees'
                            element={<AttendeesList attendees={attendees} />}
                        />
                        <Route
                            path='/locations/new'
                            element={<LocationForm />}
                        />
                        <Route
                            path='/conferences/new'
                            element={<ConferenceForm />}
                        />
                        <Route
                            path='/presentations/new'
                            element={<PresentationsForm />}
                        />
                        <Route
                            path='/'
                            element={<MainPage />}
                        />

                    </Routes>
            </Router>
        </>
    );
};

export default App;
