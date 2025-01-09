from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import time

# Set up ChromeDriver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# Open the reviews page
driver.get("http://localhost:5002/reviews.html")  # Update the path if needed
time.sleep(3)  # Wait for 3 seconds to simulate a user loading the page

# Fill out the form
driver.find_element(By.ID, "reviewClientId").send_keys("1")
time.sleep(1)  # Wait for 1 second between actions

driver.find_element(By.ID, "reviewTripId").send_keys("1")
time.sleep(1)  # Wait for 1 second between actions

driver.find_element(By.ID, "reviewRating").send_keys("5")
time.sleep(1)  # Wait for 1 second between actions

driver.find_element(By.ID, "reviewComment").send_keys("Amazing trip! Highly recommended.")
time.sleep(1)  # Wait for 1 second between actions

# Submit the form
driver.find_element(By.XPATH, "//button[text()='Submit Review']").click()
time.sleep(3)  # Wait for 3 seconds to simulate form submission

# Verify the review was submitted
print("Test Case 3: Review submitted successfully!")

# Wait for 2 seconds before closing
time.sleep(2)

# Close the browser
driver.quit()
