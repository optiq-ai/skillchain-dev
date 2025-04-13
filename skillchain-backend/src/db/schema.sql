-- Plik implementacji schematu bazy danych PostgreSQL dla aplikacji SkillChain
-- Autor: Manus
-- Data: 11.04.2025

-- Włączenie rozszerzenia UUID (już wykonane wcześniej)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela języków
CREATE TABLE languages (
    id SERIAL PRIMARY KEY,
    code VARCHAR(5) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela kategorii ścieżek kariery
CREATE TABLE career_categories (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela tłumaczeń kategorii ścieżek kariery
CREATE TABLE career_category_translations (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES career_categories(id) ON DELETE CASCADE,
    language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (category_id, language_id)
);

-- Tabela ścieżek kariery
CREATE TABLE career_paths (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES career_categories(id) ON DELETE CASCADE,
    icon_path VARCHAR(255),
    color_hex VARCHAR(7) DEFAULT '#3f51b5',
    difficulty_level INTEGER NOT NULL CHECK (difficulty_level BETWEEN 1 AND 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela tłumaczeń ścieżek kariery
CREATE TABLE career_path_translations (
    id SERIAL PRIMARY KEY,
    career_path_id INTEGER NOT NULL REFERENCES career_paths(id) ON DELETE CASCADE,
    language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    job_outlook TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (career_path_id, language_id)
);

-- Tabela stanowisk
CREATE TABLE job_positions (
    id SERIAL PRIMARY KEY,
    career_path_id INTEGER NOT NULL REFERENCES career_paths(id) ON DELETE CASCADE,
    level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 5),
    salary_min INTEGER,
    salary_max INTEGER,
    years_experience_min INTEGER,
    years_experience_max INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela tłumaczeń stanowisk
CREATE TABLE job_position_translations (
    id SERIAL PRIMARY KEY,
    job_position_id INTEGER NOT NULL REFERENCES job_positions(id) ON DELETE CASCADE,
    language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    responsibilities TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (job_position_id, language_id)
);

-- Tabela umiejętności
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    skill_type VARCHAR(50) NOT NULL CHECK (skill_type IN ('technical', 'soft', 'domain')),
    icon_path VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela tłumaczeń umiejętności
CREATE TABLE skill_translations (
    id SERIAL PRIMARY KEY,
    skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (skill_id, language_id)
);

-- Tabela relacji stanowisk i umiejętności
CREATE TABLE job_position_skills (
    id SERIAL PRIMARY KEY,
    job_position_id INTEGER NOT NULL REFERENCES job_positions(id) ON DELETE CASCADE,
    skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    importance_level INTEGER NOT NULL CHECK (importance_level BETWEEN 1 AND 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (job_position_id, skill_id)
);

-- Tabela kursów i certyfikatów
CREATE TABLE courses_certifications (
    id SERIAL PRIMARY KEY,
    career_path_id INTEGER REFERENCES career_paths(id) ON DELETE SET NULL,
    provider VARCHAR(100) NOT NULL,
    url VARCHAR(255),
    is_certification BOOLEAN DEFAULT FALSE,
    difficulty_level INTEGER NOT NULL CHECK (difficulty_level BETWEEN 1 AND 5),
    duration_hours INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela tłumaczeń kursów i certyfikatów
CREATE TABLE course_certification_translations (
    id SERIAL PRIMARY KEY,
    course_certification_id INTEGER NOT NULL REFERENCES courses_certifications(id) ON DELETE CASCADE,
    language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    learning_outcomes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (course_certification_id, language_id)
);

-- Tabela zasobów edukacyjnych
CREATE TABLE learning_resources (
    id SERIAL PRIMARY KEY,
    resource_type VARCHAR(50) NOT NULL CHECK (resource_type IN ('book', 'video', 'article', 'tutorial', 'course', 'other')),
    url VARCHAR(255),
    skill_id INTEGER REFERENCES skills(id) ON DELETE SET NULL,
    career_path_id INTEGER REFERENCES career_paths(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela tłumaczeń zasobów edukacyjnych
CREATE TABLE learning_resource_translations (
    id SERIAL PRIMARY KEY,
    resource_id INTEGER NOT NULL REFERENCES learning_resources(id) ON DELETE CASCADE,
    language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    author VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (resource_id, language_id)
);

-- Tabela ustawień użytkowników (dla przyszłej implementacji)
CREATE TABLE user_settings (
    id SERIAL PRIMARY KEY,
    user_id UUID UNIQUE,
    language_code VARCHAR(5) NOT NULL DEFAULT 'pl',
    theme VARCHAR(20) NOT NULL DEFAULT 'light',
    notifications BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indeksy dla poprawy wydajności
CREATE INDEX idx_career_paths_category_id ON career_paths(category_id);
CREATE INDEX idx_career_path_translations_language_id ON career_path_translations(language_id);
CREATE INDEX idx_job_positions_career_path_id ON job_positions(career_path_id);
CREATE INDEX idx_job_position_translations_language_id ON job_position_translations(language_id);
CREATE INDEX idx_skill_translations_language_id ON skill_translations(language_id);
CREATE INDEX idx_job_position_skills_skill_id ON job_position_skills(skill_id);
CREATE INDEX idx_courses_certifications_career_path_id ON courses_certifications(career_path_id);
CREATE INDEX idx_course_certification_translations_language_id ON course_certification_translations(language_id);
CREATE INDEX idx_learning_resources_skill_id ON learning_resources(skill_id);
CREATE INDEX idx_learning_resources_career_path_id ON learning_resources(career_path_id);
CREATE INDEX idx_learning_resource_translations_language_id ON learning_resource_translations(language_id);

-- Triggery do automatycznej aktualizacji pól updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tworzenie triggerów dla wszystkich tabel
CREATE TRIGGER update_languages_updated_at BEFORE UPDATE ON languages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_career_categories_updated_at BEFORE UPDATE ON career_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_career_category_translations_updated_at BEFORE UPDATE ON career_category_translations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_career_paths_updated_at BEFORE UPDATE ON career_paths FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_career_path_translations_updated_at BEFORE UPDATE ON career_path_translations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_positions_updated_at BEFORE UPDATE ON job_positions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_position_translations_updated_at BEFORE UPDATE ON job_position_translations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skill_translations_updated_at BEFORE UPDATE ON skill_translations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_position_skills_updated_at BEFORE UPDATE ON job_position_skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_certifications_updated_at BEFORE UPDATE ON courses_certifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_certification_translations_updated_at BEFORE UPDATE ON course_certification_translations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_learning_resources_updated_at BEFORE UPDATE ON learning_resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_learning_resource_translations_updated_at BEFORE UPDATE ON learning_resource_translations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
