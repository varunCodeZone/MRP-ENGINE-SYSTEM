package com.varun.MRP_Engine.controller;

import com.varun.MRP_Engine.dto.*;
import com.varun.MRP_Engine.service.MrpService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/mrp")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MrpController {

    private final MrpService mrpService;

    @PostMapping("/explode")
    public ResponseEntity<MrpResultDTO> runMrp(
            @RequestParam Long productId,
            @RequestParam Double quantity) {
        return ResponseEntity.ok(mrpService.runMrp(productId, quantity));
    }

    @GetMapping("/purchase-orders")
    public ResponseEntity<List<PurchaseOrderDTO>> getAllPurchaseOrders() {
        return ResponseEntity.ok(mrpService.getAllPurchaseOrders());
    }

    @PutMapping("/purchase-orders/{id}/approve")
    public ResponseEntity<PurchaseOrderDTO> approvePurchaseOrder(@PathVariable Long id) {
        return ResponseEntity.ok(mrpService.approvePurchaseOrder(id));
    }
}
