import pandas as pd
from sqlalchemy import create_engine

# Step 1: Load Excel data into a DataFrame
excel_file = "BE CSE 2015.xlsx"  # Path to your Excel file
sheet_name = "Sheet1"     # Specify the sheet name if needed
df = pd.read_excel(excel_file, sheet_name=sheet_name)

# Step 2: Connect to the PostgreSQL database
db_name = "your_database"
db_user = "your_username"
db_password = "your_password"
db_host = "localhost"
db_port = "5432"

engine = create_engine(f"postgresql+psycopg2://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}")

# Step 3: Write the DataFrame to the database
table_name = "your_table_name"
df.to_sql(table_name, con=engine, if_exists="replace", index=False)  # Use "append" to add data to an existing table

print(f"Data successfully imported into the table '{table_name}'.")
