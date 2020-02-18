import React from "react";
import "./quizBox.css";
import { db } from "../../services/firebase";
import { NavLink } from "react-router-dom";

class FinishQuizBox extends React.Component {
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
    db.collection("finish")
      .get()
      .then(snapshot => {
        const finish = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          finish.push(data);
        });
        this.setState({ finish: finish });
      })
      .catch(error => console.log(error));
    db.collection("users")
      .get()
      .then(snapshot => {
        const users = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          users.push(data);
        });
        this.setState({ users: users, id: users[users.length - 1].id });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="card text-center shadow">
        <div className="card-body text-dark">
          {this.state.finish &&
            this.state.finish.map(finish => {
              return <h4 className="card-title">{String(finish.title)}</h4>;
            })}
          {this.state.finish &&
            this.state.finish.map(finish => {
              return (
                <p className="card-text text-secondary">
                  {String(finish.description)}
                </p>
              );
            })}
          <h4 className="card-title text-center">{this.state.id}</h4>
          <p className="card-text text-secondary">
            <NavLink to="/">Вернуться на главную страницу</NavLink>
          </p>
        </div>
      </div>
    );
  }
}

export default FinishQuizBox;
