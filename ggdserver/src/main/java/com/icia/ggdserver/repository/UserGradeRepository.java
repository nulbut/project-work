package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.UserGradeTbl;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface UserGradeRepository extends CrudRepository<UserGradeTbl, Long> {

    @Transactional
    void deleteByUgIdIsGreaterThan(int ugId);
}
