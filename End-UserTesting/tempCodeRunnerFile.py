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

# Navigate to the register page
driver.get("http://localhost:5173/register")

# Wait for the register form to load
try:
    WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
    print("Page Loaded: Body tag found.")
except TimeoutException:
    print("Error: Page did not load correctly.")

# Locate form elements
fields = {
    "firstName": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "firstName"))),
    "lastName": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "lastName"))),
    "personNumber": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "personNumber"))),
    "email": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "email"))),
    "userName": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "userName"))),
    "password": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "password"))),
    "submit": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//button[@type='submit']")))
}

# Test 1: Submit invalid registration data
invalid_data = {
    "firstName": "A",  # Too short
    "lastName": "B",  # Too short
    "personNumber": "123456-789",  # Incorrect format
    "email": "invalid@kth.se",  # Invalid email
    "userName": "usr",  # Too short
    "password": "pass"  # Too weak
}

for field, value in invalid_data.items():
    fields[field].clear()
    fields[field].send_keys(value)

fields["submit"].click()

try:
    error_message = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "error-message")))
    print("Test Passed: Error message for invalid registration appeared.")
except TimeoutException:
    print("Test Failed: No error message for invalid registration.")

# Test 2: Submit valid registration data
valid_data = {
    "firstName": "John",
    "lastName": "Doe",
    "personNumber": "950625-1234",
    "email": "john.doe@example.com",
    "userName": "johndoe123",
    "password": "Password1"
}

for field, value in valid_data.items():
    fields[field].clear()
    fields[field].send_keys(value)

fields["submit"].click()

# Check for navigation to a different page after successful registration
try:
    WebDriverWait(driver, 10).until(lambda d: d.current_url != "http://localhost:5173/register")
    print("Test Passed: Successfully registered and navigated.")
except TimeoutException:
    print("Test Failed: Registration did not navigate to the expected page.")

# Close the browser
driver.quit()