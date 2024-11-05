package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "bmember_tbl")
@Data
public class BmemberTbl { //사업자 회원 테이블
    @Id
    @Column(name = "b_id")
    private String bid; //아이디 (PK)

    @Column(name = "m_num", nullable = false, length = 1)
    private int bmnum; // 회원 구분 번호 (사업자 = 2)

    @Column(name = "b_cname",nullable = false, unique = true, length = 50)
    private String bcname; //상호

    @Column(name = "b_cnum",nullable = false, length = 50)
    private String bcnum; //사업자등록번호

    @Column(name = "b_ttype", nullable = false, length = 1)
    private int bttype; //과세유형

    @Column(name = "b_breality", nullable = false, length = 10)
    private String bbreality; //업태

    @Column(name = "b_btype", nullable = false, length = 20)
    private String bbtype; //업종

    @Column(name = "b_email", nullable = false, length = 100)
    private String bemail; // 이메일

    @Column(name = "b_address", length = 100)
    private String baddress; //주소

    @Column(name = "b_name", nullable = false, length = 10)
    private String bname; //대표자 이름

    @Column(name = "b_gender", nullable = false, length = 1)
    private int bgender; //대표자 성별

    @Column(name = "b_bday", nullable = false, length = 10)
    private String bbday; //대표자 생년월일

    @Column(name = "b_phonenum", nullable = false, length = 20)
    private String bphonenum; //대표자 전화번호

    @Column(name = "b_banknum", nullable = false, length = 2)
    private int bbanknum; //은행코드

    @Column(name = "b_baccunt", nullable = false, length = 14)
    private String bbaccunt; //계좌번호

    @Column(name = "b_pw",nullable = false, length = 100)
    private String bpw; //비밀번호

    @Column(name = "b_pwcheck",nullable = false, length = 100)
    private String bpwcheck; //비밀번호 확인

    @Column(name = "b_mname", length = 10)
    private String bmname; // 담당자 이름

    @Column(name = "b_mphonenum", length = 20)
    private String bmphonenum; //담당자 전화번호

    @Column(name = "b_memail", length = 100)
    private String bmemail; //담당자 이메일

    @CreationTimestamp
    @Column(name = "b_signdt")
    private Timestamp bsigndt; //가입날짜

    @Column(name = "b_status")
    private String bstatus; // 회원 상태 ( 1 = (기본) 정상 , 2 = 정지 , 3 = 차단)

}