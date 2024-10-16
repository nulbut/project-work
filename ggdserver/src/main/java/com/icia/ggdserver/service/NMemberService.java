package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.NmemberTbl;
import com.icia.ggdserver.repository.BMemberRepository;
import com.icia.ggdserver.repository.NMemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class NMemberService {
    // 일반 회원 Service
    @Autowired
    NMemberRepository nmRepo;

    @Autowired
    BMemberRepository bmRepo;

    //비밀번호를 암호화하는 객체 (평문 암호화, 비교 기능)
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // 아이디 중복 체크
    public Map<String, String> nidCheck(String n_id){
        log.info("nidCheck()");
        Map<String, String> rsMap = new HashMap<>();

        long nmcnt = nmRepo.countByNid(n_id); //0또는 1의 값 넘어옴.
        log.info("nmcnt : {}", nmcnt);
        long bmcnt = bmRepo.countByBid(n_id); //0 또는 1의 값 넘어옴
        log.info("bmcnt: {}", bmcnt);

        if (nmcnt == 0 && bmcnt == 0){
            rsMap.put("res", "ok");
            rsMap.put("msg","사용 가능한 아이디입니다.");
        }
        else {
            rsMap.put("res","err");
            rsMap.put("msg","사용할 수 없는 아이디입니다.");
        }


        return rsMap;
    }//nidCheck end

    // 닉네임 중복 체크
    public Map<String, String> nnickCheck(String n_nickname) {
        log.info("nnickCheck()");
        Map<String, String> nrsMap = new HashMap<>();

        long niccnt = nmRepo.countByNnickname(n_nickname);
        log.info("niccnt : {}",niccnt);

        if (niccnt == 0){
            nrsMap.put("res","ok");
            nrsMap.put("msg","사용 가능한 닉네임입니다.");
        }
        else {
            nrsMap.put("res","err");
            nrsMap.put("msg","이미 사용중인 닉네임 입니다.");
        }
        return nrsMap;

    }

    //회원가입
    public String joinMember(NmemberTbl nmemberTbl) {
        log.info("joinMember()");
        String res = null;

        //비밀번호 암호화
        String epwd = encoder.encode(nmemberTbl.getNpw());
        log.info("epwd : {}", epwd);
        nmemberTbl.setNpw(epwd); //원래 비밀번호를 암호화된 비밀번호로 변경
        nmemberTbl.setNpwcheck(epwd);

        try{
            nmRepo.save(nmemberTbl);
            res = "ok";
        } catch (Exception e){
            e.printStackTrace();
            res = "fail";
        }
        return res;






    }//joinMember end

    //로그인 처리 메소드
    public Map<String, String> loginproc(NmemberTbl nmemberTbl) {
        log.info("loginproc()");
        NmemberTbl ndbMember = null;
        Map<String, String> rsMap = new HashMap<>();

        try {
            ndbMember = nmRepo.findById(nmemberTbl.getNid()).get();
            //db에서 꺼내온 사용자의 비밀번호와 입력한 비밀번호를 비교

            if (encoder.matches(nmemberTbl.getNpw(), ndbMember.getNpw())){
                //로그인 성공
                rsMap.put("res", "ok");
                rsMap.put("nid", nmemberTbl.getNid());
                rsMap.put("nnickname", nmemberTbl.getNnickname());
            }
            else {
                //비밀번호가 틀림
                rsMap.put("res","fail");
                rsMap.put("msg","비밀번호가 일치하지 않습니다.");
            }
        } catch (Exception e){
            e.printStackTrace();
            //회원이 아닌 경우
            rsMap.put("res","fail");
            rsMap.put("msg","회원정보가 존재하지 않습니다.");
        }
        return rsMap;
    }//loginproc end


    public NmemberTbl getNickname(long nnickname) {
        log.info("getNickname()");

        //닉네임 가져와서 담기
        NmemberTbl nmemberTbl = nmRepo.findById(String.valueOf(nnickname)).get();

        return nmemberTbl;
    }
}//class end