import React from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Header } from "semantic-ui-react";

const MySwal = withReactContent(Swal);

export const showSweetAlert = (
    title,
    type,
    message,
    buttonText,
    callback = () => {
        return;
    }
) => {
    return MySwal.fire({
        title: (
            <Header as="h6" textAlign="center">
                <b>{title}</b>
            </Header>
        ),
        type: type,
        html: (
            <p
                style={{
                    fontSize: "16px",
                    textAlign: "center"
                }}
            >
                {message}
            </p>
        ),
        showCloseButton: true,
        focusConfirm: true,
        confirmButtonText: (
            <p style={{ color: "#ffffff" }}>
                <b>{buttonText}</b>
            </p>
        )
    }).then(() => {
        callback();
    });
};
