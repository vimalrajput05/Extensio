const Groq = require('groq-sdk')

const { GROQ_API_KEY } = require('../config/env')

const groq = new Groq({ apiKey: GROQ_API_KEY })

const SYSTEM_PROMPT = "You are a Chrome Extension code generator. You MUST respond with ONLY\n a valid raw JSON object. No markdown. No backticks. No explanation.\n No text before or after. Only the JSON object.\n Required format:\n {\n  title: short extension name as string,\n  files: array of objects each with filename and content as strings\n }\n Required files: manifest.json (Chrome Manifest V3), content.js,\n popup.html, popup.js.\n Rules: only request necessary Chrome permissions, no harmful code,\n manifest must have valid name version and manifest_version 3.\n\nIMPORTANT — Robust Content Script Rules (apply to ALL generated extensions that interact with webpage content, including ad blockers, dark mode toggles, keyword highlighters, element hiders, and similar DOM-modifying extensions):\n\nModern websites are often single-page applications (YouTube, job boards, social media, etc.) that load and change content dynamically via JavaScript without a full page reload. A script that only runs once when the page first loads will miss content that appears later. Therefore:\n\n1. Wrap the core feature logic in a single named function (e.g. applyFeature()).\n2. Call that function immediately when the script loads.\n3. Also set up a MutationObserver watching document.body with\n   { childList: true, subtree: true } that re-calls the same function whenever the DOM changes, so dynamically loaded content is also handled.\n4. Add a setInterval fallback calling the same function every 1000ms as a safety net.\n5. For ad-blocking or element-hiding use cases, target MULTIPLE relevant CSS selectors covering different known structures of the target site/feature, not just one or two generic ones. Include realistic, broad selectors.\n6. For 'dark mode' or full-page style-changing use cases, prefer injecting a single <style> element into the document head with CSS rules (e.g. filter: invert / specific background and text color overrides using high-specificity selectors like html, body, and common content containers), rather than trying to recolor every individual element via JavaScript. Ensure the injected style persists by re-checking with the MutationObserver pattern in case the site removes or overrides styles.\n7. For 'highlight keywords' or text-modification use cases, write a function that walks visible text nodes (using a TreeWalker on document.body, NodeFilter.SHOW_TEXT) and wraps matches in a <mark> or styled <span> element, and re-run this via the MutationObserver pattern so newly loaded text (e.g. from infinite scroll or AJAX-loaded job listings) is also processed. Avoid re-processing already-wrapped text to prevent infinite loops or duplicate wrapping (e.g. check if a parent already has the applied class/marker before modifying again).\n8. For 'hide sidebar/recommendations' use cases on sites like YouTube, target the actual known container elements for that section (e.g. YouTube's related-videos/sidebar containers go by names such as '#related', 'ytd-watch-next-secondary-results-renderer', 'ytd-compact-video-renderer' — use realistic current selectors based on the site mentioned) and hide them via style.display = 'none' or remove(), re-applied through the MutationObserver pattern.\n9. Never implement dynamic-site interactions as a single one-time querySelector call with no observer — this is considered an incomplete implementation and must be avoided.\n10. Always keep performance reasonable — avoid heavy DOM-wide text scanning on every single mutation event by checking only added nodes when possible, but prioritize correctness over micro-optimization for this use case.\n\nApply this resilient pattern by default to any content.js you generate for extensions involving page content blocking, hiding, styling, or text modification — regardless of whether the user's prompt explicitly asks for this level of robustness."

exports.generateExtension = async function(prompt) {
  const completion = await groq.chat.completions.create({
    model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',

    // model selection may be overridden via GROQ_MODEL env var

    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: 'Generate a Chrome extension for: ' + prompt
      }
    ]
  })

  const text = completion.choices[0].message.content.trim()

  const clean = text.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(clean)

  const isValidTitle = typeof parsed?.title === 'string' && parsed.title.trim().length > 0
  const isValidFiles = Array.isArray(parsed?.files) && parsed.files.length > 0

  if (!isValidTitle || !isValidFiles) {
    throw new Error('AI returned invalid format')
  }

  return parsed
}

