import fs from 'node:fs'
import path from 'node:path'

export const loadTemplate = (
  templateName: string,
  variables: Record<string, string>,
) => {
  const filePath = path.join(__dirname, './templates/', templateName)
  let html = fs.readFileSync(filePath, 'utf-8')

  for (const [key, value] of Object.entries(variables)) {
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), value)
  }

  return html
}
