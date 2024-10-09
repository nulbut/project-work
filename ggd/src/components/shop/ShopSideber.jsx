import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import "./scss/ShopSideber.scss";
import logo from "../images/logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBullhorn, 
        faHeart, 
        faUser, 
        faTruck,
        faBookOpen,
        faHeadphones} from "@fortawesome/free-solid-svg-icons";

const ShopSideber = () => {
    const menus = [
        {
            name:"이상형 월드컵",
            path:"/Idlecup",
            icon: <img src={logo}/> ,
        },
        {
            name:"공지사항",
            path:"/Notification",
            icon:<FontAwesomeIcon icon={faBullhorn} />,
        },
        {
            name:"찜목록",
            path:"/Dibs",
            icon:<FontAwesomeIcon icon={faHeart} />,
        },
        {
            name:"마이페이지",
            path:"/Mypage",
            icon:<FontAwesomeIcon icon={faUser} />,
        },
        {
            name:"주문/배송 조회",
            path:"/OrderDelivery",
            icon:<FontAwesomeIcon icon={faTruck} />,
        },
        {
            name:"구매후기",
            path:"/",
            icon:<FontAwesomeIcon icon={faBookOpen} />,
        },
        {
            name:"1:1 문의",
            path:"/Inquiry",
            icon:<FontAwesomeIcon icon={faHeadphones} />,
        },
    ]
    return (
        <div className='ShopSideber'>
            {menus.map((menu, index) =>{
                return (
                    <NavLink
                    className="ShopSideber-Menu"
                    to={menu.path}
                    key={index}
                >
                    <div className='ShopSideber-Icon'>{menu.icon}</div>
                    {menu.name}
                </NavLink>
                );
            })}
        </div>
    );
};

export default ShopSideber;