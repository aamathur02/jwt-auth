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

          if (typeof Storage !== "undefined") {
            localStorage.setItem("JWT", res.data);
          }
          DecodeJWT(this.state.Response, data => 
            this.setState({Data: data.data})
          );
        });
      } else {
        this.setState({Response: "Error!"})
      }
    });
  };

  componentDidMount() {
    if (typeof Storage !== "undefined") {
      if (localStorage.getItem("JWT") !== null) {
        this.setState({Response: localStorage.getItem("JWT")});
        DecodeJWT(localStorage.getItem("JWT"), data => 
        this.setState({Data: data.data})
        );
      }
    }
  }

  SignOutUser = e => {
    e.preventDefault();
    this.setState({Response: null, Data: null});
    if (typeof Storage !== "undefined") {
      if (localStorage.getItem("JWT") !== null) {
        localStorage.removeItem("JWT");
      }
    }
  };

  render() {
      return (
      <div className="login">
      <div className="container">
        <div className="row">
        <div className="col-6">
            <div className="card">
              {this.state.Data ? (
                <div className="card-body">
                  <h5 className="card-title">Successfully Signed In</h5>
                  <p className="text-muted">
                    Hello {this.state.Data.Username}! How are you?
                  </p>
                  <p className="mb-0">
                    You might want to{" "}
                    <button
                      className="btn btn-link"
                      onClick={this.SignOutUser}
                      >
                      sign out
                    </button>
                    .
                  </p>
                </div>
              ) : (
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
              )}
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
              {this.state.Data && (
                <>
                <br />
                <br />
                Decoded Data
                <br />
                <br />
                {JSON.stringify(this.state.Data, null, 2)}
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