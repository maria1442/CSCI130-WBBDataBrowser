# WNBA Data Browser Project README


## Overview

This is the WNBA Data Browser! It was developed as part of the CSCI 130 - Web Programming course at Fresno State University. This project is designed to showcase a comprehensive collection of WNBA MVP (Most Valuable Player) awarded players - focused on CRUD (Create, Read, Update, Delete) operations. 

## Files Structure

|Folders          | Description/Files                                                                                                       |
|-----------------|-------------------------------------------------------------------------------------------------------------------------|
|  **css**        | Contains `Styles.css`.                                                                                                  |
| **Js**.         | Contains `Script.js`.                                                                                                   |
| **php**         | Houses various PHP scripts (`CreateDB.php`, `Insert.php`, `Update.php`, `FetchData.php`, `Delete.php`, `Connect.php`).  |
| **Uploads**     | Directory for all image uploads.                                                                                        |
| **No Folder**   | `main.html`  - Main interface for the databrowser.                                                                      |


## Installation and Setup

1. **Install XAMPP**: Download and install XAMPP to run Apache and MySQL servers.

2. **Access the Databrowser**: Open `Main.html` to access the WNBA databrowser.

3. **Database Initialization**: If the database is not yet created, click “Create DB” to set up the WNBA database with initial data (first 5 MVP players).


## Usage

1. **Browsing Data**:

-  Click on "Display Data" to view the initial 5 MVP player objects.
-  Navigate through player records using navigation buttons (Previous, Next, Go First, Go Last).

2. **Data Management**:

- **Insert New Player**: Add a new player to the database.
- **Sort Options**: Sort players by Name (A-Z) or Default sorting.
- **Delete Player**: Remove the currently displayed player.
- **Edit Player**: Modify details of the currently displayed player.

3. **Image Management**:

- Upload player images to the server using the "Upload Image" button.


## Features



## Technologies Used

- **HTML/CSS:** For Structure and styling of the user interface.
- **JavaScript:** Used in `Script.js` for the client-side scripting and interaction.
- **PHP:** Server-side scripts (`CreateDB.php`, `Insert.php`, etc.) are written in PHP to handle database operations.
- **MySQL:** Used for storing and managing the WNBA player data.
- **XAMPP:** A local server environment to run Apache and MySQL servers for development and testing.
