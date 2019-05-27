import axios from "axios";
import * as config from "../config";
import { showSweetAlert } from "./sweetAlert";

export const registerUser = (data, saveState) => {
    saveState("loading", true);
    axios
        .post(config.baseURL + "/register", data, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.data.success) {
                showSweetAlert(
                    "Registration successful!",
                    "success",
                    response.data.message,
                    "CLOSE",
                    () => {
                        saveState("loading", false);
                        saveState("mode", "login");
                    }
                );
            } else {
                showSweetAlert(
                    "Registration failed!",
                    "error",
                    response.data.message,
                    "CLOSE"
                );
            }
            saveState("loading", false);
        })
        .catch(error => {
            showSweetAlert(
                "Registration failed!",
                "error",
                error.response.data.error_message,
                "CLOSE",
                () => {
                    saveState("loading", false);
                }
            );
        });
};
