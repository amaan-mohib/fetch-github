import os
from app import app

if __name__ == '__main__':
    if os.getenv('ENV', 'DEV') == 'DEV':
        app.run(debug=True)
    else:
        from waitress import serve
        serve(app, host="0.0.0.0")
