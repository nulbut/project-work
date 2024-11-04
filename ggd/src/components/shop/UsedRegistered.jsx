import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
// import Button from "./Button";
import ProductTable from "./ProductTable";
import Paging from "./Paging";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";

const df = (date) => moment(date).format("YYYY-MM-DD");

const UsedRegistered = () => {
    const nav = useNavigate();
    const usedsellerId = sessionStorage.getItem("nid");
    const pageNum = sessionStorage.getItem("pageNum");
    const [uitem, setUitem] = useState({});
    const [page, setPage] = useState({
       //페이징 관련 정보 저장
        totalPage : 0,
        pageNum : 1,
    });
        // 서버로부터 중고상품 가져오는 함수
        const getusedBoardList = (pageNum) => {
            axios
            .get ("/UsedList", { params: {pageNum : pageNum, 
                                 usedsellerId: usedsellerId} })
            .then((res) => {
                const { uList, totalPage, pageNum } = res.data;
                console.log(totalPage);
                setPage({ totalPage: totalPage, pageNum: pageNum });
                console.log(page);
                setUitem(uList);
                console.log(uList);
                sessionStorage.getItem("pageNum", pageNum);
            })
            .catch((err) => console.log(err));
        };

        //UsedRegistered 컴포넌트가 화면에 보일 때 서버로부터 중고상품 목로을 가져옴
        useEffect(() => {
            console.log(usedsellerId);
            if (usedsellerId === null) {
                nav("/", { replace:true });
                return;
            }
            pageNum !== null ? getusedBoardList(pageNum) : getusedBoardList(1);
        }, []);

        //중고상품목록
        let UsedBoardList = null;
        if (uitem.length === 0) {
            UsedBoardList = (
                <TableRow key={0}>
                    <TableColumn span={4}>등록된 중고상품이 없습니다.</TableColumn>
                </TableRow>
            );
        } else {
            UsedBoardList = Object.values(uitem).map((item) => (
                <TableRow key={item.usedCode}>
                    <TableColumn wd={"w-10"}>{item.usedCode}</TableColumn>
                    <TableColumn wd={"w-40"}>
                        <div onClick={() => getusedBoard(item.usedCode)}>
                            {item.usedName}
                        </div>
                    </TableColumn>
                    <TableColumn wd={"w-30"}>{item.usedcategoryCode}</TableColumn>
                    <TableColumn wd={"w-20"}>{item.usedsellerId}</TableColumn>
                    <TableColumn wd={"w-30"}>{df(item.usedDate)}</TableColumn>
                </TableRow>
            ));
        }
        const getusedBoard = (usedCode) => {
            nav("usView", { state: { uc: usedCode } });
        };

        return (
          <div className="table-ex">
            <h1>중고 등록한 상품</h1>
            <ProductTable hName={["번호", "상품", "종류", "판매자", "등록일"]}>
                {UsedBoardList}
            </ProductTable>
            <Paging page={page} getList={getusedBoardList} />
          </div>
        );
    };

    export default UsedRegistered;