import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
from selenium.common.exceptions import TimeoutException

# Path to geckodriver and Firefox
gecko_path = r"C:\Users\abdir\Downloads\geckodriver-v0.35.0-win64\geckodriver.exe"
firefox_binary_path = r"C:\Users\abdir\AppData\Local\Mozilla Firefox\firefox.exe"

# Set Firefox options
options = Options()
options.binary_location = firefox_binary_path

# Set up the Firefox driver
service = Service(executable_path=gecko_path)
driver = webdriver.Firefox(service=service, options=options)

# Navigate to login page
login_url = "http://localhost:5173/login?lng=en"
driver.get(login_url)

# Wait for the page to load
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "h2")))

# Test 1: Test invalid username (too short)
print("Test 1: Test invalid username (less than 4 characters)")
username_field = driver.find_element(By.NAME, "username")
password_field = driver.find_element(By.NAME, "password")
login_button = driver.find_element(By.XPATH, "//button[@type='submit']")

# Enter invalid username (less than 4 characters)
username_field.clear()
username_field.send_keys("abc")
password_field.clear()
password_field.send_keys("Valid1password")
login_button.click()

# Wait for validation error message
try:
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "error-message")))
    error_message = driver.find_element(By.CLASS_NAME, "error-message").text
    assert "Username must be at least 4 characters" in error_message, "Test Failed: Username validation failed."
    print("Test Passed: Invalid username validation message displayed.")
except TimeoutException:
    print("Test Failed: Error message for invalid username did not appear.")


# Close the browser
driver.quit()
