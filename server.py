# server.py
# A tiny local server — not required for the demo (you can just open
# index.html directly in a browser), but useful if you want to show
# "we have a Python backend line" or if double-clicking HTML files
# causes issues with your browser's security settings.
#
# Run it with:  python server.py
# Then open:    http://localhost:8000

import http.server
import socketserver
import webbrowser

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

def main():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"SkillBridge is running at {url}")
        print("Press Ctrl+C to stop the server.")
        webbrowser.open(url)
        httpd.serve_forever()

if __name__ == "__main__":
    main()
