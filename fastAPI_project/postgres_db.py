import pandas as pd
from sqlalchemy import create_engine, exc

def get_employees():
    try:
        URL = "postgresql+psycopg2://postgres:1234@localhost:5432/postgres"
        engine = create_engine(URL, echo=False)
        df = pd.read_sql("SELECT * FROM employee", engine)
    except exc.OperationalError as e:
        print(e)
    else:
        return df.to_json(orient="records")

if __name__ == "__main__":
    df = get_employees()
    print(df)