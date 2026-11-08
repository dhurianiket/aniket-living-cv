# Scroll-Triggered Entrance Animations & Visual Storytelling

This plan upgrades the visual storytelling across the **About**, **Experience Timeline**, and **Featured Projects** sections using `motion/react` scroll-triggered staggered reveals, blur-to-clear transitions, a scroll-drawn vertical progress spine, and subtle background parallax—while honoring the user's `reduceMotion` accessibility toggle.

## User Review & Critical Decisions

> [!IMPORTANT]
> All core animation preferences have been confirmed through our interactive design alignment:

- **Confirmed Decision 1 (Animation Style)**: Staggered entrance reveals combining a subtle upward slide (`y: 28 -> 0`), opacity fade (`0 -> 1`), and optical blur-to-clear transition (`filter: blur(8px) -> blur(0px)`) settled with a custom cubic-bezier curve (`[0.16, 1, 0.3, 1]`).
- **Confirmed Decision 2 (Viewport Trigger Behavior)**: Trigger once when scrolling into view (`viewport={{ once: true, amount: 0.15 }}`), preventing repetitive re-trigger distraction when scrolling back up the page.
- **Confirmed Decision 3 (Section-Specific Storytelling Enhancements)**:
  - **About Section**: Staggered narrative paragraph reveals on the left column and sequenced bento card cascades on the right column, paired with a subtle scroll-linked parallax ambient backdrop.
  - **Experience Timeline**: A continuous scroll-drawn vertical progress line (`useScroll` + `useSpring` driving `scaleY`) that illuminates as the user scrolls down the career history, paired with alternating horizontal/upward card entrances and glowing timeline node activation.
  - **Featured Projects**: Scroll-triggered section header reveal, staggered entrance choreography (`whileInView`) for project showcase cards, smooth layout re-ordering when switching persona modes (`Recruiter`, `Founder`, `Creative`), and subtle parallax depth shifts.

---

## 1. Overview & Core Concept

- **What It Does**: Transforms static or basic single-block section fades into a cohesive, choreographed visual narrative where headings, narrative paragraphs, career milestones, and system cards enter the viewport with cinematic timing and scroll-linked depth.
- **Target Audience / Persona**: Executive recruiters, startup founders, and creative directors exploring Aniket Dhuri's Living CV across different persona filter modes.
- **Key Value**: Guides the viewer's eye naturally through dense technical and creative credentials, creating a high-craft editorial portfolio feel without sacrificing content legibility or frame rate.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Scrolling into About**: The section headline reveals first with a crisp blur-clear lift, followed by each biographical paragraph staggering in sequentially (`80ms` intervals). Simultaneously, the Executive Profile card and the 2x2 capability bento grid cascade into place with subtle hover elevation.
  2. **Traversing the Experience Timeline**: As the viewport moves through the Experience section, a glowing cyan-to-violet vertical spine progressively draws downward in real time with scroll position. Each career milestone card slides and clears into focus from its respective side of the timeline (`odd` vs `even` alignment on desktop) while its central timeline node pulses into active contrast.
  3. **Exploring Featured Projects**: The section title and lead description animate in on scroll. Project cards enter with a staggered `whileInView` cascade (`120ms` stagger) rather than animating prematurely off-screen on initial page mount, while retaining smooth `layout` transitions when the user switches view modes in the header.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: High-contrast Obsidian Editorial & Precision Engineering (`#050505` stark canvas, translucent glass surfaces, crisp hairline borders).
  - *Color Palette & Mood*: Dominant deep obsidian (`--color-brand-black`), structural glass panels (`rgba(255, 255, 255, 0.03)` with `1px` borders), and focused 10% accents in electric cyan (`#00F0FF`), violet (`#8A2BE2`), and theatrical gold (`#D4AF37`).
  - *Typography & Hierarchy*: Bold geometric display headings (`Space Grotesk` / `Plus Jakarta Sans`) with `text-wrap: balance`, paired with clean readable body prose and `JetBrains Mono` tabular metadata.
  - *Component Styling & Layout*: Full 1440px desktop spatial presence with generous section padding (`py-32`), single-elevation glass cards, and compositor-only motion properties (`transform`, `opacity`, `filter`).
- **Interactive Feedback & Motion**:
  - Settling curve: `[0.16, 1, 0.3, 1]` over `650ms–750ms` for scroll entrances; `150ms–200ms` for hover micro-interactions.
  - Full accessibility compliance: When `reduceMotion` is active in `AppStateContext`, all scroll offsets, blurs, and staggers bypass immediately to their final resting state (`opacity: 1, y: 0, filter: 'blur(0px)'`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Variant-Driven Stagger Containers vs. Manual Index Delays**
  - *Chosen Approach*: Use declarative `motion` parent container variants (`staggerChildren`, `delayChildren`) for the About paragraphs, About bento cards, and Featured Projects grid.
  - *Why*: Guarantees coordinated orchestration when parent containers enter the viewport and avoids brittle hardcoded delay math when items re-sort.
  - *Alternatives Considered*: Manual `delay: index * 0.15` on individual elements, which can feel disconnected if cards enter the viewport at different scroll positions.
- **Decision 2: Scroll-Linked Spine (`useScroll` + `useSpring`) in Experience Timeline**
  - *Chosen Approach*: Track scroll progress across the timeline container ref (`useScroll({ target: timelineRef, offset: ["start 80%", "end 20%"] })`) smoothed via `useSpring` to drive `scaleY` on the vertical timeline bar.
  - *Why*: Provides tactile, continuous visual feedback tied directly to the user's reading progress using GPU-accelerated `transform: scaleY` (`origin-top`).
  - *Alternatives Considered*: Static CSS gradient pseudo-element (`before:bg-gradient-to-b`), which lacks visual progression as the user reads down the timeline.
- **Decision 3: Viewport-Triggered Project Cards (`whileInView`) with Mode-Switch Layout Preservation**
  - *Chosen Approach*: Replace mount-time `animate={{ opacity: 1, y: 0 }}` in Featured Projects with `whileInView` entrance states and `viewport={{ once: true, amount: 0.12 }}`, combined with `layout={!reduceMotion}`.
  - *Why*: Previously, Featured Projects ran its entrance animation immediately on mount while off-screen below the fold, meaning users never saw the entrance when scrolling down. Using `whileInView` ensures the reveal happens right as the user reaches the section.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        AppStateContext Provider                         │
│           (mode: ViewMode, reduceMotion: boolean, modalStates)          │
└───────────────────┬─────────────────────────────────┬───────────────────┘
                    │                                 │
                    ▼                                 ▼
┌───────────────────────────────────────┐ ┌───────────────────────────────┐
│      Scroll & Parallax Hooks          │ │   Motion Variant Definitions  │
│  useScroll({ target, offset })        │ │  • sectionHeaderVariants      │
│  useTransform(scrollYProgress, ...)   │ │  • staggerContainerVariants   │
│  useSpring(scrollYProgress, config)   │ │  • blurSlideUpItemVariants    │
└─────────┬─────────────────┬───────────┘ └───────┬───────────────┬───────┘
          │                 │                     │               │
          ▼                 ▼                     ▼               ▼
┌───────────────────┐ ┌───────────────────────────┐ ┌─────────────────────┐
│   About Section   │ │    Experience Timeline    │ │  Featured Projects  │
│ ───────────────── │ │ ───────────────────────── │ │ ─────────────────── │
│ • Parallax Glow   │ │ • Scroll-Drawn Spine      │ │ • Parallax Backdrop │
│ • Staggered Bio   │ │   (scaleY origin-top)     │ │ • Header Reveal     │
│   Paragraphs      │ │ • Alternating Card Reveal │ │ • Staggered Grid    │
│ • Cascading Bento │ │ • Staggered Bullet List   │ │   Cards (once:true) │
│   Profile & Cards │ │ • Active Node Pulse       │ │ • Mode Sort Layout  │
└───────────────────┘ └───────────────────────────┘ └─────────────────────┘
```

- **Data Model & State**:
  - Reads `mode` (`default | recruiter | founder | creative`) and `reduceMotion` (`boolean`) from `useAppState()`.
  - Uses local `useRef<HTMLElement>(null)` references on each section (`About`, `ExperienceTimeline`, `FeaturedProjects`) to bind `useScroll` progress calculations safely without layout thrashing.
- **Interactive Component & State Mapping**:
  - **About Section**:
    - Section container tracks `scrollYProgress` to drive a subtle vertical parallax shift (`y: [-30, 30]`) on background ambient glow layers.
    - Left narrative column uses a stagger container (`staggerChildren: 0.1`) so the heading and each of the 5 narrative `<motion.p>` blocks slide up and unblur sequentially.
    - Right column uses a stagger container (`staggerChildren: 0.12, delayChildren: 0.15`) to reveal the Executive Profile card followed by each of the 4 capability bento cards.
  - **Experience Timeline**:
    - Timeline wrapper ref tracks scroll progress (`offset: ["start 75%", "end 25%"]`) through `useSpring` (`stiffness: 100, damping: 30`) to animate the central spine's `scaleY` from `0` to `1`.
    - Each timeline item animates once on `whileInView` (`margin: "-80px"`), sliding upward and inward (`x: ±24 -> 0, y: 24 -> 0, filter: blur(8px) -> blur(0px)`), while internal highlight bullets stagger in subtly.
  - **Featured Projects**:
    - Section header (`h2` + subtitle `<p>`) uses `whileInView` staggered blur-clear entrance.
    - Project cards use `whileInView="visible"` with `viewport={{ once: true, amount: 0.12 }}` and `custom={index}` delay staggering, while preserving `layout={!reduceMotion}` when `mode` changes re-order `sortedProjects` and preserving click handlers for opening the Deoyani OTT and Aegis AI case study modals.
