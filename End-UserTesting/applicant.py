import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
from selenium.common.exceptions import TimeoutException, UnexpectedAlertPresentException
from selenium.webdriver.common.alert import Alert

# Path to geckodriver and Firefox
gecko_path = r"C:\Users\abdir\Downloads\geckodriver-v0.35.0-win64\geckodriver.exe"
firefox_binary_path = r"C:\Users\abdir\AppData\Local\Mozilla Firefox\firefox.exe"

# Set Firefox options
options = Options()
options.binary_location = firefox_binary_path

# Set up the Firefox driver
service = Service(executable_path=gecko_path)
driver = webdriver.Firefox(service=service, options=options)

# Test for Applicant

# Step 1: Navigate to the login page with the language set to English
login_url = "http://localhost:5173/login?lng=en"
print("Test 1: Navigate to login page")
try:
    driver.get(login_url)
    assert "login" in driver.current_url, "Test Failed: Login page did not load correctly."
    print("Test Passed: Successfully navigated to login page.")
except Exception as e:
    print(f"Test Failed: Could not navigate to login page. Error: {e}")

# Step 2: Log in as an applicant
username = "ABCDEFG"
password = "Jwn3u2nc"
print("\nTest 2: Logging in as an applicant...")

# Enter username and password
try:
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "username"))).send_keys(username)
    print("Entered username.")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "password"))).send_keys(password)
    print("Entered password.")
    
    login_button = driver.find_element(By.XPATH, "//button[@type='submit']")
    login_button.click()
    print("Clicked login button.")

    # Wait for redirect to applicant dashboard
    WebDriverWait(driver, 10).until(EC.url_contains("/appLogin"))
    assert "/appLogin" in driver.current_url, "Test Failed: Redirect to applicant dashboard failed."
    print("Test Passed: Redirected to applicant dashboard.")
except TimeoutException as e:
    print(f"Test Failed: Timeout while trying to log in. Error: {e}")
except Exception as e:
    print(f"Test Failed: Error during login process. Error: {e}")

# Step 3: Navigate to Make Application page
print("\nTest 3: Navigating to the 'Make Application' page.")
try:
    driver.get("http://localhost:5173/applicationForm")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//h2[contains(text(), 'Apply for a position')]")))
    print("Test Passed: Successfully navigated to 'Make Application' page.")
except TimeoutException as e:
    print(f"Test Failed: Timeout while navigating to the 'Make Application' page. Error: {e}")
except Exception as e:
    print(f"Test Failed: Error while navigating to the 'Make Application' page. Error: {e}")

# Step 4: Select Competencies and enter Experience
print("\nTest 4: Selecting competencies and entering experience.")
try:
    competence_checkboxes = driver.find_elements(By.XPATH, "//input[@type='checkbox']")
    competence_checkboxes[0].click()  # Select first competence
    print("Test Passed: First competence selected.")
    
    # Enter experience for selected competence
    experience_input = driver.find_element(By.XPATH, "//input[@name='experience-1']")
    experience_input.send_keys("2.5")
    print("Test Passed: Entered experience '2.5' for selected competence.")
except Exception as e:
    print(f"Test Failed: Error while selecting competencies or entering experience. Error: {e}")

# Step 5: Add Availability Period
print("\nTest 5: Adding availability period.")
try:
    add_availability_button = driver.find_element(By.XPATH, "//button[contains(text(), '+ Add Availability')]")
    add_availability_button.click()

    # Wait for new date picker to appear
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//input[@class='date-picker']")))
    print("Test Passed: Availability date picker appeared.")

    # Set availability dates (example: from 2025-03-10 to 2025-03-20)
    from_date_picker = driver.find_element(By.XPATH, "//input[@placeholder='Select From Date']")
    to_date_picker = driver.find_element(By.XPATH, "//input[@placeholder='Select To Date']")
    from_date_picker.send_keys("2025-03-10")
    to_date_picker.send_keys("2025-03-20")
    print("Test Passed: Availability dates set from 2025-03-10 to 2025-03-20.")
except TimeoutException as e:
    print(f"Test Failed: Timeout while adding availability period. Error: {e}")
except Exception as e:
    print(f"Test Failed: Error while adding availability period. Error: {e}")

# Step 6: Submit Application
print("\nTest 6: Submitting application...")
try:
    submit_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Hand')]")
    submit_button.click()

    # Wait for the form to be submitted and handle any success message or confirmation
    print("Waiting for alert after submitting the application...")
    WebDriverWait(driver, 20).until(EC.alert_is_present())

    # Switch to the alert
    alert = Alert(driver)
    print(f"Test Passed: Alert displayed with message: {alert.text}")

    # Accept the alert to close it and proceed
    alert.accept()
    print("Test Passed: Alert accepted, application submitted successfully.")
except TimeoutException:
    print("Test Failed: No alert appeared after submitting the application.")
except UnexpectedAlertPresentException as e:
    print(f"Test Failed: Unexpected alert appeared. Error: {e}")
except Exception as e:
    print(f"Test Failed: Error while submitting application. Error: {e}")

# Step 7: Cancel Application
print("\nTest 7: Canceling the application.")
try:
    cancel_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Cancel Application')]")
    cancel_button.click()
    print("Test Passed: Clicked cancel button.")
except Exception as e:
    print(f"Test Failed: Error while canceling application. Error: {e}")

# Step 8: Ensure user is redirected to login page after canceling application
print("\nTest 8: Ensuring user is redirected to login page after canceling application.")
try:
    WebDriverWait(driver, 10).until(EC.url_contains("/appLogin"))
    assert "/appLogin" in driver.current_url, "Test Failed: User not redirected to login page after canceling application."
    print("Test Passed: User redirected to login page after canceling application.")
except TimeoutException as e:
    print(f"Test Failed: Timeout while checking redirect to login page. Error: {e}")
except Exception as e:
    print(f"Test Failed: Error during redirect check. Error: {e}")

# Close the browser
print("\nTest 10: Closing the browser.")
try:
    driver.quit()
    print("Test Passed: Browser closed.")
except Exception as e:
    print(f"Test Failed: Error while closing the browser. Error: {e}")
