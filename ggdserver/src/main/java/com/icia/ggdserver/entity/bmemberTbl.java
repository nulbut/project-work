package com.icia.ggdserver.entity;

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
}
