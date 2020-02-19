import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import QuizBox from "./components/quizBoxDescription/quizBox";
import FinishQuizBox from "./components/quizBoxFinish/quizBox";
import QuestionBox from "./components/questionBox/questionBox";
import CodeQuizBox from "./components/codeBox/codeQuizBox";
import ResultsQuizBox from "./components/resultsQuizBox/quizBox";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-1" />
        <div className="col-10">
          <Router>
            <Route exact path="/" component={QuizBox} />
            <Route path="/quiz" component={QuestionBox} />
            <Route path="/finish" component={FinishQuizBox} />
            <Route path="/code" component={CodeQuizBox} />
            <Route path="/results" component={ResultsQuizBox} />
          </Router>
        </div>
        <div className="col-1" />
      </div>
    </div>
  );
}

export default App;
