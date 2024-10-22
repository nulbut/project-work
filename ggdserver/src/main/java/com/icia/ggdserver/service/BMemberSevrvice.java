package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.BmemberTbl;
import com.icia.ggdserver.repository.BMemberRepository;
import com.icia.ggdserver.repository.NMemberRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@Slf4j
public class BMemberSevrvice {
    //사업자 회원 Service
    @Autowired
    BMemberRepository bmRepo;

    @Autowired
    NMemberRepository nmRepo;

    @Autowired
    private JavaMailSender emailSender;

    //랜덤 인증 코드
    private String authNum;

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

    //로그인
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

    //아이디 가져오기
    public BmemberTbl getBMemeber(String bid) {
        log.info("getBMemeber()");
        BmemberTbl bmemberTbl = bmRepo.findById(bid).get();
        bmemberTbl.setBpw("");
        return bmemberTbl;
    }

    public String sendBEmail(String bmail)
        throws MessagingException, UnsupportedEncodingException {
        //메일 전송에 필요한 정보 설정
        MimeMessage emailForm = createEmailform(bmail);
        //실제 메일 전송
        emailSender.send(emailForm);
        return  authNum; //인증 코드 반환
    }

    private MimeMessage createEmailform(String email)
        throws MessagingException, UnsupportedEncodingException  {

        createCode(); //인증 코드 생성
        String setFrom = "rnjstnwjd32@gamil.com"; //email-config에 설정한 이메일 보내는사람 (수정이꺼)
        String title = "인증 번호"; //메일 제목

        MimeMessage message = emailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email); //보낼 이메일 설정
        message.setSubject(title); //제목 설정
        message.setFrom(setFrom); //보내는 이메일
        message.setText("인증 번호 :" + authNum + " "+"해당 인증번호를 인증번호 기입란에 동일하게 입력해주세요.");

        return message;

        }

    private void createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for (int i=0; i<8; i++) {
            int index = random.nextInt(3);

            switch (index) {
                case 0 :
                    key.append((char) ((int)random.nextInt(26) + 97));
                    break;
                case 1 :
                    key.append((char) ((int)random.nextInt(26) + 65));
                    break;
                case 2:
                    key.append(random.nextInt(9));
                    break;
            }
        }
        authNum = key.toString();
    }


    public String bchangepass(BmemberTbl bmemberTbl) {
        log.info("bchangepass()");
        String res = null;

        //비밀번호 암호화
        String benpwd = encoder.encode(bmemberTbl.getBpw());
        bmemberTbl = bmRepo.findById(bmemberTbl.getBid()).get();
        bmemberTbl.setBpw(benpwd); //새 비밀번호로 변경

        try {
            bmRepo.save(bmemberTbl);
            res = "ok";
        } catch (Exception e){
            e.printStackTrace();
            res = "fail";
        }
        return res;
    }
}//class end
