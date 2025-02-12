**Create a ReactJS Form with Validations
Requirements:**
Your form should include the following fields with their respective validations:
1. Name – Required, minimum and maximum length validation.
2. Email – Required, must follow a valid email format using regex.
3. Password – Required, must have a minimum length and contain at least one special
character.
4. Confirm Password – Must match the Password field.
5. Phone Number – Required, must contain only numbers, exactly 10 digits.
6. Age – Required, must be a number within the specified min and max range.
7. Gender – Required (should be a dropdown or radio button selection).
8. Checkbox (Terms & Conditions) – Required (must be checked).
9. Username – Required, should not contain spaces, only alphanumeric characters.
10. Address – Required, with a minimum length check.
11. Pincode – Required, must be exactly 6 digits and contain only numbers.
12. Date of Birth – Required, must be a valid date, and the user should be at least 18
years old.
Implementation Guidelines:
• Use useState for handling input values.
• Implement validation inside the onChange function.
• Display error messages for invalid inputs.
• Ensure that the form submits only when all validations are passed
