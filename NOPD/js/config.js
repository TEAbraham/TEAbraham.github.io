let topTitleDiv = "</h4>";

let titleDiv =
  "<h1>Body Worn Cameras offer hope and reveal strain of police accountability efforts in New Orleans</h1>";

let bylineDiv = "<p>By Thomas Abraham</p>";

let descriptionDiv =
  "<p>While investigating a single allegation of police misconduct, New Orleans Deputy Police Monitor Bonycle Sokunbi spent 350 hours pouring over footage captured by body-worn cameras. Especially in cases of use of force, Monitors can’t judge a case by the footage captured during the incident, “we're not looking at just that individual use of force. We're looking at what led up to it, all the tactics, and the behavior that took place.” </p><p></p>" +
  "<p>Body Worn Cameras were officially introduced in New Orleans in 2015, since then officers have activated the cameras over 3,900,000 times. </p>"+
  "<p>In 2021 alone, body worn camera footage totaled over 27,000 hours, with a median length of 7 minutes. How does a metro area of 1,270,000 handle so much data, where is it collected, and where does it go?</p>"+
  '<p style="text-align:center">Scroll to continue<br>▼</p>';

let footerDiv =
  '<p><a href=></a>  <a href=></a> <a href=></a> <a href=></a></p>'

let divChapter0 =
  "<h3>Overview</h3>" +
  "<img src='images/BodyCameraByDuration.png'>" +
  '<p>Officers must turn their cameras on during almost any interaction with the public. Cameras must stay on until they leave the scene. </a></p>' +
  "<p>As admissible evidence in all misconduct investigations, body worn cameras have added a complex and time consuming new layer of legal responsibility for the Office of the Police Monitor–the top police accountability watchdog in New Orleans. Nonetheless, Bonycle  “can't imagine a world doing this adequately without body worn camera footage. The amount of guessing that takes place or assumptions that are made could be dangerous without it.” </p>";

let divChapter1 =
  "<h3>Closer Look</h3>" +
  '<img src="images/Comparison.png">' +
  '<p class="imageCredit"><a href=""></a></p>' +
  "<p>A small team of 5, the OIPM has a lot on their plate. Acting as a go-between the New Orleans public and NOPD, they receive and prepare complaints for the NOPD public integrity bureau, monitor, review, and assess all misconduct cases, attend all disciplinary hearings, and organize mediation services between individual officers and complainants. For all of these tasks, body worn camera footage has become vital for the simple reason that, as acting Independent Police Monitor Stella Cziment says, they are  ”a way for us to be able to verify what actually happened on the scene.” providing equal footing for the people who file misconduct complaints and the officers involved in the incident.</p>";
  

let divChapter2 =
  "<h3>Districts</h3>" +
  '<img src="images/maJorityAA.png">' +
  '<p class="imageCredit"><a href=""></a></p>' +
  "<p></p>";

let divChapter3 =
  "<h3>Population</h3>" +
  '<img src="images/Median Household Income.png">' +
  '<p class="imageCredit"><a href=""></a></p>' +
  "<p></p>";

let divChapter4 =
  "<h3>Income</h3>" +
  '<img src="images/Misconduct Complaints.png">' +
  '<p class="imageCredit"><a href=></a></p>' +
  "<p></p>";

let divChapter5 =
  "<h3>Conclusion</h3>" +
  '<img src="images/new Income map.png">' +
  '<p class="imageCredit"><a href=></a></p>' +
  "<p></p>";

var config = {
  style: "mapbox://styles/santialv951/cl2rqjuqg000i14qo8pzjgtvc",
  accessToken: "pk.eyJ1Ijoic2FudGlhbHY5NTEiLCJhIjoiY2wxcWw5NmFmMDA4bDNjbXRkbnVjcGl2cCJ9.emo4lo_VYcNtbXMjf8rg9g",
  showMarkers: false,
  markerColor: "#3FB1CE",
  theme: "light",
  use3dTerrain: false,
  topTitle: topTitleDiv,
  title: titleDiv,
  subtitle: "",
  byline: bylineDiv,
  description: descriptionDiv,
  footer: footerDiv,
  chapters: [
    {
      id: "Overview",
      alignment: "left",
      hidden: false,
      chapterDiv: divChapter0,
      location: {
        center: [ -90.071533, 29.951065],
        zoom: 10,
        zoomSmall: 9,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "bwc-point",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "bwc-point",
          opacity: 0,
          duration: 300,
        },
      ],
    },
    {
      id: "Closer Look",
      alignment: "full",
      hidden: false,
      chapterDiv: divChapter1,
      location: {
        center: [ -90.071533, 29.951065],
        zoom: 16,
        zoomSmall: 9,
        pitch: 70,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "bwc-point",
          opacity: 1,
          duration: 3000
        },
      ],
      onChapterExit: [
        {
          layer: "bwc-point",
          opacity: 0,
          duration: 3000,
        },
      ],
    },
    {
      id: "Districts",
      alignment: "left",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter2,
      location: {
        center: [ -90.071533, 29.951065],
        zoom: 10,
        zoomSmall: 9,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "pop-layer",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "pop-layer",
          opacity: 0,
          duration: 300,
        },
      ],
    },
    {
      id: "Population",
      alignment: "left",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter3,
      location: {
        center: [ -90.071533, 29.951065],
        zoom: 10,
        zoomSmall: 9,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "pop-layer",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "pop-layer",
          opacity: 0,
          duration: 300,
        },
      ],
    },
    {
      id: "Income",
      alignment: "right",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter4,
      location: {
        center: [ -90.071533, 29.951065],
        zoom: 10,
        zoomSmall: 9,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "inc-layer",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "inc-layer",
          opacity: 0,
          duration: 300,
        },
      ],
    },
    {
      id: "Conclusion",
      alignment: "right",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter5,
      location: {
        center: [ -90.071533, 29.951065],
        zoom: 10,
        zoomSmall: 9,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "act-layer",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "act-layer",
          opacity: 0,
          duration: 300,
        },
      ],
    },
  ],
};