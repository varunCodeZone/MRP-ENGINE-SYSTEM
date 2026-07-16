package com.varun.MRP_Engine.dto;

import lombok.*;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class MrpResultDTO {
    private Long productId;
    private String productName;
    private Double targetQuantity;
    private BomExplosionNode bomTree;
    private List<PurchaseOrderDTO> purchaseOrders;
    private Double totalEstimatedCost;
}
