-- Interventions table
CREATE TABLE IF NOT EXISTS interventions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    type ENUM('Academic', 'Financial', 'Social', 'Personal') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    status ENUM('Active', 'Completed', 'Cancelled') DEFAULT 'Active',
    success_rate DECIMAL(5,2) DEFAULT 0,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Student interventions
CREATE TABLE IF NOT EXISTS student_interventions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    intervention_id INT,
    enrollment_date DATE NOT NULL,
    status ENUM('Enrolled', 'Completed', 'Dropped') DEFAULT 'Enrolled',
    progress DECIMAL(5,2) DEFAULT 0,
    notes TEXT,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (intervention_id) REFERENCES interventions(id) ON DELETE CASCADE
);

-- Intervention metrics
CREATE TABLE IF NOT EXISTS intervention_metrics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    intervention_id INT,
    metric_date DATE,
    engagement_rate DECIMAL(5,2),
    completion_rate DECIMAL(5,2),
    success_rate DECIMAL(5,2),
    FOREIGN KEY (intervention_id) REFERENCES interventions(id) ON DELETE CASCADE
);
