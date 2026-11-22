# SARANAM v1 implementation baseline

Gate A specification (Q1–Q208): approved.
Gate B: implementation authorized by owner.
Gate C: production requested but conditional on full acceptance, documented rights, technical safeguards, and per-release owner approval.

## Core product
- Five public pillars: Pooja, Prayers, Deeksha, Learn and Pilgrimage; Home and Search in header. Listen is a prominent task.
- English and Telugu interfaces; verified individual editions, 108-name Sarana Ghosha, complete reviewed morning/evening/Deeksha/Bhiksha journeys.
- At least three licensed human tracks: chant, bhajan and devotional recording, all verified on iOS and Android.
- Astro static site, readable HTML, custom cinematic temple-inspired design, low-motion reader and accessible typography.
- IndexedDB anonymous tracking, offline essential texts, explicit export/import and a twelve-month migration bridge.
- Git-backed editorial drafts privately reviewed, owner-controlled publishing, secure correction queue, strict free-tier operating policy.
- WCAG 2.2 AA, Good Core Web Vitals, versioned content, audit records, protected releases and compatible rollback.

## Execution safeguards
1. This branch changes no production files or live site.
2. Existing draft PR #2 contains a proposed Telugu prayer book and 108 Sarana entries. Preserve it and require a human religious/textual and rights review before any publication.
3. The current main-branch deployment workflow is automatic and unprotected. **Do not merge into main** before enforcing the production approval environment and branch protections.
4. Keep rights letters, reviewer personal data, draft unpublished content and private correction reports out of the public repository.
5. The readiness manifest is an index of evidence, not legal or editorial proof; validators cannot confirm that human approvals are authentic.
6. Never pay for services, domains, performers or licenses without separate, specific spending approval.
7. Gate C cannot be considered ready until the real evidence is checked and the strict command below passes, alongside security, device, accessibility and production signoff.

## Readiness commands
- Informational: node scripts/check-v1-readiness.mjs --report
- Unit checks: node --test scripts/check-v1-readiness.test.mjs
- Strict final gate: node scripts/check-v1-readiness.mjs --strict

## Evidence not yet available
- Reconciled 28-entry catalog and verified complete prayer text.
- Independent second-reader Telugu and tradition review.
- Rights clearance for texts, images and audio.
- Three licensed playable human recordings.
- Astro app, independent language pages, full journey features, secure editorial service.
- Cloudflare Access configuration, protected GitHub workflow, device/offline tests, rollback demonstration.

Do not mark Gate C passed merely by editing the manifest.
