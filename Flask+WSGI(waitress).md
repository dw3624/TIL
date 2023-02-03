## 개요

Flask는 자체 서버로만 가동할 수 있는 애플리케이션 프레임워크입니다. 단 Flask의 서버는 확장성 관련 이슈로 production을 위해서는 WSGI를 따르는 서버가 필요합니다.

[Flask - Deployment Options](%5B%3Chttps://flask.palletsprojects.com/en/1.1.x/deploying/%3E%5D(%3Chttps://flask.palletsprojects.com/en/1.1.x/deploying/%3E))
> While lightweight and easy to use, **Flask’s built-in server is not suitable for production**  as it doesn’t scale well. Some of the options available for properly running Flask in production are documented here.

대표적인 production용 WSGI 서버로는 `Gunicorn`이나 `uWSGI` 등이 있습니다.

여기서는 Flask 문서에서 사례로 소개된 `Waitress`를 사용하겠습니다.

[Flask - Run with a Production Server](https://flask.palletsprojects.com/en/1.1.x/tutorial/deploy/#run-with-a-production-server)
> Instead, use a production WSGI server. For example, to use [Waitress](https://docs.pylonsproject.org/projects/waitress/en/stable/), first install it in the virtual environment:

## 가상 환경 세팅

```bash
$ python -m venv venv
$ source venv/Scripts/activate
```

## Flask 실행

아래와 같이 Flask 자체 서버로 애플리케이션을 실행할 수 있습니다.

Flask 자체 서버는 싱글스레드가 기본값입니다. `app.run()` 변수로 `threaded=True`를 추가하면 복수 스레드로 처리할 수 있습니다.

```python
from flask import Flask

app = Flask(__name__)

@app.route('/', methods=['GET'])
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(port=8080)
```

실행 시, 아래와 같이 production 환경에서 사용하지 않도록 경고하는 메시지가 표시됩니다.

```bash
$ python app.py 
 * Serving Flask app 'app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on <http://127.0.0.1:5000>
Press CTRL+C to quit
```

## Waitress 실행

```bash
$ pip install waitress
```

Waitress에서는 `app.run()` 대신 `serve()`로 Flask 애플리케이션을 실행합니다.

```python
from flask import Flask
from waitress import serve

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=8000)
```

경고가 없어졌습니다.

```bash
$ python app.py 
```

## Waitress 스레드 개수 변경

[Waitress - Design](%5B%3Chttps://docs.pylonsproject.org/projects/waitress/en/stable/design.html?highlight=thread#design%3E%5D(%3Chttps://docs.pylonsproject.org/projects/waitress/en/stable/design.html?highlight=thread#design%3E))

> When a channel determines the client has sent at least one full valid HTTP request, it schedules a "task" with a "thread dispatcher". The thread dispatcher maintains a fixed pool of worker threads available to do client work (by default, 4 threads).

스레드 개수는 `serve()` 변수로 `threads=INT`를 추가해 변경할 수 있습니다.

[Waitress - waitress-serve](%5B%3Chttps://docs.pylonsproject.org/projects/waitress/en/stable/runner.html#runner%3E%5D(%3Chttps://docs.pylonsproject.org/projects/waitress/en/stable/runner.html#runner%3E))

> `--threads=INT`
> 
> Number of threads used to process application logic, default is 4.

```python
if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=8000, threads=10)
```

## 참고

-   [FlaskのWSGIサーバーにWaitressを使い、スレッド数を変更する](%5B%3Chttps://qiita.com/shimac/items/557dd5e6b3071ba12f05%3E%5D(%3Chttps://qiita.com/shimac/items/557dd5e6b3071ba12f05%3E)