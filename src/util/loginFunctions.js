import axios from "axios";
import * as config from "../config";
import { showSweetAlert } from "./sweetAlert";

export const loginUser = (data, setLoadingState, setInitialValid) => {
    setLoadingState(true);
    axios
        .post(config.baseURL + "/login", data, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.data.valid) {
                localStorage.setItem("user_email", response.data.email);
                setInitialValid(true);
            } else {
                showSweetAlert(
                    "Login failed!",
                    "error",
                    response.data.message,
                    "CLOSE"
                );
            }
            setLoadingState(false);
        })
        .catch(error => {
            showSweetAlert(
                "Login failed!",
                "error",
                error.response.data.error_message,
                "CLOSE",
                () => {
                    setLoadingState(false);
                    setInitialValid(false);
                }
            );
        });
};

export const generateOTP = saveState => {
    let email = localStorage.getItem("user_email");
    if (email) {
        saveState("loading", true);
        axios
            .get(config.baseURL + "/login/generate_otp/" + email, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if (response.data.otp) {
                    saveState("otp_qr", response.data.otp);
                } else {
                    showSweetAlert(
                        "Generating QR code failed!",
                        "error",
                        response.data.message,
                        "CLOSE"
                    );
                }
                saveState("loading", false);
            })
            .catch(error => {
                showSweetAlert(
                    "Generating QR code failed!",
                    "error",
                    error.response.data.error_message,
                    "CLOSE",
                    () => {
                        saveState("loading", false);
                    }
                );
            });
    }
};

export const verifyOTP = (verification_code, saveState) => {
    let email = localStorage.getItem("user_email");
    if (email) {
        saveState("loading", true);
        axios
            .post(
                config.baseURL + "/login/generate_otp/",
                {
                    verification_code,
                    email
                },
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            )
            .then(response => {
                if (response.data.valid) {
                    showSweetAlert(
                        "Validation successful!",
                        "success",
                        response.data.message,
                        "CLOSE",
                        () => {
                            localStorage.setItem("validated", true);
                            saveState("finalValid", true);
                        }
                    );
                } else {
                    showSweetAlert(
                        "Validation failed!",
                        "error",
                        response.data.message,
                        "CLOSE"
                    );
                }
                saveState("loading", false);
            })
            .catch(error => {
                showSweetAlert(
                    "Validation failed!",
                    "error",
                    error.response.data.error_message,
                    "CLOSE",
                    () => {
                        saveState("loading", false);
                    }
                );
            });
    }
};

export const generateSMS = saveState => {
    let email = localStorage.getItem("user_email");
    if (email) {
        saveState("loading", true);
        axios
            .get(config.baseURL + "/login/generate_sms/" + email, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if (response.data.success) {
                    showSweetAlert(
                        "SMS code successfully generated!",
                        "success",
                        response.data.message,
                        "CLOSE"
                    );
                } else {
                    showSweetAlert(
                        "Generating code failed!",
                        "error",
                        response.data.message,
                        "CLOSE"
                    );
                }
                saveState("loading", false);
            })
            .catch(error => {
                showSweetAlert(
                    "Generating QR code failed!",
                    "error",
                    error.response.data.error_message,
                    "CLOSE",
                    () => {
                        saveState("loading", false);
                    }
                );
            });
    }
};

export const verifySMS = (verification_code, saveState) => {
    let email = localStorage.getItem("user_email");
    if (email) {
        saveState("loading", true);
        axios
            .post(
                config.baseURL + "/login/generate_sms/",
                {
                    verification_code,
                    email
                },
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            )
            .then(response => {
                if (response.data.valid) {
                    showSweetAlert(
                        "Validation successful!",
                        "success",
                        response.data.message,
                        "CLOSE",
                        () => {
                            localStorage.setItem("validated", true);
                            saveState("finalValid", true);
                        }
                    );
                } else {
                    showSweetAlert(
                        "Validation failed!",
                        "error",
                        response.data.message,
                        "CLOSE"
                    );
                }
                saveState("loading", false);
            })
            .catch(error => {
                showSweetAlert(
                    "Validation failed!",
                    "error",
                    error.response.data.error_message,
                    "CLOSE",
                    () => {
                        saveState("loading", false);
                    }
                );
            });
    }
};
