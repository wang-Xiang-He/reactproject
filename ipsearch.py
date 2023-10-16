from fastapi import FastAPI, Response, Request, HTTPException
import uvicorn
import pandas as pd
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()

# 设置允许的来源
origins = [
    # "http://localhost:3000",  # 允许的前端域
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/download/")
async def download_csv(request: Request):
    data = await request.json()
    print(data)
    selected_values = data.get("selected_values", [])

    # 将查询参数转换为 Pandas DataFrame
    data = {
        "SelectedValue": selected_values
    }
    print(data)
    df = pd.DataFrame(data)

    # 将 DataFrame 转换为 CSV 字节流
    csv_io = BytesIO()
    df.to_csv(csv_io, index=False)
    csv_io.seek(0)

    # 发送 CSV 字节流给前端
    response = Response(content=csv_io.getvalue())
    response.headers["Content-Disposition"] = f"attachment; filename=example.csv"
    response.headers["Content-Type"] = "text/csv"

    return response

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/people/")
async def people():
    data=[
      {
        "id": 0,
        "name": "Wang",
        "email": "Wang@example.com",
        "POSITION": "Developer",
        "CREATED_AT": "2023-07-10"
      },
      {
        "id": 1,
        "name": "John",
        "email": "john@example.com",
        "POSITION": "Employee",
        "CREATED_AT": "2023-07-30"
      },
      {
        "id": 2,
        "name": "Emily",
        "email": "emily@example.com",
        "POSITION": "Employee",
        "CREATED_AT": "2023-07-30"
      },
      {
        "id": 3,
        "name": "Michael",
        "email": "michael@example.com",
        "POSITION": "Manager",
        "CREATED_AT": "2023-07-30"
      },
      {
        "id": 4,
        "name": "Sarah",
        "email": "sarah@example.com",
        "POSITION": "Employee",
        "CREATED_AT": "2023-07-30"
      },
      {
        "id": 5,
        "name": "David",
        "email": "david@example.com",
        "POSITION": "Employee",
        "CREATED_AT": "2023-07-30"
      },
      {
        "id": 6,
        "name": "Jessica",
        "email": "jessica@example.com",
        "POSITION": "Employee",
        "CREATED_AT": "2023-07-30"
      },
      {
        "id": 7,
        "name": "Daniel",
        "email": "daniel@example.com",
        "POSITION": "Employee",
        "CREATED_AT": "2023-07-30"
      },
      {
        "id": 8,
        "name": "Sophia",
        "email": "sophia@example.com",
        "POSITION": "Employee",
        "CREATED_AT": "2023-07-30"
      },
      {
        "id": 9,
        "name": "William",
        "email": "william@example.com",
        "POSITION": "Employee",
        "CREATED_AT": "2023-07-30"
      }
    ]
    return data

@app.get("/series/")
async def series():
    data={
        "data": [50, 40, 105, 150, 459, 640, 780, 981, 122]
      }
    return data

class User(BaseModel):
    username: str
    password: str

users_db = [
    {"id": 1, "username": "123456", "password": "123456"},
    {"id": 2, "username": "123", "password": "123"}
]

@app.get("/users/")
async def users():
    return users_db


@app.post("/login")
async def login(user: User):
    found_user = next((u for u in users_db if u["username"] == user.username and u["password"] == user.password), None)
    if found_user:
        return {"success": True, "token": "qwert","user":"Wang"}
    else:
        raise HTTPException(status_code=401, detail="Login failed")

if __name__ == "__main__":

    # 啟動 FastAPI 伺服器
    # uvicorn.run(app="ipsearch:app", host="0.0.0.0", port=3001, workers=4,reload=True)
    uvicorn.run(app="ipsearch:app", host="0.0.0.0", port=3001, workers=4,)