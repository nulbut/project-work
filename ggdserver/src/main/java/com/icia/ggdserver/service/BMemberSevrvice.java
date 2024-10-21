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

    public Map<String, String> bloginproc(BmemberTbl bmemberTbl) {
        log.info("loginproc()");
        BmemberTbl bdbMember = null;
        Map<String, String> rsMap = new HashMap<>();

        try {
            bdbMember = bmRepo.findById(bmemberTbl.getBid()).get();
            //db에서 꺼내온 사용자의 비밀번호와 입력한 비밀번호를 비교

            if (encoder.matches(bmemberTbl.getBpw(), bdbMember.getBpw())){
                //로그인 성공
                rsMap.put("res2","ok");
                rsMap.put("bid",bmemberTbl.getBid());
            }
            else {
                //비밀번호 틀림
                rsMap.put("res2","fail1");
                rsMap.put("msg","비밀번호가 일치하지 않습니다.");
            }
        }catch (Exception e){
            e.printStackTrace();
            //회원이 아닌 경우
            rsMap.put("res2","fail2");
            rsMap.put("msg","회원정보가 존재하지 않습니다.");
        }
        return rsMap;
    }//loginproc end
}
