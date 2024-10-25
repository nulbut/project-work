package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.BoardFileTbl;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BoardFileRepository extends CrudRepository<BoardFileTbl, Long> {
    //문의게시글(board)에 해당하는 파일 목록을 가져오는 메소드
    List<BoardFileTbl> findByBoardFileNum(long boardCode);
    //문의게시글에 해당하는 파일 목록을 삭제하는 메소드
    void deleteByBoardFileNum(long boardCode);
}
