package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.IwcContentsTbl;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IwcContentsRepository extends CrudRepository<IwcContentsTbl, Long> {
    List<IwcContentsTbl> findAllByIwcContentsIwcCode(Long iwcContentsIwcCode);
}
