import sys
import os
import requests
from zipfile import ZipFile
import pandas as pd
import mysql.connector
from io import BytesIO
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()
# MySQL Configuration
MYSQL_HOST = os.getenv('MYSQL_HOST')
MYSQL_USER = os.getenv('MYSQL_USER')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_DATABASE = os.getenv('MYSQL_DATABASE')
MYSQL_TABLE = os.getenv('MYSQL_TABLE')
# BSE Bhavcopy URL
BSE_URL = "https://www.bseindia.com/download/BhavCopy/Equity/EQ{date}_CSV.ZIP"
# Mimic a browser user agent
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}
def download_and_extract_zip(url, destination_folder):

    response = requests.get(url,headers=HEADERS)
    # print(url)
    # Check if the request was successful (status code 200)
    if response.status_code == 200:

    # Extract the zip and save the content of the response to a local file
        with ZipFile(BytesIO(response.content)) as zip_file:
            zip_file.extractall(destination_folder)

        print(f"File '{os.path.basename(url)}' downloaded successfully.")
    else:
        print(f"Failed to download the file '{os.path.basename(url)}'. Status code: {response.status_code}")

def read_csv_and_store_mysql(csv_file, host, user, password, database, table, date):
    df = pd.read_csv(csv_file)
    # Trim spaces from string values in every column
    df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)
    data = df[["SC_CODE", "SC_NAME", "OPEN", "HIGH", "LOW", "CLOSE"]]
    data["DATE"] = date
    data = data.values.tolist()
    
    print(data)
    # exit(0)
    connection = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
    )
    cursor = connection.cursor()
    # Check if database already exists
    cursor.execute("SHOW DATABASES")
    databases=cursor.fetchall()
    flag=0
    print(f'Database is : {database}')
    for x in databases:
        # print(x[1:-1])
        if database in x:
            flag=1
            break
    if flag==0:
        cursor.execute(f"USE {database};")
    # Select the database
        # cursor.execute(f"SELECT {database}")
        # connection.database=database
    connection = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database
    )
    cursor = connection.cursor()
    # cursor.execute(f"Drop TABLE {table}")
    # Create the table if it doesn't exist
        # SC_CODE INT PRIMARY KEY,
    create_table_query = f"""
        CREATE TABLE IF NOT EXISTS {table} (
        SC_NAME VARCHAR(255),
        OPEN FLOAT,
        HIGH FLOAT,
        LOW FLOAT,
        CLOSE FLOAT,
        SC_CODE INT,
        DATE VARCHAR(10),
        PRIMARY KEY (SC_CODE, DATE)
    );
    """
    cursor.execute(create_table_query)

    # Insert data into the table
    insert_query = f"""
    INSERT IGNORE INTO {table} (SC_CODE, SC_NAME, OPEN, HIGH, LOW, CLOSE, DATE)
    VALUES (%s, %s, %s, %s, %s, %s, %s) ;
    """
    cursor.executemany(insert_query, data)

    connection.commit()
    connection.close()

def fetch_last_n_days_data(n):
    today = datetime.now()
    date_list = [(today - timedelta(days=i)).strftime("%d%m%y") for i in range(n)]
    return date_list

if __name__ == "__main__":
    if len(sys.argv)>1:
        days=int(sys.argv[1])
        if not isinstance(days,int):
            print('Invalid input: No of days...')
            sys.exit()
        else:
            days=days+1
    else:
        days=2
    destination_folder = "bse_data"
    os.makedirs(destination_folder, exist_ok=True)

    date_list = fetch_last_n_days_data(days)
    curr_date=date_list[0]
    for date in date_list:
        if(date!=curr_date):
            zip_url = BSE_URL.format(date=date)
            download_and_extract_zip(zip_url, destination_folder)

            csv_file = os.path.join(destination_folder, f"EQ{date}.CSV")
            if os.path.exists(csv_file):
                read_csv_and_store_mysql(
                csv_file,
                MYSQL_HOST,
                MYSQL_USER,
                MYSQL_PASSWORD,
                MYSQL_DATABASE,
                MYSQL_TABLE,
                date
                )
