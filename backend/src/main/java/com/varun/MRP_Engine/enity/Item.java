package com.varun.MRP_Engine.enity;

import com.varun.MRP_Engine.enity.BomLink;
import com.varun.MRP_Engine.enity.InventoryStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "items")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, unique = true)
    private String name;

    @Column(length = 500)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ItemType type;

    @Column(nullable = false)
    private String unitOfMeasure;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BomLink> childLinks = new ArrayList<>();

    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BomLink> parentLinks = new ArrayList<>();

    @OneToOne(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    private InventoryStatus inventoryStatus;

    public enum ItemType {
        FINISHED_GOOD, SUB_ASSEMBLY, RAW_MATERIAL
    }
}
