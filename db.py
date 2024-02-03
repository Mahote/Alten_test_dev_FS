import json
import mysql.connector

# SREPLACE THIS TO POPULATE THE DATABASE
conn = mysql.connector.connect(
    host='localhost', # If you run it in local
    user='YOUR_USER',
    password='YOUR_PASSWORD',
    database='products_db' # Name of the DB
 )
cursor = conn.cursor()

with open('front/src/assets/products.json', 'r') as file:
    products_data = json.load(file)

for product in products_data['products']:
    cursor.execute("""
        INSERT INTO products (code, name, description, image, price, category, quantity, inventoryStatus, rating)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        product['code'],
        product['name'],
        product['description'],
        product['image'],
        product['price'],
        product['category'],
        product['quantity'],
        product['inventoryStatus'],
        product['rating']
    ))

# Valider les changements et fermer la connexion
conn.commit()
conn.close()
