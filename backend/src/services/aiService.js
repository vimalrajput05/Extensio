const Groq = require('groq-sdk')

const { GROQ_API_KEY } = require('../config/env')

const groq = new Groq({ apiKey: GROQ_API_KEY })

const SYSTEM_PROMPT = "You are a Chrome Extension code generator. You MUST respond with ONLY\n        a valid raw JSON object. No markdown. No backticks. No explanation.\n        No text before or after. Only the JSON object.\n        Required format:\n        {\n          title: short extension name as string,\n          files: array of objects each with filename and content as strings\n        }\n        Required files: manifest.json (Chrome Manifest V3), content.js,\n        popup.html, popup.js.\n        Rules: only request necessary Chrome permissions, no harmful code,\n        manifest must have valid name version and manifest_version 3."

exports.generateExtension = async function (prompt) {
  const completion = await groq.chat.completions.create({
    model: 'llama3-70b-8192',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: 'Generate a Chrome extension for: ' + prompt,
      },
    ],
  })

  const text = completion.choices[0].message.content.trim()
  const clean = text.replace(/```json|```/g, '').trim()

  let parsed
  try {
    parsed = JSON.parse(clean)
  } catch (e) {
    throw new Error('AI returned invalid format')
  }

  if (
    !parsed ||
    typeof parsed.title !== 'string' ||
    !Array.isArray(parsed.files) ||
    parsed.files.length === 0
  ) {
    throw new Error('AI returned invalid format')
  }

  return parsed
}

