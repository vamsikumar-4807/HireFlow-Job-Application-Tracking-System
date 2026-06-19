package com.jobtracker.controller;

import com.jobtracker.dto.ApiResponse;
import com.jobtracker.dto.JobApplicationDTO;
import com.jobtracker.entity.ApplicationStatus;
import com.jobtracker.service.JobApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    // GET /api/jobs?userId=1
    @GetMapping
    public ResponseEntity<ApiResponse<List<JobApplicationDTO>>> getAllJobs(
            @RequestParam Long userId) {
        List<JobApplicationDTO> jobs = jobApplicationService.getAllByUser(userId);
        return ResponseEntity.ok(ApiResponse.success("Applications fetched successfully", jobs));
    }

    // GET /api/jobs/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobApplicationDTO>> getJobById(@PathVariable Long id) {
        JobApplicationDTO job = jobApplicationService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Application fetched successfully", job));
    }

    // POST /api/jobs
    @PostMapping
    public ResponseEntity<ApiResponse<JobApplicationDTO>> createJob(
            @Valid @RequestBody JobApplicationDTO dto) {
        JobApplicationDTO created = jobApplicationService.createJobApplication(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Application added successfully", created));
    }

    // PUT /api/jobs/{id}
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<JobApplicationDTO>> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody JobApplicationDTO dto) {
        JobApplicationDTO updated = jobApplicationService.updateJobApplication(id, dto);
        return ResponseEntity.ok(ApiResponse.success("Application updated successfully", updated));
    }

    // DELETE /api/jobs/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteJob(@PathVariable Long id) {
        jobApplicationService.deleteJobApplication(id);
        return ResponseEntity.ok(ApiResponse.success("Application deleted successfully", null));
    }

    // GET /api/jobs/search?userId=1&company=Google
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<JobApplicationDTO>>> searchByCompany(
            @RequestParam Long userId,
            @RequestParam String company) {
        List<JobApplicationDTO> jobs = jobApplicationService.searchByCompany(userId, company);
        return ResponseEntity.ok(ApiResponse.success("Search results", jobs));
    }

    // GET /api/jobs/status/{status}?userId=1
    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<JobApplicationDTO>>> filterByStatus(
            @PathVariable ApplicationStatus status,
            @RequestParam Long userId) {
        List<JobApplicationDTO> jobs = jobApplicationService.filterByStatus(userId, status);
        return ResponseEntity.ok(ApiResponse.success("Filtered results", jobs));
    }
}
