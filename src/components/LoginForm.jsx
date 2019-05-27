import React, { Component } from "react";
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment,
    Radio,
    Input
} from "semantic-ui-react";
import logo from "../logo.svg";
import {
    loginUser,
    generateOTP,
    verifyOTP,
    generateSMS,
    verifySMS
} from "../util/loginFunctions";
import { registerUser } from "../util/registerFunctions";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        let validated = Boolean(localStorage.getItem("validated"));

        this.state = {
            mode: "login",
            login_state: {
                username_or_email_address: "",
                password: "",
                remember_me: false
            },
            register_state: {
                name: "",
                email_address: "",
                mobile_number: "",
                username: "",
                password: "",
                re_password: ""
            },
            reset_state: {
                token: "",
                old_password: "",
                new_password: "",
                re_password: ""
            },
            verification_code: "",
            otp_qr: "",
            otp_sms: "",
            otp: "qr",
            loading: false,
            initialValid: false,
            finalValid: validated ? validated : false
        };
    }

    setLoadingState = loading => {
        this.setState({
            loading
        });
    };

    saveState = (name, state) => {
        this.setState({
            [name]: state
        });
    };

    setInitialValid = valid => {
        this.setState({
            initialValid: valid
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        loginUser(
            JSON.parse(JSON.stringify(this.state.login_state)),
            this.setLoadingState,
            this.setInitialValid
        );
    };

    handleRegisterSubmit = e => {
        e.preventDefault();
        registerUser(
            JSON.parse(JSON.stringify(this.state.register_state)),
            this.saveState
        );
    };

    handleValidate = e => {
        e.preventDefault();
        this.state.otp === "qr"
            ? generateOTP(this.saveState)
            : generateSMS(this.saveState);
    };

    handleVerify = e => {
        e.preventDefault();
        verifyOTP(
            JSON.parse(JSON.stringify(this.state.verification_code)),
            this.saveState
        );
    };

    handleVerifySMS = e => {
        e.preventDefault();
        verifySMS(
            JSON.parse(JSON.stringify(this.state.verification_code)),
            this.saveState
        );
    };

    handleRegisterChange = (e, { name, value }) => {
        let register_state = JSON.parse(
            JSON.stringify(this.state.register_state)
        );
        register_state[name] = value;
        this.setState({
            register_state
        });
    };

    handleChange = (e, { name, value }) => {
        let login_state = JSON.parse(JSON.stringify(this.state.login_state));
        login_state[name] = value;
        this.setState({
            login_state
        });
    };

    handleInputChange = (e, { name, value }) => {
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div className="login-form">
                {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
                <style>
                    {`
      .login-form {
          padding-top: 270px;
      }

      .swal2-popup {
          height: auto;
      }
    `}
                </style>
                {this.state.mode === "login" ? (
                    <Grid
                        textAlign="center"
                        style={{ height: "100%" }}
                        verticalAlign="middle"
                    >
                        {!this.state.finalValid &&
                        !localStorage.getItem("validated") ? (
                            <Grid.Column style={{ maxWidth: 450 }}>
                                {!this.state.initialValid ? (
                                    <div>
                                        <Header
                                            as="h2"
                                            color="teal"
                                            textAlign="center"
                                        >
                                            <Image src={logo} /> Log-in to your
                                            account
                                        </Header>
                                        <Form
                                            size="large"
                                            onSubmit={this.handleSubmit}
                                            loading={this.state.loading}
                                        >
                                            <Segment stacked>
                                                <Form.Input
                                                    fluid
                                                    icon="user"
                                                    iconPosition="left"
                                                    name="username_or_email_address"
                                                    placeholder="Username or E-mail address"
                                                    onChange={this.handleChange}
                                                />
                                                <Form.Input
                                                    fluid
                                                    icon="lock"
                                                    iconPosition="left"
                                                    placeholder="Password"
                                                    type="password"
                                                    name="password"
                                                    onChange={this.handleChange}
                                                />

                                                <Button
                                                    color="teal"
                                                    fluid
                                                    size="large"
                                                >
                                                    Login
                                                </Button>
                                            </Segment>
                                        </Form>
                                        <Message>
                                            New to us?{" "}
                                            <span
                                                style={{
                                                    color: "#728cd4",
                                                    cursor: "pointer"
                                                }}
                                                onClick={() => {
                                                    this.saveState(
                                                        "mode",
                                                        "register"
                                                    );
                                                }}
                                            >
                                                Sign Up
                                            </span>
                                        </Message>
                                    </div>
                                ) : !(this.state.otp_qr.length > 0) ? (
                                    <Form
                                        onSubmit={this.handleValidate}
                                        loading={this.state.loading}
                                    >
                                        <Form.Field>
                                            <Radio
                                                label="Validate login with code generated by Google Validator"
                                                name="otp"
                                                value="qr"
                                                checked={
                                                    this.state.otp === "qr"
                                                }
                                                onChange={
                                                    this.handleInputChange
                                                }
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Radio
                                                label="Validate login with code sent by SMS"
                                                name="otp"
                                                value="sms"
                                                checked={
                                                    this.state.otp === "sms"
                                                }
                                                onChange={
                                                    this.handleInputChange
                                                }
                                            />
                                        </Form.Field>
                                        <Button
                                            color="teal"
                                            loading={this.state.loading}
                                            fluid
                                            size="large"
                                            onClick={() => {
                                                if (this.state.otp === "sms") {
                                                    this.setState(
                                                        {
                                                            otp_qr: "test"
                                                        },
                                                        () => {
                                                            generateSMS(
                                                                this.saveState
                                                            );
                                                        }
                                                    );
                                                }
                                            }}
                                        >
                                            Validate account
                                        </Button>
                                    </Form>
                                ) : (
                                    <div>
                                        {this.state.otp === "qr" && (
                                            <Image
                                                src={this.state.otp_qr}
                                                centered
                                                verticalAlign="middle"
                                                size="medium"
                                            />
                                        )}
                                        <Input
                                            focus
                                            placeholder="OTP Code here..."
                                            size="large"
                                            onChange={this.handleInputChange}
                                            name="verification_code"
                                        />
                                        <br />
                                        <br />
                                        {this.state.otp === "qr" ? (
                                            <Button
                                                color="teal"
                                                size="large"
                                                loading={this.state.loading}
                                                onClick={this.handleVerify}
                                            >
                                                Validate code
                                            </Button>
                                        ) : (
                                            <Button
                                                color="teal"
                                                size="large"
                                                loading={this.state.loading}
                                                onClick={this.handleVerifySMS}
                                            >
                                                Validate code
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </Grid.Column>
                        ) : (
                            <div>
                                <p>You are now logged in!</p>
                                <Button
                                    color="teal"
                                    size="large"
                                    onClick={() => {
                                        localStorage.clear();
                                        window.location.reload();
                                    }}
                                >
                                    Sign out
                                </Button>
                            </div>
                        )}
                    </Grid>
                ) : (
                    <Grid
                        textAlign="center"
                        style={{ height: "100%" }}
                        verticalAlign="middle"
                    >
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as="h2" color="teal" textAlign="center">
                                <Image src={logo} /> Register new account
                            </Header>
                            <Form
                                size="large"
                                onSubmit={this.handleRegisterSubmit}
                                loading={this.state.loading}
                            >
                                <Segment stacked>
                                    <Form.Input
                                        fluid
                                        icon="user"
                                        iconPosition="left"
                                        name="name"
                                        placeholder="Name and surname"
                                        onChange={this.handleRegisterChange}
                                    />
                                    <Form.Input
                                        fluid
                                        icon="mail"
                                        iconPosition="left"
                                        name="email_address"
                                        placeholder="Email address"
                                        onChange={this.handleRegisterChange}
                                    />
                                    <Form.Input
                                        fluid
                                        icon="phone"
                                        iconPosition="left"
                                        name="mobile_number"
                                        placeholder="Mobile phone number"
                                        onChange={this.handleRegisterChange}
                                    />
                                    <Form.Input
                                        fluid
                                        icon="user secret"
                                        iconPosition="left"
                                        name="username"
                                        placeholder="Username"
                                        onChange={this.handleRegisterChange}
                                    />
                                    <Form.Input
                                        fluid
                                        icon="lock"
                                        iconPosition="left"
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                        onChange={this.handleRegisterChange}
                                    />
                                    <Form.Input
                                        fluid
                                        icon="unlock"
                                        iconPosition="left"
                                        placeholder="Retype password"
                                        type="password"
                                        name="re_password"
                                        onChange={this.handleRegisterChange}
                                    />

                                    <Button color="teal" fluid size="large">
                                        Register
                                    </Button>
                                </Segment>
                            </Form>
                            <Message>
                                Already have an account?{" "}
                                <span
                                    style={{
                                        color: "#728cd4",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => {
                                        this.saveState("mode", "login");
                                    }}
                                >
                                    Log in
                                </span>
                            </Message>
                        </Grid.Column>
                    </Grid>
                )}
            </div>
        );
    }
}

export default LoginForm;
