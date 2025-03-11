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

# Test: Submit valid registration data where user already exists
def test_user_already_exists():
    # Navigate to the registration page
    driver.get("http://localhost:5173/register")

    try:
        # Wait for the page to load
        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
    except TimeoutException:
        assert False, "Page did not load correctly."

    # Locate form elements
    fields = {
        "firstName": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "firstName"))),
        "lastName": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "lastName"))),
        "personNumber": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "personNumber"))),
        "email": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "email"))),
        "userName": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "userName"))),
        "password": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "password"))),
        "submit": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//button[@type='submit']"))),
    }

    # Valid data for registration, assuming user already exists in DB
    valid_data = {
        "firstName": "John",
        "lastName": "Doe",
        "personNumber": "950625-1234",
        "email": "john.doe@example.com",
        "userName": "johndoe123",
        "password": "Password1"
    }

    # Fill out the registration form with valid data
    fields["firstName"].clear()
    fields["firstName"].send_keys(valid_data["firstName"])

    fields["lastName"].clear()
    fields["lastName"].send_keys(valid_data["lastName"])

    fields["personNumber"].clear()
    fields["personNumber"].send_keys(valid_data["personNumber"])

    fields["email"].clear()
    fields["email"].send_keys(valid_data["email"])

    fields["userName"].clear()
    fields["userName"].send_keys(valid_data["userName"])

    fields["password"].clear()
    fields["password"].send_keys(valid_data["password"])

    # Submit the form
    fields["submit"].click()

    # Check for the error message (user already exists)
    try:
        error_message = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "success-message"))
        )
        # Check that the error message contains the correct text for failed registration
        assert "Failed to register" in error_message.text, f"Expected error message, but found: {error_message.text}"
        print("Test Passed: Error message for non existing user was displayed as expected.")
    except TimeoutException:
        assert False, "Test Failed: Error message for non existing user not found."

# Run the test
test_user_already_exists()

# Close the browser
driver.quit()
