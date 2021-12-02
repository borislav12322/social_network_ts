import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {ProfilesPageType, setUserProfileAC} from "../../../redux/profile-reducer";
import {Profile} from "./Profile";

type PropsType = {}

class ProfileContainerClass extends React.Component<any, any> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response => {
            this.props.setUserProfileAC(response.data);
        });
    }

    render() {
        return (
            <Profile profileData={this.props.profileData}/>
        )
    }
}

const mapStateToProps = (state: ProfilesPageType) => {
    return {
        profileData: state.profileData
    }
}

export default connect(mapStateToProps, {
    setUserProfileAC,

})(ProfileContainerClass)