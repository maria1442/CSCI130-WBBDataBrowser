class Player {
    constructor(name, year, team, position, number, img) {
        this.name = name;
        this.year = year;
        this.team = team;
        this.position = position;
        this.number = number;
        this.img = img;
    }
}

// objects of class Mvp
  const mv2023 = new Player("Breanna Stewart", 2023, "New York Liberty", "F", 30, "https://cdn.wnba.com/headshots/wnba/latest/1040x760/1627668.png");
  const mv2022 = new Player("Aja Wilson", 2022, "Las Vegas Aces", "F", 22, "https://a.espncdn.com/i/headshots/wnba/players/full/3149391.png");
  const mv2021 = new Player("Jonquel Jones", 2021, "Connecticut Sun", "F", 35, "https://media.tegna-media.com/assets/WTIC/images/5ae54781-b8f4-4647-b80a-1f7b686d2ecc/5ae54781-b8f4-4647-b80a-1f7b686d2ecc_1920x1080.jpg");
  const mv2020 = new Player("Aja Wilson", 2020, "Las Vegas Aces", "F", 22, "https://a.espncdn.com/i/headshots/wnba/players/full/3149391.png");
  const mv2019 = new Player("Elena Delle Donne", 2019, "Washington Mystics", "G", 11, "https://a.espncdn.com/combiner/i?img=/i/headshots/wnba/players/full/2491877.png&w=350&h=254");
  
  const PlayerArr = [ mv2023, mv2022, mv2021,mv2020, mv2019];

var newArr; // New array responsible for handling JSON data
var index = 0; // Holds the current index
var len = 0;


//---------------- CREATEDB()

function createDB() {                          
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
    };
    req.open("POST", "php/createDB.php", true);
    req.send();
    document.getElementById("createDB").disabled = true;
  }

//---------------- FETCHDATA()

function fetchData() {               
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // parses the JSON response
        try {
        var response = JSON.parse(this.responseText);
        } catch (err) {
            console.log('Parsing error:', err);
            console.log('Received response:', this.responseText);
        }
  
        if (response.error) {
          console.error('Error fetching data:', response.error);
          return;
        } 
        
        newArr = response;
        len = newArr.length;
        console.log(newArr);
        loadObject();
      }
    };
    xhttp.open("GET", "php/fetchData.php", true);
    xhttp.send();
  }


//---------------- BUTTONS FUNCTION


function previous() {             //goes to previous object
    if(index == 0){
        index = len -1;
        loadObject();
    }
    else {
        index--;
        loadObject();
    }
}

function next() {                   //goes to next object
    if(index == len-1){
        index = 0;
        loadObject();
    }
    else {
        index++;
        loadObject();
    }
}

function goToFirst() {              //goes to first object
    index = 0;
    loadObject();
}

function goToLast() {               //goes to last object 
    index = len-1;
    loadObject();
}



//---------------- LOADOBJECT()


function loadObject() {
 
    document.getElementById('title').value = newArr[index].name || '';
    document.getElementById('year').value = newArr[index].year || '';
    document.getElementById('team').value = newArr[index].team || '';
    document.getElementById('position').value = newArr[index].position|| '';
    document.getElementById('number').value = newArr[index].number || '';
    document.getElementById('playerImage').src = newArr[index].img || '';
    document.getElementById("currentIndex").innerHTML = index + 1 + " out of " + len;  
} 

//---------------- INSERT 



function openInsertModal() {
    document.getElementById('insertModal').style.display = 'block';
}

function closeInsertModal() {
    document.getElementById('insertModal').style.display = 'none';
}

function insertData() {
    let selectedPosition = '';
    const positions = document.getElementsByName('position');
    for (const position of positions) {
        if (position.checked) {
            selectedPosition = position.value;
            break;
        }
    }
    // Get the values entered in the HTML form
    const PlayerData = {
        name: document.getElementById('newTitle').value,
        year: document.getElementById('newYear').value,
        team: document.getElementById('newteam').value,
        position: selectedPosition,
                number: document.getElementById('newnumber').value,
        img: document.getElementById('newImg').value
    };

    // Make an AJAX request to insert the new player data into the database
    var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      if (response.success) {
        console.log('Data inserted successfully');
        closeInsertModal();
        fetchData();
      } else {
        console.log('Error inserting data');
      }
        }
    };

    req.open('POST', 'php/insert.php', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(PlayerData));
}


function deleteObj() {
    var id = index + 1; // Get the ID of the current player to be deleted

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.success) {
                console.log('Player deleted successfully');
                index--; // Decrement the index to display the previous player
                fetchData(); // Refresh the data after deletion
            } else {
                console.log('Error deleting the player');
            }
        }
    };
    xhttp.open("POST", "php/delete.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({ id: id }));
}


function edit() {
    document.getElementById('editButton').style.display = 'none';
    document.getElementById('saveButton').style.display = 'inline';
    document.getElementById('newImgURLtxt').style.display = 'inline';
    document.getElementById('newImgURL').style.display = 'inline';
    var inputs = document.getElementsByClassName('inputs');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].readOnly = false;
    }
}


function saveEdit() {
    var PlayerData = {
        id: index + 1, // Assuming the ID of the player to edit is stored in the variable 'index'
        name: document.getElementById('title').value,
        year: document.getElementById('year').value,
        team: document.getElementById('team').value,
        position: document.getElementById('position').value,
        number: document.getElementById('number').value,
        img: document.getElementById('newImgURL').value // Assuming you have an input field for the image URL
    };

    // Make an AJAX POST request to your server to save the edited player data
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.success) {
                console.log('Player data updated successfully');
                document.getElementById('editButton').style.display = 'inline';
                document.getElementById('saveButton').style.display = 'none';
                document.getElementById('newImgURLtxt').style.display = 'none';
                document.getElementById('newImgURL').style.display = 'none';
                var inputs = document.getElementsByClassName('inputs');
                for (var i = 0; i < inputs.length; i++) {
                    inputs[i].readOnly = true;
                }
                fetchData(); // Optional: Refresh the data after saving
            } else {
                console.log('Error updating player data');
            }
        }
    };
    req.open("POST", "php/update.php", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(PlayerData));
}



function sortByTitle() {
    newArr.sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();

        if (nameA < nameB) {
            return -1; // 'a' comes first
        }
        if (nameA > nameB) {
            return 1; // 'b' comes first
        }
        return 0; // names are equal
    });
    loadObject();
}


function sortDefault() {
    fetchData(); // Fetch the data again to reset it to the default order
}

function showRoster() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var players = JSON.parse(this.responseText);
            var html = "<table><tr><th>Player</th><th>Year</th><th>Team</th><th>Position</th><th>Number</th><th>Image</th></tr>";
            for(var i = 0; i < players.length; i++) {
                html += "<tr>";
                html += "<td>" + players[i].name + "</td>";
                html += "<td>" + players[i].year + "</td>";
                html += "<td>" + players[i].team + "</td>";
                html += "<td>" + players[i].position + "</td>";
                html += "<td>" + players[i].number + "</td>";
                html += "<td><img src='" + players[i].img + "' alt='Player Image' style='width:50px;'></td>";
                html += "</tr>";
            }
            html += "</table>";
            document.getElementById("rosterContainer").innerHTML = html;
            document.getElementById("rosterModal").style.display = "block";
        }
    };
    xhttp.open("GET", "php/fetchAll.php", true);
    xhttp.send();
}

function closeModal() {
    document.getElementById("rosterModal").style.display = "none";
}


function closeModal() {
    document.getElementById("rosterModal").style.display = "none";
}


function updateButtonState() {
    if (index === 0) {
        document.getElementById('previousButton').disabled = true;
        document.getElementById('firstButton').disabled = true;
    } else {
        document.getElementById('previousButton').disabled = false;
        document.getElementById('firstButton').disabled = false;
    }

    if (index === len - 1) {
        document.getElementById('nextButton').disabled = true;
        document.getElementById('lastButton').disabled = true;
    } else {
        document.getElementById('nextButton').disabled = false;
        document.getElementById('lastButton').disabled = false;
    }
}

