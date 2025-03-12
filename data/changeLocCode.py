import psycopg2
import csv
import os
from dotenv import load_dotenv  # dotenv를 Python 방식으로 로드
import pandas as pd # 파일 읽기 

subway_df = pd.read_csv("subway.csv") # 지하철 정보 파일 
locker_df = pd.read_csv("locker.csv") # 보관함 정보 파일 

# 숫자가 나오기 전까지를 역 이름으로 추출 (예: '서울역1~13' → '서울역') 
locker_df["역사명"] = locker_df["보관함"].str.extract(r"^([^\d]+)") 
locker_df.to_csv("locker_output.csv", index=False)
s
# '역 이름' 칼럼을 기준으로 비교하여 True/False 설정
subway_df["보관함"] = subway_df["역사명"].isin(locker_df["역사명"])

# 결과 저장
subway_df.to_csv("updated_subway.csv", index=False)

print("완료! 'updated_subway.csv' 파일을 확인하세요.")

# .env 파일 로드
load_dotenv()

# PostgreSQL 연결
conn = psycopg2.connect(
    dbname=os.getenv("CLOUDSQL_DB"),
    user=os.getenv("CLOUDSQL_USER"),
    password=os.getenv("CLOUDSQL_PASS"),
    host=os.getenv("CLOUDSQL_HOST"),
    port=os.getenv("CLOUDSQL_PORT", "5432")  # 기본값 5432 설정
)

cur = conn.cursor()

# CSV 파일 읽기 및 삽입
with open("updated_subway.csv", "r", encoding="utf-8") as f:
    reader = csv.reader(f)
    next(reader)  # 첫 번째 행(헤더) 건너뛰기

    for row in reader:
        station_code, station_name, sub_line_number, y, x, islocker = row

        # ✅ islocker를 문자열에서 Boolean 값으로 변환
        islocker_bool = islocker.strip().lower() == "true"  # "true" -> True, 나머지 -> False

        cur.execute(
            """
            INSERT INTO sub_stations (station_name, station_code, sub_line_number, location, islocker, status, x, y)
            VALUES (%s, %s, %s, ST_SetSRID(ST_MakePoint(%s, %s), 4326), %s, 'Active', %s, %s)
            """,
            (station_name, station_code, sub_line_number, float(x), float(y), islocker_bool, float(x), float(y))
        )

conn.commit()
cur.close()
conn.close()
print("✅ 데이터 삽입 완료!")