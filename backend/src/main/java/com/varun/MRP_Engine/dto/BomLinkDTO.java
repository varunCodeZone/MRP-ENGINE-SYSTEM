package com.varun.MRP_Engine.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BomLinkDTO {
    private Long id;

    @NotNull(message = "Parent item ID is required")
    private Long parentId;

    @NotNull(message = "Child item ID is required")
    private Long childId;

    @NotNull @Min(value = 1, message = "Quantity must be at least 1")
    private Double quantityRequired;

    private String parentName;
    private String childName;
}
