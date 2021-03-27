import React from 'react'
import Navbar from "./Navbar"

function Seller() {

  const user = JSON.parse(localStorage.getItem("JWT"))

    return (
        <div>
            <Navbar name = {user.userName} _id = {user._id} />
            
        </div>
    )
}

export default Seller
