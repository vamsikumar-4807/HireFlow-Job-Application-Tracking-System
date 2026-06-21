package com.jobtracker.controller;

import com.jobtracker.dto.ApiResponse;
import com.jobtracker.dto.DashboardDTO;
import com.jobtracker.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor

public class DashboardController {

    private final DashboardService dashboardService;

    // GET /api/dashboard?userId=1
    @GetMapping
    public ResponseEntity<ApiResponse<DashboardDTO>> getDashboard(@RequestParam Long userId) {
        DashboardDTO stats = dashboardService.getDashboardStats(userId);
        return ResponseEntity.ok(ApiResponse.success("Dashboard data fetched successfully", stats));
    }
}
