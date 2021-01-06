import React, {Component} from "react";
import { GenerateJWT, DecodeJWT } from "../services/JWTService";

class Login extends Component {

  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  
  handleSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;
    const claims = {username, password};

    const header = {
      alg: "HS512",
      type: "JWT"
    };

    GenerateJWT(header, claims, null, res => {
      if (res.status === 200) {
        this.setState({Response: res.data}, () => {
          DecodeJWT(this.state.Response, data => 
            this.setState({Data: data.data})
          );
        });
      } else {
        this.setState({Response: "Error!"})
      }
    });
  };

  render() {
      return (
      <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Sign In</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Please sign in to continue.
                </h6>
                <form onSubmit={this.handleSubmit}>
                  {["username", "password"].map((i, k) => (
                    <div className="form-group" key={k}>
                      <label htmlFor={i}>{i}</label>
                      <input
                        type={i === "Password" ? "password" : "text"}
                        name={i}
                        className="form-control"
                        id={i}
                        placeholder={i}
                        value={this.state[i]}
                        onChange={this.handleChange}
                      />
                    </div>
                    ))}
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-g">
            <pre>
            State Data
            <br />
            <br />
            {JSON.stringify(
              {
                username: this.state.username,
                password: this.state.password
              },
              null,
              2
              )}
              {this.state.Response && (
                <>
                  <br />
                  <br />
                  Response Data (JWT)
                  <br />
                  <br />
                  {this.state.Response}
                </>
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
      )
  }
}

export default Login;