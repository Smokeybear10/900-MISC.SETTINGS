import fs from 'node:fs'
import path from 'node:path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function readMd(filename: string): string {
  const root = path.resolve(process.cwd(), '..')
  return fs.readFileSync(path.join(root, filename), 'utf-8')
}

export default function Home() {
  const readme = readMd('README.md')
  const prompts = readMd('PROMPTS.md')
  const playbook = readMd('PLAYBOOK.md')

  return (
    <>
      <nav>
        <a href="#readme">Overview</a>
        <a href="#prompts">Prompts</a>
        <a href="#playbook">Playbook</a>
      </nav>
      <main>
        <section id="readme">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
        </section>
        <hr />
        <section id="prompts">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{prompts}</ReactMarkdown>
        </section>
        <hr />
        <section id="playbook">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{playbook}</ReactMarkdown>
        </section>
      </main>
    </>
  )
}
