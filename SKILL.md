---
name: design-system-trang-ch
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

<!-- TYPEUI_SH_MANAGED_START -->

# TRANG CHỦ

## Mission
Deliver implementation-ready design-system guidance for TRANG CHỦ that can be applied consistently across e-commerce storefront interfaces.

## Brand
- Product/brand: TRANG CHỦ
- URL: https://www.rangrovietnam.com/
- Audience: online shoppers and consumers
- Product surface: e-commerce storefront

## Style Foundations
- Visual style: structured, accessible, implementation-first
- Main font style: `font.family.primary=wfont_641f2d_01093fd3ce954eb18d4f1cb2a12abd44`, `font.family.stack=wfont_641f2d_01093fd3ce954eb18d4f1cb2a12abd44, wf_01093fd3ce954eb18d4f1cb2a, orig_be_vietnam_pro_medium`, `font.size.base=15px`, `font.weight.base=400`, `font.lineHeight.base=30px`
- Typography scale: `font.size.xs=10px`, `font.size.sm=11px`, `font.size.md=12px`, `font.size.lg=13.33px`, `font.size.xl=15px`, `font.size.2xl=16px`, `font.size.3xl=18px`, `font.size.4xl=20px`
- Color palette: `color.surface.base=#000000`, `color.text.secondary=#242121`, `color.border.muted=#92908b`, `color.text.inverse=#ed1c24`, `color.surface.muted=#ffffff`, `color.surface.raised=#fffef4`
- Spacing scale: `space.1=2px`, `space.2=3px`, `space.3=5px`, `space.4=6px`, `space.5=7px`, `space.6=8px`, `space.7=10px`, `space.8=11px`
- Radius/shadow/motion tokens: `radius.xs=6px`, `radius.sm=10px`, `radius.md=25px`, `radius.lg=50px`, `radius.xl=999px` | `motion.duration.instant=200ms`, `motion.duration.fast=400ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
concise, confident, implementation-focused

## Rules: Do
- Use semantic tokens, not raw hex values in component guidance.
- Every component must define required states: default, hover, focus-visible, active, disabled, loading, error.
- Responsive behavior and edge-case handling should be specified for every component family.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy, variants, and interactions.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and migration notes.
6. End with QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.

<!-- TYPEUI_SH_MANAGED_END -->
