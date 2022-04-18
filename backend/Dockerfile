FROM python:3.9

WORKDIR /backend

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn","app:app","--host","0.0.0.0","--port","5000"]