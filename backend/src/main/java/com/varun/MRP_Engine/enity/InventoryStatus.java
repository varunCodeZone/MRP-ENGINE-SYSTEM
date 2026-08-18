package com.varun.MRP_Engine.enity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "inventory_status")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class InventoryStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false, unique = true)
    private Item item;

    @Column(nullable = false)
    private Double onHandQuantity;

    @Column(nullable = false)
    private Double reorderPoint;

    private String supplierName;
    private Double unitCost;
}