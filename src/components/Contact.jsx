import React from "react";

const Contact = (props) => {
    return (
        <div className="my-profile">
            <img className="profile-pic" src={props.source} alt="display" />
            <p className="name">{`${props.name}`}</p>
        </div>
    );
};

export default Contact;
