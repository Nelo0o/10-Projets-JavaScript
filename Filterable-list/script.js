let dataArray = [];

async function getUsers() {
    try {
        const response = await fetch("https://randomuser.me/api/?nat=fr&results=50");
        const {results} = await response.json();
        dataArray = results.sort((a, b) => a.name.last.localeCompare(b.name.last));
        createUserList(dataArray);
    } catch (error) {
        console.log(error);
    }
}

getUsers()
    .then(() => {
        console.log("La liste a été récupérée avec succès !");
    })
    .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération de la liste :", error);
    });

const tableResults = document.querySelector(".table-results");

function createUserList(array) {
    const fragment = document.createDocumentFragment();

    array.forEach(user => {
        const listItem = document.createElement("li");
        listItem.className = "table-item";

        listItem.innerHTML = `
      <p class="main-info">
        <img src=${user.picture.thumbnail} alt="avatar picture" />
        <span>${user.name.last} ${user.name.first}</span>
      </p>
      <p class="email">${user.email}</p>
      <p class="phone">${user.phone}</p>
    `;

        fragment.appendChild(listItem);
    });

    tableResults.innerHTML = "";
    tableResults.appendChild(fragment);
}

const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", filterData);

function filterData(e) {
    const searchedString = e.target.value.toLowerCase().replace(/\s/g, "");

    const filteredArr = dataArray.filter(userData => searchForOccurences(userData));

    function searchForOccurences(userData) {
        const {first, last} = userData.name;
        const fullName = `${first}${last}`.toLowerCase();
        return (
            first.toLowerCase().includes(searchedString) ||
            last.toLowerCase().includes(searchedString) ||
            fullName.includes(searchedString)
        );
    }

    createUserList(filteredArr);
}
