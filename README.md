# ULP Academy Website

This repository contains the source code for the ULP Academy website, a platform offering premium tuition for classes 10th and 12th, as well as third-party university and open schooling courses.

## Project Context

ULP Academy provides:
1.  **Tuitions**: Specialized coaching in Mathematics, Science, English, and Commerce/Accounts.
2.  **University/Open Schooling Courses**: Partnership courses from boards like BOSSE and NIOS.

The website serves as an informational portal for students and parents to learn about courses, faculty, fee structures, and admission processes.

## Project Structure

The project follows a static website structure:

-   `index.html`: The main landing page focusing on tuitions and academy overview.
-   `courses.html`: The listing page for third-party university and open schooling courses.
-   `bosse.html`: Detail page for the BOSSE (Board Of Open Schooling and Skill Education) course.
-   `nios.html`: Detail page for the NIOS (National Institute of Open Schooling) course.
-   `course-detail.html`: A template file for creating future course detail pages.
-   `style.css`: The main stylesheet containing all the styles for the website.
-   `script.js`: JavaScript file for interactivity (e.g., mobile navigation toggle).
-   `assets/`: Directory containing images and other static assets.

## Coding Guidelines

### HTML

-   **Semantic HTML**: Use semantic tags like `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` to structure the content.
-   **Classes**: Use descriptive class names (e.g., `.hero-title`, `.course-card`).
-   **IDs**: Use IDs for section navigation (e.g., `#home`, `#about`, `#courses`, `#contact`).
-   **External Resources**: Font Awesome for icons and Google Fonts (Outfit, Poppins) are linked in the `<head>`.

### CSS (`style.css`)

The CSS is organized as follows:

1.  **Variables (`:root`)**:
    -   Colors: `--primary-color`, `--secondary-color`, `--accent-color`, etc.
    -   Fonts: `--font-heading` (Poppins), `--font-body` (Outfit).
    -   Transitions: `--transition`.

2.  **Global Styles**:
    -   Reset: `* { margin: 0; padding: 0; box-sizing: border-box; }`
    -   Body styles: Font family, color, line height.
    -   Utilities: `.container`, `.text-center`, `.btn` classes for reusability.

3.  **Component/Section Styles**:
    -   Styles are grouped by section (Header, Hero, About, Courses, CTA, Contact, Footer).
    -   Specific styles for components like `.course-card`, `.faq-item`, `.sidebar-card`, `.fee-table`.

4.  **Responsive Design**:
    -   Media queries are used to adapt layouts for smaller screens (e.g., `@media (max-width: 768px)`).
    -   Flexbox and Grid are used for layouts.

### JavaScript (`script.js`)

-   Handles simple interactions like the mobile navigation toggle.
-   Keep the code clean and commented.

## How to Run

Simply open `index.html` in a web browser to view the website. No build process is required.
