import React from 'react';
import { Link } from 'react-router-dom';
import "./scss/Mypage.scss";
import  Button from "../idealcup/Button";
import logo from "../images/logo.svg";
const Mypage = () => {
    const buttons =[
        {
            name: "마이페이지",
            path: "/mypage",
        },
        {
            name: "등록한 상품",
            path: "/",
        },
        {
            name: "주문내역/배송조회",
            path: "/OrderDelivery",
        },
        {
            name: "제고관리",
            path: "",
        },
        {
            name: "문의사항 관리",
            path: "",
        },
        {
            name: "사업자 정보변경",
            path: "",
        },
    ]
    return (
        <div className='sideber'>
            <div className='mypage'>
                <p>마이페이지<img src={logo}/></p>
            </div>
            <div className='border-ber'>
                <div>..님</div>
                {buttons.map((butn, idx) =>{
                    return (
                        <Link
                        className='sideber-menu'
                        to={butn.path}
                        key={idx}
                        >{butn.name}
          
                        </Link>
                    )
                })}
                <div className='btn'>
                <Button
                type="submit"
                size="large"
                color="black"

                >로그아웃
                </Button>
                </div>
            </div>
        </div>
    );
};

export default Mypage;