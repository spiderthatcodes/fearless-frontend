function createCard(name, description, pictureUrl, starts, ends, location) {
    return `
    <div class="col-4">
        <div class="card">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${location}</h6>
            <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">
            ${starts} to ${ends}
            </div>
        </div>
    </div>
  `;
}

function createAlert() {
    return `
    <div class="alert alert-primary" role="alert">
        Your data is messed up!
    </div>`
}

function formatDate(date) {
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', {
        month: '2-digit',
    });
    const day = date.toLocaleString('default', { day: '2-digit' });

    return [month, day, year].join('-');
}

window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const html = createAlert()
            const row = document.querySelector('.row');
            row.innerHTML += html;
        } else {
            const data = await response.json();

            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    // console.log(details)
                    const starts = formatDate(
                        new Date(details.conference.starts)
                    );
                    const ends = formatDate(new Date(details.conference.ends));
                    const title = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const location = details.conference.location.name;
                    const html = createCard(
                        title,
                        description,
                        pictureUrl,
                        starts,
                        ends,
                        location
                    );
                    const column = document.querySelector('.row');
                    column.innerHTML += html;
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
});
