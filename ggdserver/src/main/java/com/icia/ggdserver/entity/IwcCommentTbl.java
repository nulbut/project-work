package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "iwc_comment_tbl")
@Data
public class IwcCommentTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long iwcCommentId;

    @Column
    private long iwcCode;  // 댓글이 속한 게시글

    @Column
    private long iwcContentsCode;// 댓글이 속한 캐릭터

    @Column
    private String iwcContentsName;// 댓글이 속한 캐릭터

    @Column
    private String iwcContentsCategory;// 그 캐릭터의 카테고리

    @Column
    private String userId;  // 댓글을 작성한 사용자

    @Column(nullable = false)
    private String iwcCommentContent;  // 댓글 내용

    @CreationTimestamp
    @Column
    private Timestamp createdAt;
}
