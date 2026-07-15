package com.varun.MRP_Engine.controller;

import com.varun.MRP_Engine.dto.BomLinkDTO;
import com.varun.MRP_Engine.service.BomLinkService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bom")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BomLinkController {

    private final BomLinkService bomLinkService;

    @GetMapping
    public ResponseEntity<List<BomLinkDTO>> getAllBomLinks() {
        return ResponseEntity.ok(bomLinkService.getAllBomLinks());
    }

    @GetMapping("/children/{parentId}")
    public ResponseEntity<List<BomLinkDTO>> getChildrenOf(@PathVariable Long parentId) {
        return ResponseEntity.ok(bomLinkService.getChildrenOf(parentId));
    }

    @PostMapping
    public ResponseEntity<BomLinkDTO> createBomLink(@Valid @RequestBody BomLinkDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bomLinkService.createBomLink(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BomLinkDTO> updateBomLink(@PathVariable Long id, @Valid @RequestBody BomLinkDTO dto) {
        return ResponseEntity.ok(bomLinkService.updateBomLink(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBomLink(@PathVariable Long id) {
        bomLinkService.deleteBomLink(id);
        return ResponseEntity.noContent().build();
    }
}
