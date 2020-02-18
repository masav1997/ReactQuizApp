import React from "react";
import "./firstQuestionBox.css";
import { db } from "../../services/firebase";
import { NavLink } from "react-router-dom";

class FirstQuestionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bool: 0,
      id: 0
    };
  }

  state = {
    first_question: null,
    users: null
  };

  saveAnswer = () => {
    const id = Date.now().toString();
    db.collection("users")
      .doc(id)
      .set({
        id: Date.now()
      });
  };

  componentDidMount() {
    db.collection("first_question")
      .get()
      .then(snapshot => {
        const first_question = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          first_question.push(data);
        });
        this.setState({ first_question: first_question });
      })
      .catch(error => console.log(error));
    db.collection("users")
      .get()
      .then(snapshot => {
        const users = [];
        snapshot.forEach(doc => {
          const userData = doc.data();
          users.push(userData);
        });
        this.setState({ users: users });
      })
      .catch(error => console.log(error));
  }

  checkFirst = () => {
    db.collection("first_question")
      .doc("QKsHHsOaMWAwKqG02IZc")
      .update({
        answer: "Да"
      });
    this.setState({ bool: 1 });
  };

  checkSecond = () => {
    db.collection("first_question")
      .doc("QKsHHsOaMWAwKqG02IZc")
      .update({
        answer: "Нет"
      });
    this.setState({ bool: 1 });
  };

  render() {
    return (
      <div className="card shadow">
        <div className="progress">
          <div className="progress-bar" style={{ width: "33%" }}>
            1 из 3
          </div>
        </div>
        <div className="card-body text-dark text-center">
          {this.state.first_question &&
            this.state.first_question.map(first_question => {
              return (
                <h4 className="card-title text-center">
                  {String(first_question.question)}
                </h4>
              );
            })}
          {this.state.first_question &&
            this.state.first_question.map(first_question => {
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
                      {String(first_question.options[0])}
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
                      {String(first_question.options[1])}
                    </label>
                  </div>
                </div>
              );
            })}
          {this.state.bool === 1 ? (
            <button className="btn btn-primary">
              <NavLink
                to="/second"
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

export default FirstQuestionBox;
