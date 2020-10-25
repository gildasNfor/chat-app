import React from "react";
import "./contact.css"

const Contact = (props) => {
    return (
        <div className="my-profile">
            <img className="profile-pic" src={props.source} alt="display" />
            <p className="name ml-2">{`${props.name}`}</p>
        </div>
    );
};

export default Contact;
