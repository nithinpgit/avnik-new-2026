import React from "react";
import FilterPopup from "../../components/Filter/FilterPopup";
import { InnerFooter } from "../../components/Footer/Footer";
import TopNavbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProfileSection from "./Components/ProfileSection";

const Profile = () => {
document.title="Profile"
    return (
        <>
            <TopNavbar />
            <Sidebar />
            {/* <FilterPopup /> */}
            <ProfileSection />
            <InnerFooter />
        </>
    );
};

export default Profile;
