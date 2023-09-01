import React, { Fragment, useState } from 'react';
import './Header.css';
import {SpeedDial,SpeedDialAction} from '@material-ui/lab';
import { Backdrop } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useAlert} from 'react-alert';
import {logout} from '../../../actions/userAction';

const UserOptions = ({user}) => {
    const navigate = useNavigate();
    const [open,setOpen] = useState(false); 
    const dispatch = useDispatch();
    const alert = useAlert();

    const options = [
        {icon :<PersonIcon/>, name :"Profile",func:account},
        {icon :<ListAltIcon/>, name :"My Orders",func:orders},
        {icon :<ExitToAppIcon/>, name :"Logout",func:logoutUser}
    ];

    if(user.role === 'Admin'){
        options.unshift({icon :<DashboardIcon/>, name :"Dashboard",func:dashboard})
    }

    function dashboard(){
        navigate("/dashboard");
    }

    function orders(){
        navigate("/orders");
    }

    function account(){
        navigate("/account");
    }

    function logoutUser(){
        dispatch(logout());
        alert.success("Logged out successfully.");
    }

  return (
    <Fragment>
        <Backdrop open = {open} style = {{zINdex:"10"}}/>
        <SpeedDial
            className = "speedDial"
            ariaLabel='SpeedDial tooltip example'
            onClose={()=>setOpen(false)}
            onOpen={()=>setOpen(true)}
            open = {open}
            style = {{zIndex : "11"}}
            icon = {<img
                className = "speedDialIcon"
                src = {(user.avatar.url !== "Sample_url" && user.avatar.url !== "")?user.avatar.url:"/Profile.png"}
                alt = "Profile Img"
            />}
            direction = "down"
        >
            {options.map((item)=>(
                <SpeedDialAction key = {item.name} icon = {item.icon} tooltipTitle = {item.name} onClick = {item.func}/>
            ))}
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions