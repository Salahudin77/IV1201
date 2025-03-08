from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

# Path to geckodriver
gecko_path = r"C:\Users\abdir\Downloads\geckodriver-v0.35.0-win64\geckodriver.exe"

# Path to Firefox
firefox_binary_path = r"C:\Users\abdir\AppData\Local\Mozilla Firefox\firefox.exe"

# Set Firefox options
options = Options()
options.binary_location = firefox_binary_path

# Set up the Firefox driver
service = Service(executable_path=gecko_path)
driver = webdriver.Firefox(service=service, options=options)

# Navigate to the login page
driver.get("http://localhost:5173/login")

# Wait for the login form to load
try:
    WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
    print("Page Loaded: Body tag found.")
except TimeoutException:
    print("Error: Page did not load correctly.")

# Locate form elements
username_field = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "username")))
password_field = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "password")))
login_button = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//button[@type='submit']")))

# Test 1: Submit invalid credentials (too short username and password)
username_field.clear()
password_field.clear()
username_field.send_keys("abc")  # Too short
password_field.send_keys("123")  # Too short
login_button.click()

try:
    error_message = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "error-message")))
    print("Test Passed: Error message for invalid credentials appeared.")
except TimeoutException:
    print("Test Failed: No error message for invalid credentials.")

# Test 2: Submit a weak password (does not meet criteria)
username_field.clear()
password_field.clear()
username_field.send_keys("validUser")
password_field.send_keys("password")  # No number
login_button.click()

try:
    error_message = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "error-message")))
    print("Test Passed: Error message for weak password appeared.")
except TimeoutException:
    print("Test Failed: No error message for weak password.")

# Test 3: Submit valid credentials
username_field.clear()
password_field.clear()
username_field.send_keys("validUser")
password_field.send_keys("Password123")
login_button.click()

# Check for navigation to a different page after successful login
try:
    WebDriverWait(driver, 10).until(lambda d: d.current_url != "http://localhost:5173/login")
    print("Test Passed: Successfully logged in and navigated.")
except TimeoutException:
    print("Test Failed: Login did not navigate to the expected page.")

# Close the browser
driver.quit()
