package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.BmemberTbl;
import com.icia.ggdserver.entity.NmemberTbl;
import com.icia.ggdserver.repository.BMemberRepository;
import com.icia.ggdserver.repository.NMemberRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Status;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Member;
import java.util.*;

@Service
@Slf4j
public class NMemberService {
    // 일반 회원 Service
    @Autowired
    NMemberRepository nmRepo;

    @Autowired
    BMemberRepository bmRepo;

    @Autowired
    private JavaMailSender emailSender;

    //랜덤 인증 코드
    private String authNum;

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
        Map<String, String> rsMap = new HashMap<>();

        try {
            // ID로 회원 정보를 가져오되, Optional이 비어 있을 때 대비
            Optional<NmemberTbl> optionalMember = nmRepo.findById(nmemberTbl.getNid());

            if (optionalMember.isEmpty()) {
                // 회원이 존재하지 않는 경우
                rsMap.put("res1", "fail2");
                rsMap.put("msg", "회원정보가 존재하지 않습니다.");
                return rsMap;
            }

            // Optional에서 값 추출
            NmemberTbl ndbMember = optionalMember.get();

            // 회원의 상태 확인 ("사용중"인 경우에만 로그인 가능)
            if (!"사용중".equals(ndbMember.getNsituation())) {
                rsMap.put("res1", "fail9");  // 상태가 "사용중"이 아닌 경우
                rsMap.put("msg", "회원 상태가 유효하지 않습니다. (탈퇴 또는 중지 상태)");
                return rsMap;
            }

            // 비밀번호 비교
            if (encoder.matches(nmemberTbl.getNpw(), ndbMember.getNpw())) {
                // 로그인 성공
                rsMap.put("res1", "ok");
                rsMap.put("nid", ndbMember.getNid());
                rsMap.put("nnickname", ndbMember.getNnickname());
            } else {
                // 비밀번호 틀림
                rsMap.put("res1", "fail1");
                rsMap.put("msg", "비밀번호가 일치하지 않습니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            // 예기치 않은 오류 발생 시 처리
            rsMap.put("res1", "fail8");
            rsMap.put("msg", "로그인 중 오류가 발생했습니다.");
        }
        return rsMap;
    }//loginproc end

    //아이디 가져오기
    public NmemberTbl getNMember(String nid) {
        log.info("getNMember()");
        NmemberTbl nmemberTbl = nmRepo.findById(nid).get();
        nmemberTbl.setNpw("");
        return nmemberTbl;
    }


    public NmemberTbl getNickname(long nnickname) {
        log.info("getNickname()");

        //닉네임 가져와서 담기
        NmemberTbl nmemberTbl = nmRepo.findById(String.valueOf(nnickname)).get();

        return nmemberTbl;
    }




    //메일 인증
    public String sendEmail(String email)
            throws MessagingException,UnsupportedEncodingException {
        //메일 전송에 필요한 정보 설정
        //String email = nmRepo.selectMail(nid);
        MimeMessage emailForm = createEmailForm(email);
        //실제 메일 전송
        emailSender.send(emailForm);

        return authNum; //인증 코드 반환
    }


    private MimeMessage createEmailForm(String email)
            throws MessagingException, UnsupportedEncodingException {

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

    //랜덤 인증 코드 생성
    public void createCode() {
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


    public String changepass(NmemberTbl nmemberTbl) {
        log.info("changepass()");
        String res5 = null;

        //비밀번호 암호화
        String enpwd = encoder.encode(nmemberTbl.getNpw());
        log.info("enpwd : {} " , enpwd);


        try {
            nmemberTbl = nmRepo.findById(nmemberTbl.getNid()).get();
            nmemberTbl.setNpw(enpwd); //새 비밀번호로 변경
            nmemberTbl.setNpwcheck(enpwd); //비밀번호 체크
            nmRepo.save(nmemberTbl);
            res5 = "ok";
        } catch (Exception e){
            e.printStackTrace();
            res5 = "fail5";
        }

        return res5;
    }

    public NmemberTbl getNName(String nname) {
        log.info("getNName()");
        NmemberTbl nmemberTbl = nmRepo.findById(nname).get();
        nmemberTbl.setNemail("");
        return nmemberTbl;
    }

    // 아이디 찾기
    public Map<String, String> nidfindproc(NmemberTbl nmemberTbl) {
        log.info("nidfindproc()");
        NmemberTbl dbNMail = null;
        Map<String, String> mailMap = new HashMap<>();

        try {
            dbNMail = nmRepo.findByNemail(nmemberTbl.getNemail());
            //db에서 꺼내온 사용자의 이메일 비교
            if (dbNMail != null){
                //찾기 성공
                mailMap.put("res3","ok");
                //해당하는 아이디 꺼내오기
                mailMap.put("nid",dbNMail.getNid());
            }
            else {
                //이름이 틀린 경우
                mailMap.put("res3","fail3");
                mailMap.put("msg","가입된 이메일이 아닙니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
//            //이메일이 틀린 경우
//            mailMap.put("res3","fail3");
//            mailMap.put("msg","가입된 이메일이 아닙니다.");
        }
        return mailMap;
    }


    public Map<String, String> nemailCheck(String nemail) {
        log.info("nemailCheck()");
        Map<String, String> nersMap = new HashMap<>();

        long encnt = nmRepo.countByNemail(nemail); //0또는 1의 값이 넘어옴
        log.info("encnt : {}", encnt);

        if (encnt == 0) {
            nersMap.put("res7","ok");
        }
        else {
            nersMap.put("res7","err");
            nersMap.put("msg","이미 가입된 이메일 입니다.");
        }
        return nersMap;
    }
    // 회원정보 수정
    public String insertNmember(NmemberTbl nmemberTbl,
                                HttpSession session) {
        log.info("insertNmember()");
        String result = null;

        try {
            nmRepo.save(nmemberTbl);
            log.info("nid: {}", nmemberTbl.getNid());
            result = "ok";
        }catch (Exception e){
            e.printStackTrace();
            result = "fail";
        }
        return result;
    }




    //회원 삭제
    @Transactional
    public String Ndeletemember(String nid) {
        log.info("Ndeletemember()");
        String result = null;

        try {
            nmRepo.deleteByNMember(nid);  // 네이티브 쿼리 호출
            result = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            result = "fail";
        }
        return result;
    }

}//class end