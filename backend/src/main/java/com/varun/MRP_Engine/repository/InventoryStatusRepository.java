package com.varun.MRP_Engine.repository;

import com.varun.MRP_Engine.enity.InventoryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface InventoryStatusRepository extends JpaRepository<InventoryStatus, Long> {
    Optional<InventoryStatus> findByItemId(Long itemId);
}
