import React from "react";
import "./firstQuestionBox.css";
import { db } from "../../services/firebase";
import { NavLink } from "react-router-dom";

class FirstQuestionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bool: 0,
      id: Date.now().toString(),
      flag: 0,
      answer1: "",
      answer2: "",
      answer3: ""
    };
  }

  state = {
    questions: null,
    users: null
  };

  componentDidMount() {
    db.collection("questions")
      .get()
      .then(snapshot => {
        const questions = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          questions.push(data);
        });
        this.setState({ questions: questions });
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

  saveAnswer = () => {
    this.setState({ flag: this.state.flag + 1 });
  };

  saveId = () => {
    db.collection("users")
      .doc("go8qA5lcRD0n5mXDkvjg")
      .update({
        id: Date.now().toString()
      });
  };

  setFirstOptAnswer1 = () => {
    db.collection("users")
      .doc("go8qA5lcRD0n5mXDkvjg")
      .update({
        answer1: "Да"
      });
    this.setState({ bool: 1, id: Date.now().toString() });
  };

  setSecondOptAnswer1 = () => {
    db.collection("users")
      .doc("go8qA5lcRD0n5mXDkvjg")
      .update({
        answer1: "Нет"
      });
    this.setState({ bool: 1, id: Date.now().toString() });
  };

  setFirstOptAnswer2 = () => {
    db.collection("users")
      .doc("go8qA5lcRD0n5mXDkvjg")
      .update({
        answer2: "Да"
      });
    this.setState({ bool: 1 });
  };

  setSecondOptAnswer2 = () => {
    db.collection("users")
      .doc("go8qA5lcRD0n5mXDkvjg")
      .update({
        answer2: "Нет"
      });
    this.setState({ bool: 1 });
  };

  setThirdOptAnswer2 = () => {
    db.collection("users")
      .doc("go8qA5lcRD0n5mXDkvjg")
      .update({
        answer2: "Затрудняюсь ответить, чувствую слабость"
      });
    this.setState({ bool: 1 });
  };

  setThirdAnswer = () => {
    db.collection("users")
      .doc("go8qA5lcRD0n5mXDkvjg")
      .update({
        answer3: this.refs.textArea.value
      });
    this.setState({ bool: 1 });
  };

  render() {
    return (
      <div className="card text-center shadow">
        {this.state.flag === 0 ? (
          <div className="progress" style={{ borderRadius: 1 }}>
            <div className="progress-bar" style={{ width: "33%" }}>
              1 из 3
            </div>
          </div>
        ) : null}
        {this.state.flag === 1 ? (
          <div className="progress" style={{ borderRadius: 1 }}>
            <div className="progress-bar" style={{ width: "66%" }}>
              2 из 3
            </div>
          </div>
        ) : null}
        {this.state.flag === 2 ? (
          <div className="progress" style={{ borderRadius: 1 }}>
            <div className="progress-bar" style={{ width: "100%" }}>
              3 из 3
            </div>
          </div>
        ) : null}
        <div className="card-body text-dark">
          {this.state.flag === 0
            ? this.state.questions &&
              this.state.questions.map(questions => {
                return (
                  <h5 className="card-title text-center">
                    {String(questions.first_question)}
                  </h5>
                );
              })
            : null}
          {this.state.flag === 1
            ? this.state.questions &&
              this.state.questions.map(questions => {
                return (
                  <h5 className="card-title text-center">
                    {String(questions.second_question)}
                  </h5>
                );
              })
            : null}
          {this.state.flag === 2
            ? this.state.questions &&
              this.state.questions.map(questions => {
                return (
                  <h5 className="card-title text-center">
                    {String(questions.third_question)}
                  </h5>
                );
              })
            : null}
          {this.state.flag === 0
            ? this.state.questions &&
              this.state.questions.map(questions => {
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
                        onChange={this.setFirstOptAnswer1}
                      />
                      <label className="custom-control-label" for="r1">
                        {String(questions.options[0])}
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
                        onChange={this.setSecondOptAnswer1}
                      />
                      <label className="custom-control-label" for="r2">
                        {String(questions.options[1])}
                      </label>
                    </div>
                  </div>
                );
              })
            : null}
          {this.state.flag === 1
            ? this.state.questions &&
              this.state.questions.map(questions => {
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
                        onChange={this.setFirstOptAnswer2}
                      />
                      <label className="custom-control-label" for="r1">
                        {String(questions.options[0])}
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
                        onChange={this.setSecondOptAnswer2}
                      />
                      <label className="custom-control-label" for="r2">
                        {String(questions.options[1])}
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
                        onChange={this.setThirdOptAnswer2}
                      />
                      <label className="custom-control-label" for="r3">
                        {String(questions.options[2])}
                      </label>
                    </div>
                  </div>
                );
              })
            : null}
          {this.state.flag === 2
            ? this.state.questions &&
              this.state.questions.map(questions => {
                return (
                  <div className="card-text">
                    <div className="row-fluid">
                      <div className="col-12">
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          onChange={this.setThirdAnswer}
                          ref="textArea"
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
          {this.state.flag === 0 || this.state.flag === 1 ? (
            this.state.bool === 1 ? (
              <button
                className="btn btn-primary"
                onClickCapture={this.saveAnswer}
              >
                Следующий вопрос
              </button>
            ) : (
              <button className="btn btn-outline-primary" disabled>
                Выберите ответ на вопрос
              </button>
            )
          ) : null}
          {this.state.flag === 2 ? (
            this.state.bool === 1 ? (
              <button className="btn btn-primary" onClickCapture={this.saveId}>
                <NavLink to="/finish" style={{ color: "white" }}>
                  Завершить опрос
                </NavLink>
              </button>
            ) : (
              <button className="btn btn-outline-primary">
                Напишите ответ
              </button>
            )
          ) : null}
        </div>
      </div>
    );
  }
}

export default FirstQuestionBox;
