import React, { Component } from 'react'
import Auth from '../../../../Routes/Auth'
import Footer from '../../../Footer/Footer'
import CreateEventMenuIconCard from '../../../Home/Cards/CreateEvent/CreateEventMenuIconCard'
import TopNavbar from '../../../Navbar/Navbar'
import Sidebar from '../../../Sidebar/Sidebar'
import Error404 from '../Errors/404'

export default class Event404 extends Component {
    render() {
        return (
            <>
            <main>
                    <TopNavbar/>
                    <Sidebar />
                        <Error404
                         h2="Oops! Event Not Be Found"
                         p="Sorry but the Event you are looking for does not exist, have been removed. name changed or is temporarily unavailable"
                         backTo="Back to home"
                         link="/home"
                         />
                    <Footer />
            </main>
                {Auth.isAuthenticated()?
                <>
                <CreateEventMenuIconCard />
                </>
                :''}
        </>
        )
    }
}
