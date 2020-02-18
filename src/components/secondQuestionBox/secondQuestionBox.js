import React from "react";
import "./secondQuestionBox.css";
import { db } from "../../services/firebase";
import { NavLink } from "react-router-dom";

class SecondQuestionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bool: 0
    };
  }

  state = {
    second_question: null
  };

  componentDidMount() {
    db.collection("second_question")
      .get()
      .then(snapshot => {
        const second_question = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          second_question.push(data);
        });
        this.setState({ second_question: second_question });
      })
      .catch(error => console.log(error));
  }

  checkFirst = () => {
    db.collection("second_question")
      .doc("UrxzjhCkBarqE9x0573P")
      .update({
        answer: "Да"
      });
    this.setState({ bool: 1 });
  };

  checkSecond = () => {
    db.collection("second_question")
      .doc("UrxzjhCkBarqE9x0573P")
      .update({
        answer: "Нет"
      });
    this.setState({ bool: 1 });
  };

  checkThird = () => {
    db.collection("second_question")
      .doc("UrxzjhCkBarqE9x0573P")
      .update({
        answer: "Затрудняюсь ответить, чувствую слабость"
      });
    this.setState({ bool: 1 });
  };

  render() {
    return (
      <div className="card shadow">
        <div className="progress">
          <div className="progress-bar" style={{ width: "66%" }}>
            2 из 3
          </div>
        </div>
        <div className="card-body text-dark text-center">
          {this.state.second_question &&
            this.state.second_question.map(second_question => {
              return (
                <h4 className="card-title text-center">
                  {String(second_question.question)}
                </h4>
              );
            })}
          {this.state.second_question &&
            this.state.second_question.map(second_question => {
              return (
                <div className="card-text">
                  <div className="custom-control custom-radio custom-control-inline is-invalid">
                    <input
                      input
                      type="radio"
                      name="group1"
                      id="r1"
                      value="1"
                      className="custom-control-input"
                      onChange={this.checkFirst}
                    />
                    <label className="custom-control-label" for="r1">
                      {String(second_question.options[0])}
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      input
                      type="radio"
                      name="group1"
                      id="r2"
                      value="2"
                      className="custom-control-input"
                      onChange={this.checkSecond}
                    />
                    <label className="custom-control-label" for="r2">
                      {String(second_question.options[1])}
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      input
                      type="radio"
                      name="group1"
                      id="r3"
                      value="3"
                      className="custom-control-input"
                      onChange={this.checkSecond}
                    />
                    <label className="custom-control-label" for="r3">
                      {String(second_question.options[2])}
                    </label>
                  </div>
                </div>
              );
            })}
          {this.state.bool === 1 ? (
            <button className="btn btn-primary">
              <NavLink
                to="/third"
                style={{ color: "white", textDecoration: "none" }}
              >
                Следующий вопрос
              </NavLink>
            </button>
          ) : (
            <button className="btn btn-outline-primary">
              Выберите ответ на вопрос
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default SecondQuestionBox;
