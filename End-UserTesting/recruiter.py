import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from selenium.common.exceptions import TimeoutException

gecko_path = r"C:\Users\abdir\Downloads\geckodriver-v0.35.0-win64\geckodriver.exe"
firefox_binary_path = r"C:\Users\abdir\AppData\Local\Mozilla Firefox\firefox.exe"

options = Options()
options.binary_location = firefox_binary_path

service = Service(executable_path=gecko_path)
driver = webdriver.Firefox(service=service, options=options)

username = "DanteMason"
password = "EyD84euX5Nj"

login_url = "http://localhost:5173/login?lng=en"
print("Test 1: Navigating to the login page with URL:", login_url)
try:
    driver.get(login_url)
    assert "login" in driver.current_url, f"Failed: URL does not contain 'login'. Current URL: {driver.current_url}"
    print("Test Passed: Successfully navigated to the login page.")
except Exception as e:
    print(f"Test Failed: Could not navigate to the login page. Error: {e}")

print("\nTest 2: Entering credentials and attempting to login.")
try:
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "username"))).send_keys(username)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "password"))).send_keys(password)
    login_button = driver.find_element(By.XPATH, "//button[@type='submit']")
    login_button.click()
    WebDriverWait(driver, 10).until(EC.url_contains("/recLogin"))
    print("Test Passed: Successfully logged in and redirected to '/recLogin'.")
except TimeoutException:
    print("Test Failed: Timeout while waiting for login redirection.")
except Exception as e:
    print(f"Test Failed: Error during login process. Error: {e}")

print("\nTest 3: Verifying current page after login.")
try:
    current_url = driver.current_url
    page_title = driver.title
    print(f"Test Verification: Current URL is: {current_url}")
    print(f"Test Verification: Page title is: {page_title}")
    assert "/recLogin" in current_url, f"Test Failed: Current URL {current_url} is not as expected."
    print("Test Passed: Login page verification successful.")
except Exception as e:
    print(f"Test Failed: Error verifying the login page. Error: {e}")

print("\nTest 4: Navigating to the application list page.")
try:
    driver.get("http://localhost:5173/applicationList")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Fetch Applications')]")))
    print("Test Passed: Successfully navigated to the application list page.")
except TimeoutException:
    print("Test Failed: Timeout while waiting for the application list page.")
except Exception as e:
    print(f"Test Failed: Error while navigating to the application list page. Error: {e}")

print("\nTest 5: Waiting for the 'Fetch Applications' button.")
try:
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Fetch Applications')]")))
    print("Test Passed: 'Fetch Applications' button found.")
except TimeoutException:
    print("Test Failed: Timeout while waiting for the 'Fetch Applications' button.")
except Exception as e:
    print(f"Test Failed: Error while waiting for the 'Fetch Applications' button. Error: {e}")

print("\nTest 6: Clicking on the 'Fetch Applications' button.")
try:
    fetch_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Fetch Applications')]")
    fetch_button.click()
    print("Test Passed: 'Fetch Applications' button clicked.")
except Exception as e:
    print(f"Test Failed: Error while clicking the 'Fetch Applications' button. Error: {e}")

print("\nTest 7: Waiting for the application list to be fetched.")
try:
    WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.XPATH, "//div[@class='table-row']")))
    applications_rows = driver.find_elements(By.XPATH, "//div[@class='table-row']")
    if applications_rows:
        print(f"Test Passed: Applications fetched successfully. Number of applications: {len(applications_rows)}")
    else:
        print("Test Passed: No applications available, as expected.")
except TimeoutException:
    print("Test Failed: Timeout while waiting for application rows to load.")
except Exception as e:
    print(f"Test Failed: Error while fetching application list. Error: {e}")

print("\nTest 8: Initiating logout process.")
try:
    logout_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Logout')]")))
    logout_button.click()
    print("Test Passed: Logout button clicked.")
except Exception as e:
    print(f"Test Failed: Error while clicking logout button. Error: {e}")

print("\nTest 9: Verifying redirection to the login page after logout.")
try:
    WebDriverWait(driver, 10).until(EC.url_to_be("http://localhost:5173/home"))
    print("Test Passed: Logout successful, redirected to the login page.")
except TimeoutException:
    print("Test Failed: Timeout waiting for logout redirection. Current URL:", driver.current_url)

print("\nTest 10: Closing the browser.")
try:
    driver.quit()
    print("Test Passed: Browser closed.")
except Exception as e:
    print(f"Test Failed: Error while closing the browser. Error: {e}")
