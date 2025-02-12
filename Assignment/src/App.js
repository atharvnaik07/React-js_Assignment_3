import React, { useState } from "react";

<h1>Online Form</h1>

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    age: "",
    gender: "",
    terms: false,
    username: "",
    address: "",
    pincode: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) error = "Name is required.";
        else if (value.length < 3 || value.length > 50) error = "Name must be between 3 and 50 characters.";
        break;
      case "email":
        if (!value) error = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format.";
        break;
      case "password":
        if (!value) error = "Password is required.";
        else if (value.length < 6 || !/[!@#$%^&*]/.test(value)) error = "Password must be at least 6 characters and contain a special character.";
        break;
      case "confirmPassword":
        if (value !== formData.password) error = "Passwords do not match.";
        break;
      case "phone":
        if (!/^[0-9]{10}$/.test(value)) error = "Phone number must be 10 digits.";
        break;
      case "age":
        if (!value || isNaN(value) || value < 18 || value > 100) error = "Age must be between 18 and 100.";
        break;
      case "gender":
        if (!value) error = "Gender is required.";
        break;
      case "terms":
        if (!value) error = "You must accept the terms & conditions.";
        break;
      case "username":
        if (!value || /\s/.test(value) || !/^[a-zA-Z0-9]+$/.test(value)) error = "Username must be alphanumeric and contain no spaces.";
        break;
      case "address":
        if (!value || value.length < 5) error = "Address must be at least 5 characters.";
        break;
      case "pincode":
        if (!/^[0-9]{6}$/.test(value)) error = "Pincode must be exactly 6 digits.";
        break;
      case "dob":
        const dobDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        if (!value || isNaN(dobDate) || age < 18) error = "You must be at least 18 years old.";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
    setErrors({ ...errors, [name]: validate(name, newValue) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmittedData(formData);
      setShowPopup(true);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-group">
            <label>{key.replace(/([A-Z])/g, " $1").toUpperCase()}</label>
            {key === "gender" ? (
              <select name={key} value={formData[key]} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : key === "terms" ? (
              <input type="checkbox" name={key} checked={formData[key]} onChange={handleChange} />
            ) : (
              <input
                type={key === "password" || key === "confirmPassword" ? "password" : key === "dob" ? "date" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
              />
            )}
            {errors[key] && <p className="error">{errors[key]}</p>}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Submitted Data</h3>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
