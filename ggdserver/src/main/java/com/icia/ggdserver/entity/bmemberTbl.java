package com.icia.ggdserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "bmember_tbl")
@Data
public class bmemberTbl { //사업자 회원 테이블
    @Id
    private String b_id; //아이디

    @Column(nullable = false, unique = true, length = 50)
    private String b_cname; //상호

    @Column(nullable = false, length = 13)
    private int b_cnum; //사업자등록번호

    @Column(nullable = false, length = 1)
    private int b_ttype; //과세유형

    @Column(nullable = false, length = 10)
    private String b_breality; //업태

    @Column(nullable = false, length = 20)
    private String b_btype; //업종

    @Column(nullable = false, length = 100)
    private String b_address; //주소

    @Column(nullable = false, length = 10)
    private String b_name; //대표자 이름

    @Column(nullable = false, length = 1)
    private int b_gender; //대표자 성별

    @Column(nullable = false, length = 10)
    private String b_bday; //대표자 생년월일

    @Column(nullable = false, length = 20)
    private String b_phonenum; //대표자 전화번호

    @Column(nullable = false, length = 2)
    private int b_banknum; //은행코드

    @Column(nullable = false, length = 14)
    private String b_baccunt; //계좌번호

    @Column(length = 10)
    private String b_mname; // 담당자 이름

    @Column(length = 20)
    private String b_mphonenum; //담당자 전화번호

    @Column(length = 100)
    private String b_memail; //담당자 이메일

    @Column(nullable = false, length = 50)
    private String b_pw; //비밀번호

}
