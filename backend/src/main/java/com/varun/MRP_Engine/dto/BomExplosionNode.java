package com.varun.MRP_Engine.dto;

import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BomExplosionNode {
    private Long itemId;
    private String itemName;
    private String itemType;
    private String unitOfMeasure;

    private Double grossRequirement;
    private Double onHandQuantity;
    private Double netRequirement;

    private boolean needsPurchaseOrder;
    private String supplierName;
    private Double unitCost;
    private Double estimatedCost;

    @Builder.Default
    private List<BomExplosionNode> children = new ArrayList<>();
}
