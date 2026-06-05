from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent / 'app'
pattern = re.compile(
    r"export async function (GET|POST|PATCH|DELETE)\(\s*request: Request,\s*\{ params \}: \{ params: \{([^}]+)\} \},\s*\)\s*\{",
    re.MULTILINE,
)

for path in root.rglob('route.ts'):
    text = path.read_text(encoding='utf-8')
    matches = list(pattern.finditer(text))
    if not matches:
        continue
    new_text = text
    for match in reversed(matches):
        method = match.group(1)
        params_type = match.group(2).strip()
        replacement = f"export async function {method}(request: Request, context: {{ params: Promise<{{{params_type}}}> }}) {{"
        start, end = match.span()
        new_text = new_text[:start] + replacement + new_text[end:]
    # Insert await line after first connectDB call if missing
    if 'await connectDB();' in new_text:
        lines = new_text.splitlines()
        inserted = False
        for i, line in enumerate(lines):
            if 'await connectDB();' in line:
                next_line = lines[i + 1] if i + 1 < len(lines) else ''
                if 'const params = await context.params;' not in next_line:
                    lines.insert(i + 1, '    const params = await context.params;')
                    inserted = True
        if inserted:
            new_text = '\n'.join(lines)
    path.write_text(new_text, encoding='utf-8')
    print(f'Updated {path}')
