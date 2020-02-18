import React from "react";
import "./thirdQuestionBox.css";
import { db } from "../../services/firebase";
import { NavLink } from "react-router-dom";

class ThirdQuestionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bool: 0,
      id: 0,
      answer1: "",
      answer2: "",
      answer3: ""
    };
  }

  state = {
    third_question: null,
    users: null,
    second_question: null,
    first_question: null
  };

  componentDidMount() {
    db.collection("third_question")
      .get()
      .then(snapshot => {
        const third_question = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          third_question.push(data);
        });
        this.setState({
          third_question: third_question,
          answer3: String(third_question[0].answer)
        });
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
    db.collection("first_question")
      .get()
      .then(snapshot => {
        const first_question = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          first_question.push(data);
        });
        this.setState({
          first_question: first_question,
          answer1: String(first_question[0].answer)
        });
      })
      .catch(error => console.log(error));
    db.collection("second_question")
      .get()
      .then(snapshot => {
        const second_question = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          second_question.push(data);
        });
        this.setState({
          second_question: second_question,
          answer2: String(second_question[0].answer)
        });
      })
      .catch(error => console.log(error));
  }

  check = () => {
    db.collection("third_question")
      .doc("MNpLbLDcyol3yul99kVY")
      .update({
        answer: this.refs.textArea.value
      });
    this.setState({ bool: 1 });
    db.collection("third_question")
      .get()
      .then(snapshot => {
        const third_question = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          third_question.push(data);
        });
        this.setState({
          third_question: third_question,
          answer3: String(third_question[0].answer)
        });
      })
      .catch(error => console.log(error));
  };

  saveId = () => {
    const id = Date.now().toString();
    db.collection("users")
      .doc(id)
      .set({
        id: Date.now(),
        answer1: this.state.answer1,
        answer2: this.state.answer2,
        answer3: this.state.answer3
      });
    this.setState({ id: Date.now() });
    db.collection("third_question")
      .doc("MNpLbLDcyol3yul99kVY")
      .update({
        answer: null
      });
    db.collection("first_question")
      .doc("QKsHHsOaMWAwKqG02IZc")
      .update({
        answer: null
      });
    db.collection("second_question")
      .doc("UrxzjhCkBarqE9x0573P")
      .update({
        answer: null
      });
  };

  render() {
    return (
      <div className="card shadow">
        <div className="progress">
          <div className="progress-bar" style={{ width: "100%" }}>
            3 из 3
          </div>
        </div>
        <div className="card-body text-dark text-center container">
          {this.state.third_question &&
            this.state.third_question.map(third_question => {
              return (
                <h4 className="card-title text-center">
                  {String(third_question.question)}
                </h4>
              );
            })}
          <div className="card-text">
            <div className="row-fluid">
              <div className="col-12">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={this.check}
                  ref="textArea"
                />
              </div>
            </div>
          </div>
          <div className="row-fluid">
            <div className="col-12">
              {this.state.bool === 1 ? (
                <button
                  className="btn btn-primary"
                  onClickCapture={this.saveId}
                >
                  <NavLink to="/finish" style={{ color: "white" }}>
                    Завершить опрос
                  </NavLink>
                </button>
              ) : (
                <button className="btn btn-outline-primary">
                  Напишите ответ
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ThirdQuestionBox;
