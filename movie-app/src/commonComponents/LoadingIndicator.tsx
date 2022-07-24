import React from "react";
import { Spinner } from "react-bootstrap";

type Props = {
    size: 'small' | 'medium' | 'large',
    message?: string
}

const LoadingIndicator = ({ size, message }: Props) => {
    let customHeight = "";
    let customWidth = "";
    switch (size) {
        case "small": {
            customHeight = "1.5rem";
            customWidth = "1.5rem";
            break;
        }
        case "medium": {
            customHeight = "2.5rem";
            customWidth = "2.5rem";
            break;
        }
        case "large": {
            customHeight = "4.5rem";
            customWidth = "4.5rem";
            break;
        }
    }
    const mystyle = {
        height: customHeight,
        width: customWidth
    };
    return (<>
        <div className="d-flex justify-content-center" >
            <Spinner animation="border" variant="warning" style={mystyle}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>

        </div>
        <div className="d-flex justify-content-center" >
            <span className="font-weight-light">{message}</span>
        </div>
    </>
    )
}

export default LoadingIndicator