package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "wash_requests") 
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WashRequest {

    public enum Status {
        PENDING, IN_PROGRESS, COMPLETED, REJECTED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private int numClothes;

    private String additionalInfo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(name = "requested_at", insertable = false, updatable = false)
    private java.sql.Timestamp requestedAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private java.sql.Timestamp updatedAt;
}
