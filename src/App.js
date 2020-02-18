import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import QuizBox from "./components/quizBoxDescription/quizBox";
import FinishQuizBox from "./components/quizBoxFinish/quizBox";
import FirstQuestionBox from "./components/firstQuestionBox/firstQuestionBox";
import SecondQuestionBox from "./components/secondQuestionBox/secondQuestionBox";
import ThirdQuestionBox from "./components/thirdQuestionBox/thirdQuestionBox";
import CodeQuizBox from "./components/codeBox/codeQuizBox";
import ResultsQuizBox from "./components/resultsQuizBox/quizBox";

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2" />
        <div className="col-8">
          <Router>
            <Route exact path="/" component={QuizBox} />
            <Route path="/first" component={FirstQuestionBox} />
            <Route path="/second" component={SecondQuestionBox} />
            <Route path="/third" component={ThirdQuestionBox} />
            <Route path="/finish" component={FinishQuizBox} />
            <Route path="/code" component={CodeQuizBox} />
            <Route path="/results" component={ResultsQuizBox} />
          </Router>
        </div>
        <div className="col-2" />
      </div>
    </div>
  );
}

export default App;
