// 카카오로 요청하는 api 
// http://localhost:3000/login?code=Lzu-_no4QF-K61VA3wXCokqlldObgnDISC18nv1uKX4cs9NmPaxqEwAAAAQKKiUQAAABkpYBND2UJG13ldIf8A
// code 추출해서 다시 토큰받기로 api 사용
// https://kauth.kakao.com/oauth/token

// export const getToken = async () => {
// 	const search = new URLSearchParams(window.location.search);
//     const code = search.get("code");
//     if(!code) {
//         return{};
//     }

//     const param = new URLSearchParams({
//         grant_type: "authorization_code",
//         client_id: "4df251d64cea358e5a51f3121f1a941d",
//         redirect_uri: "http://localhost:3000/login",
//         response_type: "code"
//     })

//     const response = await fetch("https://kauth.kakao.com/oauth/token",{
//         method: "POST",
//         headers: {
//             "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
//         },
//         body: param
//     });    

//     const result = await response.json();
//     console.log("result: ", result);
//     return result

// }