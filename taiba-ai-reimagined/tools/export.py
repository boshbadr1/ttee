"""Optional standard-library export. Does not install, deploy, or contact services."""
from pathlib import Path
import base64
import re
import zipfile

PROJECT = Path(__file__).resolve().parents[1]
REPOSITORY = PROJECT.parent


def data_url(path):
    mime = "font/woff2" if path.suffix == ".woff2" else "image/svg+xml"
    return "data:" + mime + ";base64," + base64.b64encode(path.read_bytes()).decode()


def export():
    html = (PROJECT / "index.html").read_text()
    for filename in ("style.css", "screens.css"):
        css = (PROJECT / filename).read_text()
        for font in (PROJECT / "assets").glob("*.woff2"):
            css = css.replace("assets/" + font.name, data_url(font))
        html = html.replace(
            '<link rel="stylesheet" href="' + filename + '">',
            "<style>\n" + css + "\n</style>",
        )
    html = re.sub(r'\s*<link rel="preload"[^>]*>', "", html)
    scripts = []
    for filename in ("demo.js", "screens.js"):
        html = re.sub(
            r'\s*<script src="' + re.escape(filename) + r'" defer></script>', "", html
        )
        js = (PROJECT / filename).read_text().replace("</script", "<\\/script")
        # Keep the standalone review navigable without an external concept file.
        js = js.replace(
            'href="concepts.html"', 'href="#" data-action="design-story"'
        )
        scripts.append("<script>\n" + js + "\n</script>")
    html = html.replace("</body>", "\n".join(scripts) + "\n</body>")
    html = html.replace(
        'href="assets/riwaq.svg"',
        'href="' + data_url(PROJECT / "assets/riwaq.svg") + '"',
    )
    (PROJECT / "standalone.html").write_text(html)
    (REPOSITORY / "Taiba_AI_Riwaq.html").write_text(html)
    archive = REPOSITORY / "Taiba_AI_Riwaq_Design.zip"
    with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as bundle:
        for path in sorted(PROJECT.rglob("*")):
            if path.is_file() and "__pycache__" not in path.parts:
                bundle.write(path, path.relative_to(REPOSITORY))
    with zipfile.ZipFile(archive) as bundle:
        assert bundle.testzip() is None
        print("Verified archive:", archive.name, len(bundle.namelist()), "files")
    print("Standalone:", len(html.encode()), "bytes; local fonts and scripts embedded")


if __name__ == "__main__":
    export()
