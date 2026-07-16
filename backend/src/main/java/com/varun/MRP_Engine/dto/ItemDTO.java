package com.varun.MRP_Engine.dto;


import com.varun.MRP_Engine.enity.Item;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ItemDTO {
    private Long id;

    @NotBlank(message = "Item name is required")
    private String name;

    private String description;

    @NotNull(message = "Item type is required")
    private Item.ItemType type;

    @NotBlank(message = "Unit of measure is required")
    private String unitOfMeasure;

    private Double onHandQuantity;
    private Double reorderPoint;
    private String supplierName;
    private Double unitCost;
}
