import React from "react";
import "./quizBox.css";
import { db } from "../../services/firebase";
import { NavLink } from "react-router-dom";

class QuizBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bool: 0
    };
  }

  state = {
    description: null
  };

  componentDidMount() {
    db.collection("description")
      .get()
      .then(snapshot => {
        const description = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          description.push(data);
        });
        this.setState({ description: description });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="card text-center shadow">
        <div className="card-body text-dark">
          {this.state.description &&
            this.state.description.map(description => {
              return (
                <h4 className="card-title">{String(description.title)}</h4>
              );
            })}
          {this.state.description &&
            this.state.description.map(description => {
              return (
                <p className="card-text text-secondary">
                  {String(description.description)}
                </p>
              );
            })}
          <button className="btn btn-outline-success">
            <NavLink to="/first">Пройти опрос</NavLink>
          </button>
          <p className="card-text text-secondary">
            <NavLink to="/code" on>
              Узнать результаты
            </NavLink>
          </p>
        </div>
      </div>
    );
  }
}

export default QuizBox;
