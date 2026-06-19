package com.jobtracker.service;

import com.jobtracker.dto.JobApplicationDTO;
import com.jobtracker.entity.ApplicationStatus;
import com.jobtracker.entity.JobApplication;
import com.jobtracker.entity.User;
import com.jobtracker.exception.BadRequestException;
import com.jobtracker.exception.ResourceNotFoundException;
import com.jobtracker.repository.JobApplicationRepository;
import com.jobtracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;

    // ─── Mappers ─────────────────────────────────────────────────────────────

    private JobApplicationDTO toDTO(JobApplication app) {
        JobApplicationDTO dto = new JobApplicationDTO();
        dto.setId(app.getId());
        dto.setCompanyName(app.getCompanyName());
        dto.setJobRole(app.getJobRole());
        dto.setLocation(app.getLocation());
        dto.setPackageAmount(app.getPackageAmount());
        dto.setApplicationDate(app.getApplicationDate());
        dto.setStatus(app.getStatus());
        dto.setNotes(app.getNotes());
        dto.setUserId(app.getUser().getId());
        return dto;
    }

    private JobApplication toEntity(JobApplicationDTO dto, User user) {
        JobApplication app = new JobApplication();
        app.setCompanyName(dto.getCompanyName());
        app.setJobRole(dto.getJobRole());
        app.setLocation(dto.getLocation());
        app.setPackageAmount(dto.getPackageAmount());
        app.setApplicationDate(dto.getApplicationDate());
        app.setStatus(dto.getStatus() != null ? dto.getStatus() : ApplicationStatus.APPLIED);
        app.setNotes(dto.getNotes());
        app.setUser(user);
        return app;
    }

    // ─── CRUD Operations ──────────────────────────────────────────────────────

    public List<JobApplicationDTO> getAllByUser(Long userId) {
        return jobApplicationRepository.findByUserId(userId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public JobApplicationDTO getById(Long id) {
        JobApplication app = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobApplication", "id", id));
        return toDTO(app);
    }

    public JobApplicationDTO createJobApplication(JobApplicationDTO dto) {
        if (dto.getUserId() == null) {
            throw new BadRequestException("User ID is required");
        }
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", dto.getUserId()));

        JobApplication app = toEntity(dto, user);
        return toDTO(jobApplicationRepository.save(app));
    }

    public JobApplicationDTO updateJobApplication(Long id, JobApplicationDTO dto) {
        JobApplication existing = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobApplication", "id", id));

        existing.setCompanyName(dto.getCompanyName());
        existing.setJobRole(dto.getJobRole());
        existing.setLocation(dto.getLocation());
        existing.setPackageAmount(dto.getPackageAmount());
        existing.setApplicationDate(dto.getApplicationDate());
        existing.setStatus(dto.getStatus() != null ? dto.getStatus() : existing.getStatus());
        existing.setNotes(dto.getNotes());

        return toDTO(jobApplicationRepository.save(existing));
    }

    public void deleteJobApplication(Long id) {
        if (!jobApplicationRepository.existsById(id)) {
            throw new ResourceNotFoundException("JobApplication", "id", id);
        }
        jobApplicationRepository.deleteById(id);
    }

    // ─── Search & Filter ──────────────────────────────────────────────────────

    public List<JobApplicationDTO> searchByCompany(Long userId, String companyName) {
        return jobApplicationRepository
                .findByUserIdAndCompanyNameContainingIgnoreCase(userId, companyName)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<JobApplicationDTO> filterByStatus(Long userId, ApplicationStatus status) {
        return jobApplicationRepository
                .findByUserIdAndStatus(userId, status)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
