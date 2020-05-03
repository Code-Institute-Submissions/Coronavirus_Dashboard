# Coronavirus Dashboard Ireland

---

## Contents:

* UX
    * Design Choices
        * Fonts
        * Colours       
    * Wireframes
* Goals
    * Project Goals
    * User Goals
* User Stories
* Features
* Future Goals
* Project Planning
* Technology Used
* Testing
    * Issues and Resolutions
* Deployment
* Credits
* Acknowledgements

---

## UX (User Experience)

The design of this site is pretty simple. There is a navigation menu on the left hand side to go between the different pages of the website.
In the dashboard there is a tabbed menu to swap between the graphs and the interactive map of Ireland

### Design Choices

#### Fonts
For the body font I chose a sans-serif font called Segoe UI as this font is very readible at small sizes. This is important when displaying lots of data.
For the Heading font I chose Helvetica as this font pairs well with Segoe UI  

#### Colours
Since this is a dasboard I kept the colours simple so that the data would be easy to read

* Background: #f5f6fa
* Side Bar Background: #353a40
* Chart Boxes: #FFF
* Highlight Colour: #19a1b7

### Wireframe Mockups

### Homepage

<div style="text-align:center;">
    <img src="assets\Homepage.png"></img><br>
</div>

### Graphs

<div style="text-align:center;">
    <img src="assets\Dashboard Graphs.png"></img><br>
</div>

### Interactive SVG

<div style="text-align:center;">
    <img src="assets\Interactive SVG.png"></img><br>
</div>

### Contact Page

---

## Goals

### Project Goals

This project was developed to display the Coronavirus statistics for Ireland in an easy to use dashboard allowing users to stay up to date with the latest figures. Statistics can be analysed through charts and an interactive map of Ireland. The user can also sign up to receive daily updates by email

### User goals

The user needs to be able to easily view the latest figures for the Coronavirus

---

## User stories

1. As a user I want to be able to see the latest Coronavirus figures for Ireland.
2. As a user I want to be able to see the latest Coronavirus figures for specific counties in Ireland.
3. As a user I want to be able to see the amount of confirmed cases, deaths, recoveries in total and for today.
4. As a user I want to be able to see the breakdown of figures related to gender, age and how the virus is transmitted.
5. As a user I want to be kept up to date with the latest daily figures.

---

## Features

### View Daily Coronavirus Figures
The user has the ability to see the new confirmed cases, deaths and recoveries for that day.

### View Total Coronavirus Figures
The user has the ability to see the total confirmed cases, deaths and recoveries since the virus first occured in Ireland.

### View County Specific Coronavirus Figures
The user has the ability to see the total confirmed cases, deaths and recoveries for each county in Ireland.

### Sign Up For Email Updates
The user has the ability to subscribe for daily email updates to see the total new confirmed cases, deaths and recoveries for that day.

---

## Future Goals
There are many useful updates that could be implemented in this project in the future. 

### Worldwide statistic
This project could be expanded to provide worldwide statistics and a worldwide Interactive SVG map.

### News Updates
Another useful feature could be latest news updates from the Irish government, WHO and CDC.

---

## Project Planning

Stage 1 - Implement the genral layout of the dashboard.

Stage 2 - Create bar and pie charts using the chart.js library to display sample data. This data will later be replaced with the latest coronavirus figures.

Stage 3 - Create an interactive SVG map of Ireland, which when a county is hovered over will display sample data. This data will later be replaced with the latest coronavirus figures.

Stage 4 - Use the API from data.gov to populate the charts and SVG map

Stage 5 - Test robustness of the site and optimize performance and code

## Technologies Used

* HTML 
* CSS 
* JavaScript 
* [Bootstrap](https://getbootstrap.com/) - to help adapt for numerous input types
* [Google Fonts](https://fonts.google.com/) - 
* [VSCode](https://code.visualstudio.com/) - IDE for local development
* [GIT](https://git-scm.com/) - Version Control
* [GitHub](https://github.com/) - to host the repositories for this project and the live 
* [JQuery](https://jquery.com)
* [Popper.js](https://popper.js.org/)
* [Chart.js](https://www.chartjs.org/)
* [data.gov API](https://data.gov.ie/dataset?q=covid&sort=score+desc%2C+metadata_created+desc)
* [Font Awesome](https://fontawesome.com/) - Used for Icons
* [svgMap](https://github.com/StephanWagner/svgMap) - GitHub World Map project, modified to work for Ireland

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

---

## Testing

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
    1. Go to the "Contact Us" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

---

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.

---

## Credits

### Content
The dashboard features maps and charts based on [Irelands open data portal](https://data.gov.ie/dataset?q=covid&sort=score+desc%2C+metadata_created+desc)

### Media
- The photos used in this site were obtained from ...

### Acknowledgements
I received inspiration for the design of the website from:
https://bootstrapious.com/p/bootstrap-sidebar
https://www.youtube.com/watch?v=dMNBuLcbOPY

- I received inspiration for this project from X
