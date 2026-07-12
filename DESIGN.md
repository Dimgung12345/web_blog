# DESIGN.md

# Retro Web 2005 Design System

## Vision

Build an AI Agent interface that feels like a premium website from the 2005–2008 era.

The experience should evoke the early Web 2.0 period, drawing inspiration from:

* Yahoo! Messenger
* MySpace
* Blogger
* phpBB Forums
* vBulletin
* Windows XP Luna
* Old MSN
* Early Gmail
* Digg
* Web portals of the mid-2000s

The goal is not to create a bad or outdated UI, but to intentionally recreate the visual language and interaction patterns of the early internet while maintaining modern functionality.

---

# Design Philosophy

## Information First

Modern interfaces often prioritize whitespace.

This project should prioritize information density.

Users should feel like they are visiting a classic web portal where multiple tools, widgets, and content blocks coexist on a single page.

Characteristics:

* Dense layouts
* Multiple panels
* Sidebar navigation
* Visible widgets
* Compact spacing
* Minimal scrolling

Example Layout:

+------------------------------------------------+
| Header                                         |
+------------------------------------------------+
| Sidebar | AI Chat Window | News / Widgets      |
|          |                |                    |
+------------------------------------------------+
| Footer                                         |
+------------------------------------------------+

---

## Skeuomorphic Design

Visual elements should have depth.

Use:

* Glossy buttons
* Beveled borders
* Inner shadows
* Gradient backgrounds
* 3D effects
* Raised panels

Avoid:

* Flat Design
* Glassmorphism
* Neumorphism
* Excessive blur effects
* Ultra-minimalist interfaces

---

# Color System

## Primary

Blue was the dominant web color during the 2005 era.

```css
--primary: #3366CC;
--primary-light: #6699FF;
--primary-dark: #003399;
```

## Secondary

```css
--secondary: #FFCC00;
--secondary-dark: #FF9900;
```

## Neutral

```css
--background: #F0F0F0;
--panel: #FFFFFF;
--border: #C0C0C0;
```

## Text

```css
--text-primary: #000000;
--text-secondary: #333333;
--link: #0000EE;
--visited-link: #551A8B;
```

---

# Typography

Preferred Fonts:

```text
Verdana
Tahoma
Arial
Trebuchet MS
```

Fallback:

```css
font-family: Verdana, Tahoma, Arial, sans-serif;
```

Rules:

* Base font size: 12px
* Body font size: 12–13px
* Section title: 14–16px
* Header title: 18–24px
* Tight line spacing

Avoid:

* Inter
* Geist
* SF Pro
* Modern startup typography

---

# Layout Rules

## Visible Borders

Every major section should be visually separated.

```css
border: 1px solid #BFBFBF;
```

Panels should feel like independent widgets.

---

## Multiple Columns

Preferred:

```text
Sidebar
Main Content
Utility Panel
```

Avoid:

```text
Single centered column
```

---

# Components

## Buttons

Style:

* Gradient background
* Border highlight
* Slight bevel effect
* Hover glow

Example:

```css
background: linear-gradient(
  to bottom,
  #ffffff,
  #dcdcdc
);

border: 1px solid #808080;
```

---

## Panels

Every section should live inside a panel.

Panel features:

* Title bar
* Border
* Subtle shadow
* Optional icon

Example:

```text
+--------------------+
| AI Assistant       |
+--------------------+
|                    |
| Chat content       |
|                    |
+--------------------+
```

---

## Navigation

Horizontal top navigation.

Example:

```text
Home | Chat | Search | Files | Settings
```

Hover state:

* Background color change
* Underline text

---

## Chat Window

The AI chat should resemble an old instant messenger.

Features:

* Timestamp for every message
* User avatar
* Agent avatar
* Bubble-less messages preferred
* Scrollable conversation log

Example:

```text
[12:30 PM]

User:
How do I scrape a website?

AI Agent:
First, inspect the HTML structure...
```

---

# Visual Effects

Allowed:

* Gradients
* Glossy highlights
* Drop shadows
* Beveled edges
* Pixel-perfect borders

Avoid:

* Glass blur
* Frosted panels
* Excessive animations
* Floating cards

---

# Icons

Preferred Sources:

* Silk Icons
* Fugue Icons
* FamFamFam Icons
* Windows XP style icons

Icon Size:

```text
16x16
24x24
32x32
```

Avoid oversized modern icons.

---

# Animations

Animations should be minimal.

Allowed:

* Fade-in
* Menu hover transitions
* Loading spinner

Duration:

```css
150ms - 250ms
```

Avoid:

* Spring animations
* Parallax effects
* Complex motion systems

---

# AI Agent Personality Through UI

The interface should feel like:

* A desktop application running inside a browser
* A web portal rather than a chatbot
* A productivity tool from the Windows XP era

Users should feel:

> "This looks like an advanced AI assistant that somehow existed in 2006."

---

# Accessibility

Despite the retro appearance:

* Maintain WCAG contrast standards
* Support keyboard navigation
* Support screen readers
* Provide scalable text
* Ensure responsive fallback for mobile devices

Accessibility must not be sacrificed for nostalgia.

---

# Anti-Patterns

Never use:

* Large empty whitespace
* Full-screen chat-only layouts
* Floating glass panels
* Borderless sections
* Oversized typography
* Modern SaaS aesthetics
* Apple-style minimalism
* AI startup landing page design

The UI should feel like a feature-rich internet portal from the golden age of Web 2.0.
