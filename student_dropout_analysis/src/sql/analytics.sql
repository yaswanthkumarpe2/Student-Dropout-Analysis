-- Student data table
CREATE TABLE IF NOT EXISTS students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    age INT,
    department VARCHAR(50),
    year_of_study INT,
    gpa DECIMAL(3,2),
    attendance_rate DECIMAL(5,2),
    risk_score DECIMAL(5,2),
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Risk factors table
CREATE TABLE IF NOT EXISTS risk_factors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    academic_performance DECIMAL(5,2),
    attendance_score DECIMAL(5,2),
    financial_status DECIMAL(5,2),
    social_engagement DECIMAL(5,2),
    personal_issues DECIMAL(5,2),
    assessment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Geographic distribution
CREATE TABLE IF NOT EXISTS geographic_data (
    id INT PRIMARY KEY AUTO_INCREMENT,
    region VARCHAR(100),
    student_count INT,
    dropout_rate DECIMAL(5,2),
    risk_level ENUM('Low', 'Medium', 'High'),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
