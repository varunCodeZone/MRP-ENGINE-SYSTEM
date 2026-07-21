package com.varun.MRP_Engine.repository;

import com.varun.MRP_Engine.enity.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
    List<PurchaseOrder> findByItemId(Long itemId);
    List<PurchaseOrder> findByStatus(PurchaseOrder.POStatus status);
    void deleteByStatus(PurchaseOrder.POStatus status);}
