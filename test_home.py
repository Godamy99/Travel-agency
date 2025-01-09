from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time

# Set up ChromeDriver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# Open the home page
driver.get("http://localhost:5002/index.html")  # Updated to port 5002
time.sleep(3)  # Wait for 3 seconds to simulate a user loading the page

# Verify the page title
assert "Travel Agency" in driver.title
print("Test Case 1: Home page loaded successfully!")

# Wait for 2 seconds before closing
time.sleep(2)

# Close the browser
driver.quit()
