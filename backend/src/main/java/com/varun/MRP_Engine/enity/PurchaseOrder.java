package com.varun.MRP_Engine.enity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "purchase_orders")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PurchaseOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Column(nullable = false)
    private Double quantityOrdered;

    @Column(nullable = false)
    private Double unitCost;

    @Column(nullable = false)
    private Double totalCost;

    private String supplierName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private POStatus status;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime approvedAt;

    public enum POStatus { PENDING, APPROVED, REJECTED }

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) this.status = POStatus.PENDING;
    }
}
