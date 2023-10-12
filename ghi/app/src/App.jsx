import Nav from './Nav';

const App = ({ attendees }) => {
    return (
        <>
        <Nav />
        <div className="container">
            <table className="table table-striped">
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
        </>
    );
};

export default App;
