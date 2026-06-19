package com.jobtracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardDTO {

    private long totalApplications;
    private long appliedCount;
    private long interviewCount;
    private long selectedCount;
    private long rejectedCount;
}
