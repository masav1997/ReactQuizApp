import React from "react";
import "./quizBox.css";
import { db } from "../../services/firebase";
import { NavLink } from "react-router-dom";

class ResultsQuizBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer1: "",
      answer2: "",
      answer3: "",
    };
  }

  state = {
    users: null
  };

  componentDidMount() {
    db.collection("users")
      .get()
      .then(snapshot => {
        const users = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          users.push(data);
        });
        this.setState({
          users: users,
          answer1: users[users.length - 1].answer1,
          answer2: users[users.length - 1].answer2,
          answer3: users[users.length - 1].answer3
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="card text-center shadow ">
        <div className="card-body text-dark row">
          <div className="col-6">
            <div className="card-text text-left">
              Наблюдалась ли у вас повышенная чувствительность/аллергия к
              лекарствам, продуктам, или другим веществам?
            </div>
          </div>
          <div className="col-6">
            <div className="card-text text-left">{this.state.answer1}</div>
          </div>
          <div className="col-6">
            <div className="card-text text-left">
              Принимаете ли вы ежедневно медикаменты? Укажите какие, если да.
            </div>
          </div>
          <div className="col-6">
            <div className="card-text text-left">{this.state.answer2}</div>
          </div>
          <div className="col-6">
            <div className="card-text text-left">
              Болеете ли вы в данное время ОРЗ, гриппом?
            </div>
          </div>
          <div className="col-6">
            <div className="card-text text-left">{this.state.answer3}</div>
          </div>
        </div>
        <p className="card-text text-secondary">
          <NavLink to="/">Вернуться на главную</NavLink>
        </p>
      </div>
    );
  }
}

export default ResultsQuizBox;
