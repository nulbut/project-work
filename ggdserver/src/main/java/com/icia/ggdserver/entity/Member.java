package com.icia.ggdserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "member") //db의 테이블 이름
@Data
public class Member {
    @Id
    private String mid;//테이블의 기본키(primary key)

    @Column(name = "mpwd", nullable = false, length = 100)
    private String mpwd;

    @Column(nullable = false, length = 20)//name 옵션 생략
    private String mname;//'manme'으로 컬럼명 작성.

    @Column(nullable = false, length = 20)
    private String mphone;

    @Column(nullable = false, length = 30)
    private String mmail;
}
