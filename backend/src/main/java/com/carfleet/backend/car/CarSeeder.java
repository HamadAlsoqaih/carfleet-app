package com.carfleet.backend.car;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class CarSeeder implements CommandLineRunner {

    private final CarRepository repository;

    public CarSeeder(CarRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) {
            return;
        }
        repository.saveAll(List.of(
                car("Camry 2023",  "Sedan",  "Toyota",  "2023-03-15", 28000, "Active",             "Riyadh HQ",     "Company sedan for executive transport"),
                car("Hilux 2022",  "Pickup", "Toyota",  "2022-07-20", 35000, "Active",             "Jeddah Branch", "Utility pickup for fieldwork"),
                car("Patrol 2024", "SUV",    "Nissan",  "2024-01-10", 62000, "Active",             "Riyadh HQ",     "VIP transport vehicle"),
                car("Accent 2021", "Sedan",  "Hyundai", "2021-11-05", 15000, "Under Maintenance",  "Dammam Branch", "Staff commuting vehicle")
        ));
    }

    private static Car car(String name, String category, String company, String purchaseDate,
                           double value, String status, String location, String description) {
        Car c = new Car();
        c.setName(name);
        c.setCategory(category);
        c.setCompany(company);
        c.setPurchaseDate(LocalDate.parse(purchaseDate));
        c.setValue(value);
        c.setStatus(status);
        c.setLocation(location);
        c.setDescription(description);
        return c;
    }
}
