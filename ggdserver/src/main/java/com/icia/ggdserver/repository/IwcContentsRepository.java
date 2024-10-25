package com.icia.ggdserver.repository;

import com.icia.ggdserver.dto.TurnImgDto;
import com.icia.ggdserver.entity.IwcContentsTbl;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface IwcContentsRepository extends CrudRepository<IwcContentsTbl, Long> {
    List<IwcContentsTbl> findAllByIwcContentsIwcCode(Long iwcContentsIwcCode);

    List<IwcContentsTbl> findTop2ByIwcContentsIwcCode(Long iwcContentsIwcCode);

    @Query(value = "select * " +
            "from iwc_contents_tbl where iwc_contents_iwc_code = :id " +
            "order by iwc_contents_code limit 2",nativeQuery = true)
    List<IwcContentsTbl> findimg(@Param(value = "id") long id );

}
