package com.varun.MRP_Engine.repository;

import com.varun.MRP_Engine.enity.BomLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BomLinkRepository extends JpaRepository<BomLink, Long> {
    List<BomLink> findByParentId(Long parentId);
    List<BomLink> findByChildId(Long childId);
    boolean existsByParentIdAndChildId(Long parentId, Long childId);
}
