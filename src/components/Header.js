import React from 'react';
import '../style/header.css';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';
import axios from "axios";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFFFFF'
    },
};

class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            accountModalIsOpen: false,
            msgModalIsOpen: false,
            message: undefined,
            user: undefined,
            pwd: undefined,
            fn: undefined,
            ln: undefined,
            userName: undefined,
            isLoggedIn: false,
            userLoggedIn : false,
            userlog: []
        }
    }

    handleNavigate = () => {
        this.props.history.push('/');
    }

    handleLogin = () => {
        this.setState({ loginModalIsOpen: true, msgModalIsOpen: false });
    }

    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, userName: response.profileObj.name, loginModalIsOpen: false, accountModalIsOpen: false });
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false, userName: undefined, userLoggedIn: false });
    }

    handleAccount = () => {
        this.setState({ accountModalIsOpen: true });
    }

    handleInputChange = (state, event) => {
        this.setState({ [state]: event.target.value,});
      };

    signUp = (e) => {
        const { user, pwd, fn, ln  } = this.state;
        e.preventDefault();

        const userObj = {
            user,
            pwd,
            fn,
            ln
          };

        if (!fn || !ln || !user || !pwd) {
            alert("Please fill all the fields");
          } 

        axios({
            method: "POST",
            url: "http://localhost:8555/usersignup",
            headers: { "Content-Type": "Application/json" },
            data: userObj,
          })
            .then((response) => {
              this.setState({ message: response.data.message });
            })
            .catch(err => {console.log(err)})

          this.setState({ accountModalIsOpen: false, user: undefined, 
            pwd: undefined, fn: undefined, ln: undefined, userLoggedIn: true, msgModalIsOpen: true
          });
    }

    signIn = (e) => {
        const { user, pwd } = this.state;
        e.preventDefault();
    
        if (!user || !pwd) {
          alert("Please fill all the fields");
        } else {
          const userObj = {
            user,
            pwd
          };
    
          axios({
            method: "POST",
            url: "http://localhost:8555/userlogin",
            headers: { "Content-Type": "Application/json" },
            data: userObj,
          })
            .then((response) => {
              this.setState({
                userlog: response.data.user,  loginModalIsOpen: false, userLoggedIn: true});
            })
            .catch((err) => console.log(err));
        }
      };

    handleModal = (state, value) => {
        this.setState({ [state] : value })
    }

    handleLoginModal = (state, value) => {
        this.setState({ [state] : value })
    }

    render() {
        const { loginModalIsOpen, accountModalIsOpen, msgModalIsOpen, isLoggedIn, userLoggedIn, userName, userlog} = this.state;
        console.log(userlog)
        return (
            <div className='header'>
                <div className="header-logo" onClick={this.handleNavigate}>
                    <p>e!</p>
                </div>
                {
                    !userLoggedIn ? (!isLoggedIn ? <div className="user-account">
                        <div className='login' onClick={this.handleLogin}>Login</div>
                        <div className='signup' onClick={this.handleAccount}>Create an account</div>
                    </div> :
                    <div className="user-account">
                        <div className='login'>{userName} </div>
                        <div className='signup' onClick={this.handleLogout}>Logout</div>
                    </div>) :
                    (<div className="user-account">
                        <div className='login'>{`Welcome! ${userlog[0].firstName}`} </div>
                        <div className='signup' onClick={this.handleLogout}>Logout</div>
                    </div>)
                }
                {/*
                {
                    users.length > 0 ? 
                     <div className="user-account">
                            <div className='login'>{users.firstname}</div>
                            <div className='signup' onClick={this.handleLogout2}>Logout</div>
                    </div>
                    : null

                }*/}

                {/* loginModal Modal */}

                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                    onClick={() => this.handleLoginModal('loginModalIsOpen', false)}></div>
                    <div>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputName">Email</label>
                                <input
                                type="email"
                                className="form-control"
                                placeholder="Enter Email"
                                onChange={(event) =>
                                    this.handleInputChange("user", event)
                                }
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="exampleInputName">password</label>
                                <input
                                type="password"
                                className="form-control"
                                placeholder="Enter Last Name"
                                onChange={(event) =>
                                    this.handleInputChange("pwd", event)
                                }
                                />
                            </div>
                            <br />
                        </form>
                        <button
                                type="submit"
                                className="pay"
                                style={{
                                float: "left",
                                marginRight: "20px",
                                height: "44px",
                                marginBottom: "20px",
                                }}
                                onClick={(event) => this.signIn(event)}
                            >
                                SIGN IN
                            </button>
                        <GoogleLogin
                            clientId="458126636478-5l81fabs0abjnsfklhcmn4qer8vtkitm.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </Modal>

                {/* Account Modal */}

                <Modal
                isOpen={accountModalIsOpen}
                style={customStyles}
                >
                <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('accountModalIsOpen', false)}></div>
                <div className="modal-container">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputName">Email</label>
                            <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                            onChange={(event) =>
                                this.handleInputChange("user", event)
                            }
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="exampleInputName">Password</label>
                            <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Last Name"
                            onChange={(event) =>
                                this.handleInputChange("pwd", event)
                            }
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="exampleInputName">Firstname</label>
                            <input
                            type="name"
                            className="form-control"
                            placeholder="Enter firstname"
                            onChange={(event) =>
                                this.handleInputChange("fn", event)
                            }
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="exampleInputName">Lastname</label>
                            <input
                            type="name"
                            className="form-control"
                            placeholder="Enter lastname"
                            onChange={(event) =>
                                this.handleInputChange("ln", event)
                            }
                            />
                            <small id="emailHelp" className="form-text text-muted"></small>
                        </div>
                        <br />
                        <button
                            type="submit"
                            className="pay"
                            style={{
                            float: "left",
                            marginRight: "20px",
                            height: "44px",
                            marginBottom: "20px",
                            }}
                            onClick={(event) => this.signUp(event)}
                            >
                            SIGN UP
                        </button>
                        <GoogleLogin
                            clientId="458126636478-5l81fabs0abjnsfklhcmn4qer8vtkitm.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        ></GoogleLogin>
                    </form>
                </div>
            </Modal>
            
            {/* Message Modal */}

            <Modal
                isOpen={msgModalIsOpen}
                style={customStyles}
            >
                <div>
                    <h1>Account is created successfully</h1>
                    <button className='login' onClick={this.handleLogin}>Login</button>
                </div>
            </Modal>
            </div>
        )
    }
}

export default withRouter(Header);