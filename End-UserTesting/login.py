from selenium import webdriver 
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

gecko_path = r"C:\Users\abdir\Downloads\geckodriver-v0.35.0-win64\geckodriver.exe"
firefox_binary_path = r"C:\Users\abdir\AppData\Local\Mozilla Firefox\firefox.exe"

options = Options()
options.binary_location = firefox_binary_path

service = Service(executable_path=gecko_path)
driver = webdriver.Firefox(service=service, options=options)

def test_user_already_exists():
    print("Test 1: Existing user error")
    driver.get("http://localhost:5173/register")
    try:
        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
    except TimeoutException:
        assert False, "Page did not load correctly."

    fields = {
        "firstName": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "firstName"))),
        "lastName": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "lastName"))),
        "personNumber": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "personNumber"))),
        "email": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "email"))),
        "userName": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "userName"))),
        "password": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "password"))),
        "submit": WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//button[@type='submit']"))),
    }

    valid_data = {
        "firstName": "John",
        "lastName": "Doe",
        "personNumber": "950625-1234",
        "email": "john.doe@example.com",
        "userName": "johndoe123",
        "password": "Password1"
    }

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

    fields["submit"].click()

    try:
        error_message = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "success-message"))
        )
        assert "Failed to register" in error_message.text, f"Expected error message, but found: {error_message.text}"
        print("Test Passed: Error message for existing user was displayed as expected.")
    except TimeoutException:
        assert False, "Test Failed: Error message for  existing user not found."

def test_invalid_username():
    
    driver.get("http://localhost:5173/login?lng=en")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "h2")))
    
    print("Test 2: Test invalid username (less than 4 characters)")
    username_field = driver.find_element(By.NAME, "username")
    password_field = driver.find_element(By.NAME, "password")
    login_button = driver.find_element(By.XPATH, "//button[@type='submit']")
    
    username_field.clear()
    username_field.send_keys("abc")
    password_field.clear()
    password_field.send_keys("Valid1password")
    login_button.click()
    
    try:
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "error-message")))
        error_message = driver.find_element(By.CLASS_NAME, "error-message").text
        assert "Username must be at least 4 characters" in error_message, "Test Failed: Username validation failed."
        print("Test Passed: Invalid username validation message displayed.")
    except TimeoutException:
        print("Test Failed: Error message for invalid username did not appear.")

test_user_already_exists()
test_invalid_username()

driver.quit()
