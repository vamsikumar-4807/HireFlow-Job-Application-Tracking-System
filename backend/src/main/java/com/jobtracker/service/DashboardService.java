package com.jobtracker.service;

import com.jobtracker.dto.DashboardDTO;
import com.jobtracker.entity.ApplicationStatus;
import com.jobtracker.repository.JobApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final JobApplicationRepository jobApplicationRepository;

    public DashboardDTO getDashboardStats(Long userId) {
        long total         = jobApplicationRepository.countByUserId(userId);
        long applied       = jobApplicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.APPLIED);
        long interview     = jobApplicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.INTERVIEW_SCHEDULED);
        long selected      = jobApplicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.SELECTED);
        long rejected      = jobApplicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.REJECTED);

        return new DashboardDTO(total, applied, interview, selected, rejected);
    }
}
