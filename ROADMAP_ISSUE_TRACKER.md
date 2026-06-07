# Project Roadmap & Issue Tracker

This document tracks planned features, optimizations, and known bugs. Feel free to open an issue or submit a PR if you want to tackle any of these!

---

## Upcoming Features (TODO)

### Authentication & User Management
- [ ] **Error Handling:** Display descriptive error messages to users on the Sign Up / Sign In forms.
- [ ] **Account Linking:** Implement GitHub account linking logic for users who initially signed up via email/password.
- [ ] **Username Validation:** Add validation to restrict special characters and reserve specific system usernames (e.g., `admin`, `settings`).
- [ ] **Profile Polish:** Add a live character count display for the user biography.

### Social & Core Features
- [ ] **Comments Section:** Implement a fully functioning comments section for both Feed posts and Showcase posts.
- [ ] **Interactive Tags:** Make tags clickable so users can quickly explore topics.

### Search & Discovery
- [ ] **Search Functionality:** Implement global search for posts as well as specific filtering through tags.
- [ ] **Advanced Filtering:** Build out robust, functional filtering logic for discovery feeds.

### Performance & Optimization
- [ ] **Database Indexing:** Utilize PostgreSQL indexing on high-traffic columns (e.g., search queries, foreign keys) to speed up response times.
- [ ] **Pagination:** Implement pagination (cursor or offset-based) for feeds to prevent massive payload sizes.
- [ ] **Markdown Character Counter:** Refactor the character counting logic.
  - *Current state:* Strips Markdown syntax and counts raw text (feels hacky).
  - *Goal:* Investigate AST (Abstract Syntax Tree) parsing or a cleaner regex pipeline to handle boundary cases gracefully.

### Future Scope
- [ ] **Post Interactions:** Implement the ability for users to like and save posts.
- [ ] **Comment Interactions:** Implement liking logic for comments within threads.

---

## Known Bugs

The following bugs have been identified and are awaiting a fix:

### Profile
- [ ] **Bio Editing Population:** - **Issue:** Occasionally, when a user clicks to edit their bio, the textarea fails to populate with their existing content.
  - **Potential Cause:** Race condition between component mounting and data fetching/state hydration.