package com.icia.ggdserver.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "nmember_tbl")
@Data
public class nmemberTbl {
    @Id
    private String n_id; //아이디 (PK)

    @Column(nullable = false, length = 30)
    private String n_nickname; //닉네임

    @Column(nullable = false, length = 50)
    private String n_pw; //비밀번호

    @Column(nullable = false, length = 10)
    private String n_name; //이름

    @Column(nullable = false, length = 10)
    private String n_bday; //생년월일

    @Column(nullable = false, length = 1)
    private String n_gender; //성별

    @Column(nullable = false, length = 20)
    private String n_phonenum; //전화번호

    @Column(nullable = false, length = 100)
    private String n_email; //이메일

    @Column(nullable = false, length = 70)
    private String n_address; //주소


}
