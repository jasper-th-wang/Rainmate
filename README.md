<div align="center">
<h1 align="center">
<img src="./images/logo.png" width="300px" />
<h3>◦ Never Get Drenched Again</h3>
<h3>◦ Developed with the software and tools below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat-square&logo=HTML5&logoColor=white" alt="HTML5" />
</p>
<img src="https://img.shields.io/github/license/jasper-th-wang/1800_202330_DTC05?style=flat-square&color=5D6D7E" alt="GitHub license" />
<img src="https://img.shields.io/github/last-commit/jasper-th-wang/1800_202330_DTC05?style=flat-square&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/commit-activity/m/jasper-th-wang/1800_202330_DTC05?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/languages/top/jasper-th-wang/1800_202330_DTC05?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

---

## 📖 Table of Contents

- [📖 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [🎈 Demo](#-demo)
- [📦 Features](#-features)
- [📂 Repository Structure](#-repository-structure)
- [⚙️ Modules](#modules)
- [🚀 Getting Started](#-getting-started)
  - [🔧 Installation](#-installation)
  - [🤖 Running RainMate](#-running-rainmate)
- [🛠️ Technologies and Resources Used](#technologies-and-resources-used)
- [⚠️ Known Bugs and Limitations](#known-bugs-and-limitations)
- [🛣 Roadmap](#-roadmap)
- [👏 Contributors](#-contributors)

---

## 📍 Overview

The RainMate app provides an umbrella-sharing service, enabling users to reserve and return umbrellas via a web-based platform. It features a main landing page, reservation details, confirmation with QR code generation for verification, and personal umbrella management. The service emphasizes eco-friendliness, affordability, and instant access, leveraging modern web technologies, geolocation, and real-time database interactions for a seamless user experience. RainMate caters to those needing temporary shelter from the rain, merging convenience with environmental consciousness.

---

## 🎈 Demo

Here is the link to the live demo of this app:

https://bcit-comp1800-dtc05-rainmate.web.app/

---

## 📦 Features

- Map View of Vendors: upon opening the app, you can see all the participating vendors near you at a glance.
  - You can click on the pin to see details with a popup.
  - After dragging to a different location, a search area button will appear, and it allows user to search for vendors near this particular location.
- List View of Vendors: at the top of the screen, users can navigate to the list view, and see all the vendors within the 2 km radius.
  - users are able to use the slider on the top to select the desired radius to search.
  - vendors are sorted by distance by default!
- Reserving an umbrella: user can easily reserve an umbrella by clicking a vendor, click **Reserve**, and a reservation document will be generated along with a QR code representing the _Reservation ID_.
- Pickup an umbrella: your reservation QR code is conveniently located at your my umbrella page.
- Return an umbrella: return to any vendor you like! Go to any location, click on their vendor page in RainMate, you will see a **Return** button that allows you to return anywhere, anytime.
- My Umbrella Page: all your reservation information and remaining time for pickup or return, and pickup and return QR code are all available at a glance on this page!

---

## 📂 Repository Structure

```sh
└── 1800_202330_DTC05/
    ├── components/
    │   ├── footerNav.html
    │   ├── nav_after_login.html
    │   └── nav_before_login.html
    ├── images/
    │   ├── icons/
    │   ├── vendors/
    ├── index.html
    ├── list.html
    ├── login.html
    ├── confirmation.html
    ├── main.html
    ├── my_umbrella.html
    ├── reservation.html
    ├── return.html
    ├── vendor.html
    ├── skeleton.html
    ├── scripts/
    │   ├── QR.js
    │   ├── authentication.js
    │   ├── confirmation.js
    │   ├── geohash-bundle.js
    │   ├── geohash-main.js
    │   ├── list.js
    │   ├── main.js
    │   ├── map.js
    │   ├── my_umbrella.js
    │   ├── qrcode.js
    │   ├── reservation.js
    │   ├── script.js
    │   ├── skeleton.js
    │   ├── timer.js
    │   └── vendor.js
    └── styles/
        └── style.css


```

---

## ⚙️ Modules

<details closed><summary>Root</summary>

| File                                                                                                 | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [index.html](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/index.html)               | The provided code is an HTML template for the main landing page of RainMate, an umbrella-sharing service app. It includes metadata, links to jQuery, Bootstrap, Firebase libraries, Google Fonts, and stylesheets. The body consists of a navigation bar, a welcome section promoting the service, a section explaining its benefits (Instant Access, Affordable, Eco-friendly), a video demonstrating app usage, a signup prompt, and a footer with copyright and contact links. JavaScript at the bottom ensures users start logged out. The associated directory structure suggests various HTML pages, UI components, images, and scripts, indicating a feature-rich web application.          |
| [reservation.html](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/reservation.html)   | This HTML file is a template for a Reservation Details page as part of the RainMate umbrella rental service. It outlines rental rules and provides confirm/cancel actions. It leverages Bootstrap for styling, loads custom styles, and integrates Firebase for backend services. The page dynamically loads navigation and footer components, likely through the referenced JavaScript files. It requires the user to adhere to rental timings, return policies, and provides guidance for cancellations and emergencies.                                                                                                                                                                         |
| [confirmation.html](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/confirmation.html) | This HTML document is a reservation confirmation page equipped with Bootstrap and jQuery, leveraging Firebase for backend functionalities. It displays a success message confirming a user's reservation and provides QR code functionality, likely for reservation verification. There are links to return to the main map or to view personal umbrella details. Additional scripts enhance page interactivity and connectivity with backend services, while custom styles are applied for visual presentation.                                                                                                                                                                                   |
| [my_umbrella.html](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/my_umbrella.html)   | This HTML file is for the My Umbrella page of RainMate, a web application for umbrella reservation. It includes a welcome message, timer display, reservation details, QR code modal, and navigational elements. It utilizes Bootstrap for layout and styling, jQuery for DOM manipulation, and Firebase for backend services—authentication, database, and storage. Custom scripts manage UI interactions and the app's functionality. Google fonts and Material icons are used for typography and UI icons, with custom styling for the umbrella icon.                                                                                                                                           |
| [list.html](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/list.html)                 | The HTML document list.html serves as the listing page for the RainMate app, setting up a web interface that includes a navbar, a content section with a distance filter and a results display, and a footer. It employs Bootstrap for styling, loads fonts from Google (Bree Serif, Pacifico, Tilt Neon, and Barlow), and uses Firebase for backend services. Custom styling is applied from style.css. The page features interactive elements for filtering results based on distance and dynamically displaying vendor information within a template. JavaScript files for functionality are linked at the bottom.                                                                              |
| [skeleton.html](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/skeleton.html)         | The provided HTML skeleton template, named `skeleton.html`, is part of a project named RainMate. It defines the base structure for web pages with essential meta tags, links to jQuery, Bootstrap CDN, Google Fonts, Firebase Libraries for authentication and Firestore, and a Google Material Icons stylesheet. The file also links to a custom global stylesheet and includes a loader animation. It preloads components for the navbar and initializes Firebase and other scripts essential for the application's functionality.                                                                                                                                                               |
| [login.html](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/login.html)               | The HTML code renders a login page for RainMate, utilizing Bootstrap for styling and responsive design, along with jQuery. It includes Google Fonts and Material Icons for aesthetics. The page integrates Firebase for user authentication, employing Firebase libraries for managing the app, authentication, and UI components. It loads custom styles from style.css in the styles directory and JavaScript for functional aspects from authentication.js and skeleton.js in the scripts directory, with Firebase configuration presumably in firebaseAPI.js. The body consists of a navigation bar, a container with a login prompt, and placeholders for Firebase UI and a loader animation. |
| [main.html](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/main.html)                 | The provided code is an HTML page for RainMate, which includes headers with CSS and JS resources such as Bootstrap, jQuery, Firebase, Google Fonts, and Mapbox. The body contains a loader animation, a toggling navbar to switch between Map and List views, a Mapbox container for displaying maps, and a footer navigation bar. Additionally, there are references to custom scripts and styles for page functionality and aesthetics.                                                                                                                                                                                                                                                          |
| [vendor.html](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/vendor.html)             | The HTML page, vendor.html, is a part of a web application named RainMate that deals with umbrella reservations. It utilizes jQuery, Bootstrap, Google Fonts, Google Material Icons, and Firebase for functionality and styling. The page shows a vendor's details, including an image, availability of umbrellas, location, operational hours, and contact information. It features dynamic elements such as buttons for reserving and returning umbrellas, with conditions for display. The navigation bar and footer are modular components, and specific scripts for page behavior and Firebase implementation are linked.                                                                     |
| [return.html](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/return.html)             | The return.html page provides instructions and conditions for returning an umbrella to a participating store, within a two-day limit to avoid additional fees. It includes navigational elements, loading indicators, and scripts for QR code generation and Firebase integration, alongside external libraries like jQuery, Bootstrap, and Google Fonts, enhancing functionality and design aesthetics. It also contains back-navigation and action buttons linked to the application's map and user-specific umbrella information.                                                                                                                                                               |

</details>

<details closed><summary>Styles</summary>

| File                                                                                        | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [style.css](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/styles/style.css) | The provided code is a CSS stylesheet for a web application with various pages and components, including navigation bars, image backgrounds, buttons, lists, cards, modals, vendor features, map UI, and loading animations. It applies custom styles for smooth scrolling, font families, layout, image handling, and responsive design for different screen sizes. Key functionalities include setting overflow behavior, text and background styling, layout adjustments via padding and margin, button and link customizations, list presentation, modals for pop-up content, and visual feedback with loaders. The code includes media queries for responsive design adjustments, ensuring the application's interface is visually consistent and functional across devices. |

</details>

<details closed><summary>Components</summary>

| File                                                                                                                    | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [nav_after_login.html](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/components/nav_after_login.html)   | The `nav_after_login.html` component is a navigation bar for logged-in users of the RainMate app, featuring links to the app's main map page, the user's personal umbrella management page, and placeholder links for promotional and about pages. It also includes a log-out button that redirects to the homepage. The navigation bar is collapsible, making it responsive for mobile and tablet use.                                                                                                      |
| [nav_before_login.html](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/components/nav_before_login.html) | The directory structure reveals a web project with HTML pages, scripts, styles, and images. The nav_before_login.html within components contains a navigational bar for the RainMate website, visible before a user logs in. It includes a company logo linking to the homepage, a collapsible menu with options Why RainMate, About Us, and Contact, and a Sign In button redirecting to the login page. The navigation is responsive and leverages Bootstrap's collapse functionality for smaller screens. |
| [footerNav.html](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/components/footerNav.html)               | The provided code segment is an HTML snippet defining a mobile navigation footer with two linked icon elements. The footer contains clickable SVG icons, one for navigating to the main.html page, represented by an explore icon, and another for accessing my_umbrella.html, represented by an umbrella icon. Each icon is enclosed in an anchor tag specifying the target URL, ensuring user navigation within the website upon interaction.                                                              |

</details>

<details closed><summary>Scripts</summary>

| File                                                                                                         | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [geohash-main.js](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/scripts/geohash-main.js)     | This script uses the GeoFire library to perform geospatial queries on Firestore to find vendor records within a specified radius of a center point, accounting for GeoHash precision limitations. It compiles multiple Firestore queries for geohash ranges, merges their results, and filters for actual proximity before returning the set of vendors truly within the desired radius. The main function is made globally accessible through the `window` object for use in a browser context.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [timer.js](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/scripts/timer.js)                   | The `timer.js` script initializes a countdown timer based on a Firestore timestamp. If an item has been picked up (`isPickedUp` is true), the due date is set to 2 days later; otherwise, it's 20 minutes later. It updates the countdown every second, displaying days, hours, minutes, and seconds on the element with the id timer. If the countdown expires, it stops updating, notifies the user pickup is unavailable, disables interaction elements, and greys out relevant visual components. The same function code appears duplicated, possibly due to a copy-paste error.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [skeleton.js](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/scripts/skeleton.js)             | The `skeleton.js` script dynamically adjusts navigation elements depending on user authentication status. For authenticated users, it loads navigation templates for after login and a footer. It then retrieves user data from a Firebase database collection, storing it in the session. Unauthenticated users only see the pre-login navigation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [qrcode.js](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/scripts/qrcode.js)                 | The `qrcode.js` script integrates a QR code generation library into the web application without dependencies, allowing for the creation of QR codes using static data. This script is open-source, released under the MIT license, and leverages the technology established by Kazuhiko Arase. The directory structure indicates that the script is part of a larger project with various HTML pages and components, likely facilitating user logins, navigation, reservations, and other interactions which may involve QR code functionality.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [reservation.js](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/scripts/reservation.js)       | This script, part of a web application, handles creating a new reservation. It retrieves the vendor ID from the URL, stores reservation details including the user ID, vendor ID, and timestamp in Firebase, and updates the user's current reservation ID in the database. When a reservation form is submitted, it registers the reservation, displays a loading screen, and redirects to a confirmation page. Additionally, it removes a loader on page load. This script depends on Firebase for authentication and data storage.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [geohash-bundle.js](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/scripts/geohash-bundle.js) | This JavaScript code utilizes the `geofire-common` library to provide geolocation functionality for a database collection named vendors. It enables the calculation of a geohash (a string representing location) for specific latitude/longitude coordinates and stores this hash in a database. It includes functions to add geohashes to vendor entries in the database, query vendors within a certain radius of a given center point, and test these functionalities. The `getVendorsInRadius` function is exposed globally to allow querying vendors within a specific radius.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [list.js](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/scripts/list.js)                     | The script list.js integrates with a Firebase backend to generate a dynamic list of vendors on list.html. It retrieves vendor data, creates cards with vendor details, sorts them by proximity to the user's location, and updates distance information post-initialization using geolocation. The user can filter vendors within a specific radius via a UI element, and the search results are updated accordingly. The script handles vendor data storage in session storage, with additional functionality for handling the display of a loading screen and toggle between map and list views.                                                                                                                                                                                                                                                                                                                                                                                                           |
| [vendor.js](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/scripts/vendor.js)                 | The `vendor.js` script is used to render vendor details on a webpage, obtaining the vendor ID from the URL query parameters. It fetches this vendor's information from a database, such as umbrella availability, thumbnail image, name, address, and hours of operation, to dynamically populate the relevant sections of the `vendor.html` with these details. Additionally, it controls the display of reservation buttons based on the presence of a current reservation and the status of any reservation (picked up or not), triggering the appropriate UI for returning an umbrella or blocking new reservations if necessary.                                                                                                                                                                                                                                                                                                                                                                        |
| [script.js](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/scripts/script.js)                 | This code provides utility functions for a web application, consisting of user logout via Firebase authentication, dynamic loading screen display and removal, distance calculation between user and vendors using latitude and longitude coordinates, updating vendor distances in session storage, and event listeners for toggling between map and list views.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [main.js](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/scripts/main.js)                     | The `main.js` script manages the display toggle between Map and List views on the `main.html` page within the `1800_202330_DTC05` project directory.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [confirmation.js](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/scripts/confirmation.js)     | The script `confirmation.js` is designed to generate and display a QR code on the `confirmation.html` page using a reservation ID fetched from the URL's query parameters. It waits for the document to load, retrieves the id parameter, generates the QR code if the id is present, logs an error if it's not, and then removes the page loader.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [QR.js](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/scripts/QR.js)                         | The `QR.js` script facilitates the generation of QR codes for reservations. It retrieves reservation data from the session storage, extracts the reservation ID, and invokes `generateQRCode()` to create a QR code with this ID. If no reservation ID is present, it logs an error. The `generateQRCode()` function creates a QR code with specific dimensions and color scheme, using the qrcode.js library.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [map.js](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/scripts/map.js)                       | This code is for a web application using MapBox to display an interactive map with dynamic features. It includes functions to:-Parse URL parameters to obtain coordinates for a vendor location.-Create a home button allowing users to view nearby vendors based on the map's center position.-Renders vendors within a specified radius based on map zoom using async data retrieval and adapts radius accordingly.-Generate HTML content for map markers with vendor details (including operating hours, umbrellas available, and image).-Populate and display the map with custom controls, vendor markers (with descriptions as popups), and user geolocation (with high accuracy and tracking).-Dynamically adjust vendor info popup based on user interaction with the map.-Utilize local and session storage to manage location data and vendor details.Overall, the script manages map interactions, dynamically displays vendor information, and responds to user location and input on a webpage. |
| [my_umbrella.js](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/scripts/my_umbrella.js)       | The code manages an umbrella rental service where users can reserve, pick up, and return umbrellas. It handles reservations by updating the Firestore database with pickup and return timestamps, and user actions (pickup, return, cancel). It dynamically displays status messages, the vendor's details, manages the reservation timer, and adjusts the vendor's umbrella count. Additionally, modal functionality controls user interactions while handling authentication states. The code emphasizes user experiences by showing loading screens during transactions and incorporates a delayed reload for demonstration purposes.                                                                                                                                                                                                                                                                                                                                                                     |
| [authentication.js](https://github.com/jasper-th-wang/1800_202330_DTC05/blob/main/scripts/authentication.js) | The `authentication.js` script integrates Firebase Authentication with a Firestore backend. It initializes Firebase UI for handling user authentication, setting up a configuration that dictates the sign-in flow (using popups), where users are redirected after successful login, and what authentication providers to offer (currently only email is active). For new users, the script creates a user record in Firestore with details like name, email, signup date, and reservation status, redirecting to main.html upon completion. Existing users are signed in directly. There's also a UI callback to hide the loader once the widget is active.                                                                                                                                                                                                                                                                                                                                                |

</details>

---

## 🚀 Getting Started

**_Dependencies_**

Please ensure you have the following dependencies installed on your system:

`- ℹ️ Dependency: live-server`

### 🔧 Installation

1. Clone the 1800_202330_DTC05 repository:

```sh
git clone https://github.com/jasper-th-wang/1800_202330_DTC05
```

2. Change to the project directory:

```sh
cd 1800_202330_DTC05
```

### 🤖 Running RainMate

```sh
live-server .
```

---

## Technologies and Resources Used

Here is a list of technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used:

- HTML, CSS, JavaScript
- Bootstrap 5.0 (Frontend library)
- Firebase 8.0 (BAAS - Backend as a Service)
- Google Fonts: Barlow and Bree Serif
- MapBox GL JS API
- GeoFire.js 6.0
- QRCode.js
- Google Map Search data is used for mock Vendors information

---

## Known Bugs and Limitations

Here are some known bugs:

- When the timer is expired for return, there is no penalty or message indicating the fine user will receive for returning the umbrella late.
- If user enters the map page and quickly click the _list_ button to go to `list.html`, because `list.js` first uses user's location data from the session storage, it will rendered all the distance as "0 m" at first. However, `list.js` will update user's location data in the background to fix this error.
- Sometimes reservation QR code does not render on first load when user clicks on the _Pickup/Cancel_ button in `my_umbrella.html`, a refresh of the page is needed.

---

## 🛣 Roadmap

What we'd like to build in the future:

- Bug fixes: we want to optimize the user experience as much as possible by fixing the known bugs mentioned above.
- Query optimization: the amount of read query is more than desired, in the future we wish to optimize our query algorithm.

---

## 👏 Contributors

- Jasper Wang: Lead JavaScript Developer. Bringing enthusiasm and expertise to the forefront of our app's dynamic functionality and interactive features.
  - Contact: jasper8777@icloud.com
- Flora Deng: HTML/CSS Specialist. Focused on crafting the user interface with precision and creative flair to ensure an engaging user experience.
  - Contact: hdeng24@my.bcit.ca
- Joey Cho: HTML/CSS/JavaScript Developer and Designer. Infusing the project with innovative design ideas and a keen eye for aesthetic detail, enhancing the overall look and feel of the application.
  - Contact: joeycho1208@gmail.com

[**Return**](#Top)

---
