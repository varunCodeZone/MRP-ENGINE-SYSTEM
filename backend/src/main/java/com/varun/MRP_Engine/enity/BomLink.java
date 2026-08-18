package com.varun.MRP_Engine.enity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;

@Entity
@Table(name = "bom_links",
        uniqueConstraints = @UniqueConstraint(columnNames = {"parent_id", "child_id"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BomLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id", nullable = false)
    private Item parent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_id", nullable = false)
    private Item child;

    @Min(1)
    @Column(nullable = false)
    private Double quantityRequired;
}
