package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.Member;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends CrudRepository<Member, String> {
    // JPA는 기본적으로 crud 메소드가 제공된다.
    // 대표적으로 insert/update용 메소드는 save(entity),
    // delete용 메소드 delete(entity).
    // 기본키로 검색하는 select용 메소드는 findById(id).
    // 기본 메소드를 제외한 쿼리문 생성용 메소드는 작성한다.
    long countByMid(String mid);

    @Query(value = "select m.mmail from Member as m where m.mid=:mid")
    String selectMail(@Param("mid") String mid);
}
