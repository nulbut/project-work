package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.BoardFileTbl;
import com.icia.ggdserver.entity.BoardTbl;
import com.icia.ggdserver.entity.ProductTbl;
import com.icia.ggdserver.repository.BoardFileRepository;
import com.icia.ggdserver.repository.BoardRepository;
import com.icia.ggdserver.repository.ProductTblRepository;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@Slf4j
public class BoardService {
    @Autowired
    private BoardRepository bRepo;

    @Autowired
    private BoardFileRepository bfRepo;

    @Autowired
    private ProductTblRepository pRepo;

    public Map<String, Object> getBoardList(Integer pageNum, String bnid) {
        log.info("getBoardList() bnid : {}", bnid);

        if (pageNum == null) {
            pageNum = 1;
        }

        //페이지 당 보여질 문의게시글 개수
        int listCnt = 10;

        //페이징 조건 처리 객체 생성(Pageable)
        Pageable pb = PageRequest.of((pageNum - 1), listCnt,
                Sort.Direction.DESC,"BoardCode");
        //PageRequest.of(페이지번호, 페이지당 문의게시글 개수, 정렬방식, 컬럼명)

        Page<BoardTbl> result = bRepo.findByBoardCodeGreaterThanAndBnid(0L, bnid, pb);
        //page 객체를 list 로 변환 후 전송.
        List<BoardTbl> Blist = result.getContent();//page에서 문의게시글을 꺼내서
                                                       //boardList에 저장
        int totalPage = result.getTotalPages();// 전체 페이지 개수

        Map<String, Object> res = new HashMap<>();
        res.put("Blist", Blist);
        res.put("totalPage", totalPage);
        res.put("pageNum", pageNum);
        res.put("bnid", bnid);

        return res;
    }

    //문의 게시글 저장하는 메소드
    public String insertinquiry(BoardTbl board,
                                List<MultipartFile> files,
                                HttpSession session) {
        log.info("insertinquiry()");

        String result = null; // React 쪽으로 보내는 처리 결과 메시지

        try {
            // productCode를 통해 productName을 설정
            if (board.getProductCode() != 0) {
                // productCode로 ProductTbl에서 상품 이름 조회
                ProductTbl product = pRepo.findByProductCode(board.getProductCode());
                if (product != null) {
                    // 상품이 존재하면 productName을 설정
                    board.setProductName(product.getProductName());
                } else {
                    // 상품을 찾지 못한 경우 처리
                    board.setProductName("상품 정보 없음");
                    log.warn("No product found for productCode: {}", board.getProductCode());
                }
            } else {
                // productCode가 0인 경우 처리
                board.setProductName("상품 정보 없음");
                log.warn("Product code is 0, setting productName to '상품 정보 없음'");
            }

            // 게시글 저장
            bRepo.save(board);
            log.info("boardCode: {}", board.getBoardCode());

            // 파일 업로드 처리
            if (files != null && !files.isEmpty()) {
                fileUpload(files, session, board.getBoardCode());
            }

            result = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            result = "fail";
        }

        return result;
    }

    private void fileUpload(List<MultipartFile> files,
                            HttpSession session,
                            long boardCode) throws Exception{
        log.info("fileUpload()");

        String realPath = session.getServletContext().getRealPath("/");

        realPath += "update/"; //파일 저장 위치

        File folder = new File(realPath);

        if(folder.isDirectory() == false){
            folder.mkdir();//update폴더가 없을 때 생성.
        }

        //파일 목록에서 파일을 하나씩 꺼내서 저장
        for(MultipartFile mf : files) {
            String oriname = mf.getOriginalFilename();

            BoardFileTbl bf = new BoardFileTbl();
            bf.setBoardFileOriname(oriname);//원래 파일명
            bf.setBoardFileNum(boardCode);//문의게시글 번호

            String sysname = System.currentTimeMillis()
                    + oriname.substring(oriname.lastIndexOf("."));
            bf.setBoardFileSysname(sysname);

            //파일 저장
            File file = new File(realPath + sysname);
            mf.transferTo(file);

            //파일 정보를 db에 저장
            bfRepo.save(bf);
        }
    }

    public BoardTbl getBoard(long boardCode) {
        log.info("getBoard()");

        // 문의게시글 가져오기
        BoardTbl board = bRepo.findById(boardCode).orElse(null);

        // board가 존재하면
        if (board != null) {
            // 1. BoardTbl에서 productCode를 가져옵니다.
            long productCode = board.getProductCode();

            // 2. productCode가 유효한 값인지 확인 후, ProductTbl에서 productName을 가져옵니다.
            if (productCode != 0) {
                ProductTbl product = pRepo.findByProductCode(productCode); // ProductRepo를 통해 Product 테이블에서 조회
                if (product != null) {
                    board.setProductName(product.getProductName()); // Product 테이블에서 가져온 productName 설정
                } else {
                    board.setProductName("상품 정보 없음"); // 상품 정보를 찾지 못한 경우 처리
                }
            } else {
                board.setProductName("상품 정보 없음"); // productCode가 0인 경우 처리
            }

            // 첨부파일 목록 가져오기
            List<BoardFileTbl> bfList = bfRepo.findByBoardFileNum(boardCode);

            // 첨부파일 목록을 BoardTbl에 설정
            if (bfList != null && !bfList.isEmpty()) {
                board.setBoardFileTblList(bfList); // 첨부파일이 있으면 목록 설정
            } else {
                board.setBoardFileTblList(Collections.emptyList()); // 첨부파일이 없으면 빈 리스트 설정
            }
        } else {
            log.warn("Board not found for boardCode: {}", boardCode);
        }

        return board;
    }



    @Transactional
    public Map<String, String> deleteBoard(long boardCode,
                                           HttpSession session) {
        log.info("deleteBoard()");
        Map<String, String> reMap = new HashMap<>();

        try {
            //파일 삭제
            List<BoardFileTbl> fileList = bfRepo.findByBoardFileNum(boardCode);
            if(!fileList.isEmpty()) {
                deleteFiles(fileList,session);
            }
            bRepo.deleteById(boardCode);//문의게시글 삭제
            bfRepo.deleteByBoardFileNum(boardCode);//파일 목록(DB) 삭제
            reMap.put("res", "ok");
        } catch (Exception e) {
            e.printStackTrace();
            reMap.put("res", "fail");
        }
        return reMap;
    }

    private void deleteFiles(List<BoardFileTbl> fileList,
                             HttpSession session)
            throws Exception {
        log.info("deleteFiles()");
        String realPath = session.getServletContext().getRealPath("/");
        realPath += "update/";

        for(BoardFileTbl bf : fileList) {
            File file = new File(realPath + bf.getBoardFileOriname());
            if(file.exists()) {
                file.delete();
            }
        }

    }
}
