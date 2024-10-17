package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.BmemberTbl;
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
public class BMemberSevrvice {
    //사업자 회원 Service
    @Autowired
    BMemberRepository bmRepo;

    @Autowired
    NMemberRepository nmRepo;

    //비밀번호를 암호화 하는 객체 (평문 암호화, 비교가능)
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    //아이디 중복 체크
    public Map<String, String> bidCheck(String b_id) {
        log.info("bidCheck()");
        Map<String, String> brsMap = new HashMap<>();

        long bmcnt = bmRepo.countByBid(b_id); //0 또는 1의 값 넘어옴
        log.info("bmcnt: {}", bmcnt);
        long nmcnt = nmRepo.countByNid(b_id);
        log.info("nmcnt: {}", nmcnt);

        if (bmcnt == 0 && nmcnt == 0){
            brsMap.put("res","ok");
            brsMap.put("msg","사용 가능한 아이디입니다.");
        }
        else {
            brsMap.put("res","fail");
            brsMap.put("msg","사용할 수 없는 아이디입니다.");
        }



        return brsMap;
    } //bidCheck end

    //회원가입
    public String joinBMember(BmemberTbl bmemberTbl) {
        log.info("joinBMember()");
        String res = null;

        //비밀번호 암호화
        String bepwd = encoder.encode(bmemberTbl.getBpw());
        log.info("bepwd : {}", bepwd);
        bmemberTbl.setBpw(bepwd);
        bmemberTbl.setBpwcheck(bepwd);

        try {
            bmRepo.save(bmemberTbl);
            res = "ok";
        } catch (Exception e){
            e.printStackTrace();
            res = "fail";
        }
        return res;
    } //joinBMember end
}
