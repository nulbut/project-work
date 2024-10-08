import React from 'react';

const JoinB = () => {
    return (
        <div className='join'>
            <div className='essential'>
                <p>* 표시 필수 입력</p>
            </div>
            <div className='companyname'>
                <p>상호 *</p>
                <input placeholder='사업자 상호 입력' />
            </div>
            <div className='entrepreneurnum'>
                <p>
                    사업자등록번호 * 
                    <button>사업자등록번호 확인</button>
                    </p>
                    <input placeholder='"-" 제외한 13자리 숫자 입력'/>
            </div>
            <div className='taxation type'>
                <p>과세유형 *</p>
                <select>
                    <option value="1">일반 과세자</option>
                    <option value="2">간이 과세자</option>
                </select>
            </div>
            <div className='breality'>
                <p>업태 *</p>
                <input placeholder='업태 입력' />
            </div>
            <div className='btype'>
                <p>업종 *</p>
                <input placeholder='업종 입력' />
            </div>
            <div className='address'>
                <p>주소 *</p>
                <p>
                    <input placeholder='우편번호' />
                    <button>아이콘 들어갈것</button>
                </p>
                <p><input placeholder='사업자 주소' /></p>
                <p><input placeholder='상세 주소' /></p>
            </div>
            <div className='bid'>
                <p>
                    ID *
                    <button>ID 중복 확인</button>
                </p>
                <input placeholder='영어 대/소문자 4~12자' />
            </div>
            <div className='representativename'>
                <p>대표자 이름 *</p>
                <input placeholder='대표자 이름' />
            </div>
            <div className='representativegender'>
                <p>대표자 성별 *</p>
                <input type='radio'/>남성
                <input type='radio'/>여성
            </div>
            <div className='representativebirthday'>
                <p>대표자 생년월일 *</p>
                <input placeholder='YYYY-MM-DD' />
            </div>
            <div className='representativephoennum'>
                <p>대표자 전화번호 *</p>
                <p>
                <select>
                    <option value="1">010</option>
                    <option value="2">02</option>
                    <option value="3">032</option>
                    <option value="4">070</option>
                </select>
                -
                <input />
                -
                <input />
                </p>
            </div>
            <div className='banknum'>
                <p>정산 입금계좌 *</p>
                <select>
                    <option value="1">KB국민은행</option>
                    <option value="2">신한은행</option>
                    <option value="3">우리은행</option>
                    <option value="4">KEB하나은행</option>
                    <option value="5">부산은행</option>
                    <option value="6">경남은행</option>
                    <option value="7">대구은행</option>
                    <option value="8">광주은행</option>
                    <option value="9">전북은행</option>
                    <option value="10">제주은행</option>
                    <option value="11">SC제일은행</option>
                    <option value="12">씨티은행</option>
                    <option value="13">토스뱅크</option>
                    <option value="14">케이뱅크</option>
                    <option value="15">카카오뱅크</option>
                </select>
                <p>
                <input placeholder='"-"제외 입력' />
                </p>
            </div>
            <div className='managername'>
                <p>담당자 이름</p>
                <input placeholder='담당자 이름' />
            </div>
            <div className='managephoennum'>
                <p>담당자 전화번호</p>
                <p>
                <select>
                    <option value="1">010</option>
                    <option value="2">02</option>
                    <option value="3">032</option>
                    <option value="4">070</option>
                </select>
                -
                <input />
                -
                <input />
                </p>
            </div>
            <div className='manageremail'>
                <p>담당자 Email</p>
                <input placeholder='you@example.com' />
            </div>
            <div className='password'>
                <p>Password *</p>
                <input type="password" 
                placeholder='영문,숫자,특수문자 중 2종류 이상을 조합하여 최소 8자리' />
            </div>
            <div className='passwordcheck'>
                <p>비밀번호 확인 *</p>
                <input 
                type='password' 
            placeholder='영문,숫자,특수문자 중 2종류 이상을 조합하여 최소 8자리' />
            </div>
            <div className='joinbutton'>
                <button>
                    가입하기
                </button>
            </div>
        </div>
    );
};

export default JoinB;