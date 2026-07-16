package com.varun.MRP_Engine.dto;

import com.varun.MRP_Engine.enity.PurchaseOrder;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PurchaseOrderDTO {
    private Long id;
    private Long itemId;
    private String itemName;
    private Double quantityOrdered;
    private Double unitCost;
    private Double totalCost;
    private String supplierName;
    private PurchaseOrder.POStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime approvedAt;
}
