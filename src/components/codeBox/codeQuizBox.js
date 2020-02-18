import React from "react";
import "./codeQuizBox.css";
import { db } from "../../services/firebase";
import { NavLink } from "react-router-dom";

class CodeQuizBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersId: [],
      codeId: null,
      bool: 0
    };
  }

  state = {
    users: null
  };

  onSubmit = () => {
    const id = this.refs.Code.value;
    db.collection("users")
      .doc(id)
      .get()
      .then(snapshot => {
        const users = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          users.push(data);
        });
        this.setState({ users: users });
      })
      .catch(error => console.log(error));
    console.log(id);
    this.state.bool === id
      ? db
          .collection("users")
          .doc(id)
          .update({
            id: id
          })
      : console.log("error");
  };

  check = () => {
    db.collection("users")
      .get()
      .then(snapshot => {
        const users = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          users.push(data);
        });
        this.setState({ codeId: this.refs.Code.value });
        for (var i = 0; i < users.length; i++) {
          this.refs.Code.value === String(users[i].id)
            ? this.setState({
                bool: String(users[i].id),
                codeId: this.refs.Code.value
              })
            : console.log("Отсутствует код в бд");
        }
        console.log(this.state.bool, this.state.codeId);
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="card text-center shadow">
        <div className="card-body text-dark">
          <h4 className="card-title">
            Введите код доступа, полученный у пациента
          </h4>
          <div className="card-text text-secondary">
            <div class="form-group">
              <input
                type="number"
                class="form-control"
                id="code"
                aria-describedby="Code"
                ref="Code"
                onChange={this.check}
              />
            </div>
          </div>
          {this.state.bool === 0 || this.state.bool !== this.state.codeId ? (
            <button className="btn btn-outline-primary">
              Некорректный код
            </button>
          ) : (
            <button className="btn btn-primary" onClick={this.onSubmit}>
              <NavLink to="/results" style={{ color: "white" }}>
                Узнать результаты
              </NavLink>
            </button>
          )}
          <p className="card-text text-secondary">
            <NavLink to="/" style={{ color: "grey" }}>
              Вернуться на главную
            </NavLink>
          </p>
        </div>
      </div>
    );
  }
}

export default CodeQuizBox;
