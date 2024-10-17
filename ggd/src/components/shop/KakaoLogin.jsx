// import { getToken } from "../api/kakao";
// import { useEffect } from "react";

// const client_id = "4df251d64cea358e5a51f3121f1a941d";
// const redirect_uri = "http://localhost:3000/login";
// const response_type = "code";

// const KakaoLogin = () => {
//     // 백엔드에서 카카오로 호출하는 api
//     // 카카오로부터 받는 값 code=ooo 형식
//     // code=ooo 형태인 경우 = 카카오에서 받은 인가코드
//     useEffect(() => {
//         const search = new URLSearchParams(window.location.search); // http://localhost:3000/login?code=Lzu-_no4QF-K61VA3wXCokqlldObgnDISC18nv1uKX4cs9NmPaxqEwAAAAQKKiUQAAABkpYBND2UJG13ldIf8A
//         const code = search.get("code"); // Lzu-_no4QF-K61VA3wXCokqlldObgnDISC18nv1uKX4cs9NmPaxqEwAAAAQKKiUQAAABkpYBND2UJG13ldIf8A
//         const accessToken = localStorage.getItem('access_token');

//         // 카카오에서 리다이렉트 받은 경우 code가 들어있음
//         if (code && (!accessToken || accessToken === "undefind")) {
//             //POST /oauth/token을 보냄
//             handleGetToken();
//         }
//     }, []); //최초 로그인시 실행
    
//     const handleGetToken = async () => {
//         //백엔드 서버 요청->백엔드 서버에서 카카오로 요청
//         // 일단 프론트에서 카카오로 요청
//         const {
//             token_type,
//             access_token,
//             expires_in,
//             refresh_token,
//             refresh_token_expires_in,
//         } = await getToken();

//         localStorage.setItem('access_token', access_token);
//     }

//     const authParam = new URLSearchParams({
//         client_id: "4df251d64cea358e5a51f3121f1a941d",
//         redirect_uri: "http://localhost:3000/login",
//         response_type: "code"
//     });


//     return (
//         <a href={`https://kauth.kakao.com/oauth/authorize?${authParam.toString()}`}>
//             로그인
//         </a>
//     )
// }

// export default KakaoLogin; 