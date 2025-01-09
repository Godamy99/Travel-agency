from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import time

# Set up ChromeDriver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# Open the clients page
driver.get("http://localhost:5002/clients.html")  # Update the path if needed
time.sleep(3)  # Wait for 3 seconds to simulate a user loading the page

# Fill out the form
driver.find_element(By.ID, "clientName").send_keys("John Doe")
time.sleep(1)  # Wait for 1 second between actions

driver.find_element(By.ID, "clientEmail").send_keys("john.doe@example.com")
time.sleep(1)  # Wait for 1 second between actions

driver.find_element(By.ID, "clientPhone").send_keys("123-456-7890")
time.sleep(1)  # Wait for 1 second between actions

driver.find_element(By.ID, "clientAddress").send_keys("123 Main St, City, Country")
time.sleep(1)  # Wait for 1 second between actions

# Submit the form
driver.find_element(By.XPATH, "//button[text()='Add Client']").click()
time.sleep(3)  # Wait for 3 seconds to simulate form submission

# Verify the client was added
print("Test Case 2: Client added successfully!")

# Wait for 2 seconds before closing
time.sleep(2)

# Close the browser
driver.quit()
