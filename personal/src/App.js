import React, { Component } from "react";
import Box from "./components/Box/box";
import Contacts from "./components/Contacts/contacts";

import { loop, throttle } from "./helpers";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    };
    this.count = 0;
  }

  steps = [
    { title: "José Varela", subtitle: "Fullstack Developer" },
    {
      title: "Frontend skills",
      subtitle: `
  JS (ES5+)
    Angular 1.x / 2+
    Cordova / Ionic
    React / React Native
    Vue

  CSS 3
    SCSS

  HTML 5`,
    },
    {
      title: "Backend skills",
      subtitle: `
  JS (ES5+)
    Nodejs

  PHP
    Laravel

  Database (SQL & NoSQL)
    CouchDB
    MongoDB
    MySQL`,
    },
    {
      title: "Tool skills",
      subtitle: `
  Git
  Docker
  Bash
  Apache / Nginx
  Virtual Box
    `,
    },
    {
      title: "Portfolio",
      subtitle: `
  Gif It
  Stoply.pt
  (Contact me to
    know more projects)
    `,
    },
    {
      title: "Personal Info",
      subtitle: `
  Married
  Father of 1
  Drive License B
  Portuguese
  Date of birth:
    27/09/1992 (${~~(
      (new Date() - new Date("09/27/1992")) /
      31688764600
    )} years)
  Professional since:
    06/2015 (~${~~((new Date() - new Date("05/01/2015")) / 31688764600)} years)
    `,
    },
  ];

  onWheel = (e) => {
    let nextVal = e.wheelDelta > 0 ? 1 : -1;
    this.count += nextVal;
    if (Math.abs(this.count) >= 2) {
      let step = this.state.step + nextVal;
      step = loop(step, 0, this.steps.length - 1);
      this.setState({ step });
      this.count = 0;
    }
    const movePercent = Math.abs(this.count) * 100;
    document
      .querySelector(".box")
      .style.setProperty("--xpos", `${-movePercent}%`);
    document
      .querySelector(".app")
      .style.setProperty("--scalePercent", `${movePercent / 2}%`);
  };

  throttleOnWheel = throttle(this.onWheel, 300);

  componentDidMount() {
    window.addEventListener("mousewheel", this.throttleOnWheel);
    window.addEventListener("touchmove", this.throttleOnWheel);
  }

  componentWillUnmount() {
    window.removeEventListener("mousewheel", this.throttleOnWheel);
    window.removeEventListener("touchmove", this.throttleOnWheel);
  }

  render() {
    const currentStep = this.steps[this.state.step];
    return (
      <div className="app">
        <div className="triangle-left"></div>
        <div className="triangle-right"></div>
        <Box title={currentStep.title} subtitle={currentStep.subtitle} />
        <Contacts />
        <div className="author">
          <span>
            Designed and developed by José Varela (in other words, me)
          </span>
        </div>
      </div>
    );
  }
}

export default App;
