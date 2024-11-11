package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.IwcCommentTbl;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IwcCommentRepository extends CrudRepository<IwcCommentTbl, Long> {
    List<IwcCommentTbl> findByIwcCode(Long postId);
}
