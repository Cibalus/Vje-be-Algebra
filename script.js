"use strict";

function search() {
    const searchTerm = document.getElementById('searchInput').value;

    document.getElementById('loader').style.display = 'block';
    fetch(`https://itunes.apple.com/search?term=${searchTerm}&entity=song`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loader').style.display = 'none';
            displayResults(data.results);
        })
        .catch(error => {
            document.getElementById('loader').style.display = 'none';
            console.error('Greška prilikom dohvaćanja podataka:', error);
        });
}

function displayResults(results) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';
    if (results.length === 0) {
        resultContainer.innerHTML = 'Nema rezultata za traženi termin.';
        return;
    }

    const table = document.createElement('table');
    const headerRow = table.insertRow(0);
    const headerCell1 = headerRow.insertCell(0);
    const headerCell2 = headerRow.insertCell(1);
    const headerCell3 = headerRow.insertCell(2);

    headerCell1.textContent = 'Slika';
    headerCell2.textContent = 'Pjesma';
    headerCell3.textContent = 'Izvođač';

    for (let i = 0; i < results.length; i++) {
        const row = table.insertRow(i + 1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        const image = document.createElement('img');
        image.src = results[i].artworkUrl100;

        cell1.appendChild(image);
        cell2.textContent = results[i].trackName;
        cell3.textContent = results[i].artistName;
    }

    resultContainer.appendChild(table);
}


