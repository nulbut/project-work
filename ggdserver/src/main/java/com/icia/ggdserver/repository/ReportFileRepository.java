package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.ReportFileTbl;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReportFileRepository extends CrudRepository<ReportFileTbl, Long> {

    List<ReportFileTbl> findByRfUid(long nnum);
}
