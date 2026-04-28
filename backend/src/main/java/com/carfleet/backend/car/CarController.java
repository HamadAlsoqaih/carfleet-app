package com.carfleet.backend.car;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    private final CarRepository repository;

    public CarController(CarRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public Page<Car> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return repository.findAll(PageRequest.of(page, size, Sort.by("id").ascending()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Car> create(@Valid @RequestBody Car car) {
        car.setId(null);
        Car saved = repository.save(car);
        return ResponseEntity.created(URI.create("/api/cars/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Car> update(@PathVariable Long id, @Valid @RequestBody Car incoming) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setName(incoming.getName());
                    existing.setCategory(incoming.getCategory());
                    existing.setCompany(incoming.getCompany());
                    existing.setPurchaseDate(incoming.getPurchaseDate());
                    existing.setValue(incoming.getValue());
                    existing.setStatus(incoming.getStatus());
                    existing.setLocation(incoming.getLocation());
                    existing.setDescription(incoming.getDescription());
                    return ResponseEntity.ok(repository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
