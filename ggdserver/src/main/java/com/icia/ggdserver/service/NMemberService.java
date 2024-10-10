package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.NmemberTbl;
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
    public Map<String, String> nidCheck;
    // 일반 회원 Service
    @Autowired
    NMemberRepository nmRepo;

    //비밀번호를 암호화하는 객체 (평문 암호화, 비교 기능)
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // 아이디 중복 체크
    public Map<String, String> nidCheck(String n_id){
        log.info("nidCheck()");
        Map<String, String> rsMap = new HashMap<>();

        long nmcnt = nmRepo.countByNid(n_id); //0또는 1의 값 넘어옴.
        log.info("nmcnt : {}", nmcnt);

        if (nmcnt == 0){
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

        try{
            nmRepo.save(nmemberTbl);
            res = "ok";
        } catch (Exception e){
            e.printStackTrace();
            res = "fail";
        }
        return res;
    }//joinMember end


}
