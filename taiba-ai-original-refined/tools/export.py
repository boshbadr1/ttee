"""Export the original-style prototype. Standard library only; no deployment."""
from pathlib import Path
import base64
import re
import zipfile

PROJECT = Path(__file__).resolve().parents[1]
REPOSITORY = PROJECT.parent
NAME = 'Taiba_AI_Original_Style_Premium_Refinement'


def data_url(path):
    mime = 'font/woff2' if path.suffix == '.woff2' else 'image/svg+xml'
    return 'data:' + mime + ';base64,' + base64.b64encode(path.read_bytes()).decode()


def export():
    html = (PROJECT / 'index.html').read_text()
    css = (PROJECT / 'style.css').read_text()
    for font in (PROJECT / 'assets').glob('*.woff2'):
        css = css.replace('assets/' + font.name, data_url(font))
    html = html.replace('<link rel="stylesheet" href="style.css">', '<style>\n' + css + '\n</style>')
    html = re.sub(r'\s*<link rel="preload"[^>]*>', '', html)
    scripts = []
    for filename in ('demo.js', 'assets/i18n.js'):
        html = re.sub(r'\s*<script src="' + re.escape(filename) + r'" defer></script>', '', html)
        scripts.append('<script>\n' + (PROJECT / filename).read_text().replace('</script', '<\\/script') + '\n</script>')
    html = html.replace('</body>', '\n'.join(scripts) + '\n</body>')
    html = html.replace('href="assets/taiba-mark.svg"', 'href="' + data_url(PROJECT / 'assets/taiba-mark.svg') + '"')
    (PROJECT / 'standalone.html').write_text(html)
    (REPOSITORY / (NAME + '.html')).write_text(html)
    archive = REPOSITORY / (NAME + '.zip')
    with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as bundle:
        for path in sorted(PROJECT.rglob('*')):
            if path.is_file() and '__pycache__' not in path.parts:
                bundle.write(path, path.relative_to(REPOSITORY))
    with zipfile.ZipFile(archive) as bundle:
        assert bundle.testzip() is None
        print('Verified ZIP:', archive.name, len(bundle.namelist()), 'files')
    print('Embedded HTML:', len(html.encode()), 'bytes')


if __name__ == '__main__':
    export()
