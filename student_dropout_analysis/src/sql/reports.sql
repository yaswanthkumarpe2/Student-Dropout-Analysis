-- Reports table
CREATE TABLE IF NOT EXISTS reports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    type ENUM('Weekly', 'Monthly', 'Custom') NOT NULL,
    format ENUM('PDF', 'Excel', 'CSV') NOT NULL,
    status ENUM('Processing', 'Completed', 'Failed') DEFAULT 'Processing',
    generated_by INT,
    file_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    FOREIGN KEY (generated_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Report parameters
CREATE TABLE IF NOT EXISTS report_parameters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    report_id INT,
    parameter_name VARCHAR(50) NOT NULL,
    parameter_value TEXT,
    FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE
);

-- Report schedules
CREATE TABLE IF NOT EXISTS report_schedules (
    id INT PRIMARY KEY AUTO_INCREMENT,
    report_name VARCHAR(100) NOT NULL,
    frequency ENUM('Daily', 'Weekly', 'Monthly') NOT NULL,
    next_run TIMESTAMP NOT NULL,
    last_run TIMESTAMP,
    created_by INT,
    status ENUM('Active', 'Paused') DEFAULT 'Active',
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);
