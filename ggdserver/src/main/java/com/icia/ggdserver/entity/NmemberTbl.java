package com.icia.ggdserver.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "nmember_tbl")
@Data
public class NmemberTbl { //일반 회원 테이블
    @Id
    @Column(name = "n_id")
    private String nid; //아이디 (PK)

    @Column(name = "n_nickname", nullable = false, length = 30)
    private String nnickname; //닉네임

    @Column(name = "n_pw", nullable = false, length = 100)
    private String npw; //비밀번호

    @Column(name = "n_name", nullable = false, length = 10)
    private String nname; //이름

    @Column(name = "n_bday", nullable = false, length = 10)
    private String nbday; //생년월일

    @Column(name = "n_gender", nullable = false, length = 1)
    private int ngender; //성별

    @Column(name = "n_phonenum", nullable = false, length = 20)
    private String nphonenum; //전화번호

    @Column(name = "n_email", nullable = false, length = 100)
    private String nemail; //이메일

    @Column(name = "n_address", length = 100)
    private String naddress; //주소


}