import React, { useCallback, useRef, useState } from 'react';

const Phone = () => {
    const [ num, setNum ] = useState('');
    const phoneRef = useRef(); 

    //전화번호 입력 함수 
    const handlePhone = useCallback( (e) => {
        const value = phoneRef.current.value.replace(/\D+/g, "");
        const numberLength = 11; 

        let result;
        result = "";

        for (let i = 0; i< value.length && i < numberLength; i++) {
            switch (i) {
                case 3:
                    result += "-";
                    break;
                case 7 : 
                    result += "-";
                    break; 
                default:
                    break;
            }

            result += value[i];
        }
        phoneRef.current.value = result; 
        setNum(e.target.value);
    }, []);
    return (
        <div>
            <input 
                // className='input'
                // name='phonenum'
                // placeholder=' - 를 제외한 번호 입력'
                // value={num}
                // ref={phoneRef}
                // onChange={handlePhone}
                // {...register("nphonenum", {
                //     required: {value: true, message: "전화번호는 필수 입력값입니다."}
                // })}
                />
        </div>
    );
};

export default Phone;