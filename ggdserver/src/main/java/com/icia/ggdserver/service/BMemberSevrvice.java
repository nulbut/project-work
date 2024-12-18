package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.BmemberTbl;
import com.icia.ggdserver.repository.BMemberRepository;
import com.icia.ggdserver.repository.NMemberRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.util.*;

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
    // 로그인
    public Map<String, String> bloginproc(BmemberTbl bmemberTbl) {
        log.info("bloginproc()");
        Map<String, String> rsMap = new HashMap<>();

        try {
            // ID로 회원 정보를 가져오되, Optional이 비어 있을 때 대비
            Optional<BmemberTbl> optionalMember = bmRepo.findById(bmemberTbl.getBid());

            if (optionalMember.isEmpty()) {
                // 회원이 존재하지 않는 경우
                rsMap.put("res2", "fail4");
                rsMap.put("msg", "회원정보가 존재하지 않습니다.");
                return rsMap;
            }

            // Optional에서 값 추출
            BmemberTbl bdbMember = optionalMember.get();

            // 회원의 상태 확인 ("사용중"인 경우에만 로그인 가능)
            if (!"사용중".equals(bdbMember.getBsituation())) {
                rsMap.put("res2", "fail10");  // 상태가 "사용중"이 아닌 경우
                rsMap.put("msg", "회원 상태가 유효하지 않습니다. (탈퇴 또는 중지 상태)");
                return rsMap;
            }

            // 비밀번호 비교
            if (encoder.matches(bmemberTbl.getBpw(), bdbMember.getBpw())) {
                // 로그인 성공
                rsMap.put("res2", "ok");
                rsMap.put("bid", bdbMember.getBid());
                rsMap.put("bcname", bdbMember.getBcname());
            } else {
                // 비밀번호 틀림
                rsMap.put("res2", "fail3");
                rsMap.put("msg", "비밀번호가 일치하지 않습니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            // 예기치 않은 오류 발생 시 처리
            rsMap.put("res2", "fail11");
            rsMap.put("msg", "로그인 중 오류가 발생했습니다.");
        }
        return rsMap;
    }




    //아이디 가져오기
    public BmemberTbl getBMemeber(String bid) {
        log.info("getBMemeber()");
        BmemberTbl bmemberTbl = bmRepo.findById(bid).get();
        bmemberTbl.setBpw("");
        return bmemberTbl;
    }

    public String sendBEmail(String bEmail)
            throws MessagingException, UnsupportedEncodingException {
        //메일 전송에 필요한 정보 설정
        MimeMessage emailForm = createEmailform(bEmail);
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
        String res6 = null;

        //비밀번호 암호화
        String benpwd = encoder.encode(bmemberTbl.getBpw());
        String bidtest = bmemberTbl.getBid();
        log.info("benpwd : {} ", benpwd);

        try {
            bmemberTbl = bmRepo.findById(bmemberTbl.getBid()).get();
            bmemberTbl.setBpw(benpwd); //새 비밀번호로 변경
            bmemberTbl.setBpwcheck(benpwd);// 비밀번호 체크
            bmRepo.save(bmemberTbl);
            res6 = "ok";
        } catch (Exception e){
            e.printStackTrace();
            res6 = "fail6";
        }
        return res6;
    }

    //아이디 찾기
    public Map<String, String> bidfindproc(BmemberTbl bmemberTbl) {
        log.info("bidfindproc()");
        BmemberTbl dbBMail = null;
        Map<String, String> mailMap = new HashMap<>();

        try {
            dbBMail = bmRepo.findByBemail(bmemberTbl.getBemail());
            if(dbBMail != null){
                mailMap.put("res4", "ok");
                mailMap.put("bid", dbBMail.getBid());
            }
            else {
                mailMap.put("res4", "fail4");
                mailMap.put("msg", "가입된 메일이 아닙니다.");
            }


            //db에서 꺼내온 사업자의 대표자 이름과 이름 비교.
//            if (encoder.matches(bmemberTbl.getBname(), dbBMail.getBname())){
//                //찾기 성공
//                mailMap.put("res4","ok");
//                // 해당하는 대표자 이름, 아이디 꺼내오기
//                mailMap.put("bname",bmemberTbl.getBname());
//                mailMap.put("bid",bmemberTbl.getBid());
//            }
//            else {
//                //대표자 이름이 틀린 경우
//                mailMap.put("res4","fail3");
//                mailMap.put("msg","해당하는 대표자명의 회원이 존재하지 않습니다.");
//            }
        } catch (Exception e) {
            e.printStackTrace();
            //이메일이 틀린 경우
//            mailMap.put("res4","fail4");
//            mailMap.put("msg","가입된 이메일이 아닙니다.");
        }
        return mailMap;
    }

    public Map<String, String> bemailCheck(String bemail) {
        log.info("bemailCheck()");
        Map<String, String> bersMap = new HashMap<>();

        long ebcnt = bmRepo.countByBemail(bemail); //0또는 1의 값이 넘어옴
        log.info("ebcnt : {}", ebcnt);

        if (ebcnt == 0) {
            bersMap.put("res8","ok");
        } else {
            bersMap.put("res8","err");
            bersMap.put("msg","이미 가입된 이메일 입니다.");
        }
        return bersMap;
    }

    //회원정보 수정
    public String insertBmember(BmemberTbl bmemberTbl,
                                HttpSession session) {
        log.info("insertBmember()");
        String result = null;

        try {
            bmRepo.save(bmemberTbl);
            log.info("bid : {}", bmemberTbl.getBid());
            result = "ok";

        } catch (Exception e) {
            e.printStackTrace();
            result = "fail";
        }
        return result;
    }

    //회원 삭제
    @Transactional
    public String deletemember(String bid) {
        log.info("deletemember()");
        String result = null;

        try {
            bmRepo.deleteByMember(bid);  // 네이티브 쿼리 호출
            result = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            result = "fail";
        }
        return result;
    }

    //회원정보 수정
    public String bmemberwriteProc(BmemberTbl bmemberTbl,
                                   HttpSession session) {
        BmemberTbl existingMember = bmRepo.findById(bmemberTbl.getBid())
                .orElseThrow(() -> new RuntimeException("BMember not found"));

        if (bmemberTbl.getBpw() == null || bmemberTbl.getBpw().isEmpty()){
            bmemberTbl.setBpw(existingMember.getBpw());
        }
        bmRepo.save(bmemberTbl);
        return "ok";
    }
}//class end