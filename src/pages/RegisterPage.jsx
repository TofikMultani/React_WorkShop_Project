import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { rules, useFormValidation } from "../validation/formValidation";

function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [profilePreview, setProfilePreview] = useState("");

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    getInputClass,
  } = useFormValidation({
    initialValues: {
      fullName: "",
      mobile: "",
      gender: "",
      address: "",
      profilePicture: null,
      registerEmail: "",
      registerPassword: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validationRules: {
      fullName: [
        rules.required("Full name is required"),
        rules.alphabetic(),
        rules.minLength(3),
      ],
      mobile: [
        rules.required("Mobile number is required"),
        rules.numeric(),
        rules.minLength(10),
        rules.maxLength(15),
      ],
      gender: [rules.required("Please select a gender")],
      address: [
        rules.required("Address is required"),
        rules.minLength(10),
        rules.maxLength(250),
      ],
      profilePicture: [
        rules.required("Profile picture is required"),
        rules.fileTypes(["image/jpeg", "image/png", "image/webp"]),
        rules.fileSize(3),
      ],
      registerEmail: [rules.required("Email is required"), rules.email()],
      registerPassword: [
        rules.required("Password is required"),
        rules.strongPassword(),
      ],
      confirmPassword: [
        rules.required("Please confirm password"),
        rules.matchField("registerPassword", "Passwords do not match"),
      ],
      acceptTerms: [rules.required("You must accept terms to continue")],
    },
    onSubmit: async (formValues, resetForm) => {
      setIsSubmitting(true);
      setSubmitMessage("");
      setSubmitError("");

      try {
        const payload = new FormData();
        payload.append("fullname", formValues.fullName);
        payload.append("email", formValues.registerEmail);
        payload.append("mobile", formValues.mobile);
        payload.append("gender", formValues.gender);
        payload.append("address", formValues.address);
        payload.append("password", formValues.registerPassword);
        payload.append("confirmPassword", formValues.confirmPassword);
        payload.append("terms", String(formValues.acceptTerms));

        if (formValues.profilePicture) {
          payload.append("profile_picture", formValues.profilePicture);
        }

        const apiBaseUrl = "http://localhost:5000";
        const response = await fetch(`${apiBaseUrl}/api/register`, {
          method: "POST",
          body: payload,
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            result.message || result.msg || "Registration failed",
          );
        }

        setSubmitMessage(result.message || "User registered successfully");
        resetForm();
      } catch (error) {
        setSubmitError(error.message || "Unable to register user");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (!values.profilePicture) {
      setProfilePreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(values.profilePicture);
    setProfilePreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [values.profilePicture]);

  return (
    <section className="page-shell">
      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h2 className="mb-2">Register</h2>
            <p className="page-intro mb-0">
              Create your customer account to unlock loyalty rewards, exclusive
              promotions, and smoother checkout for every purchase.
            </p>
            {submitMessage && (
              <div className="col-12">
                <div className="alert alert-success mb-0">{submitMessage}</div>
              </div>
            )}
            {submitError && (
              <div className="col-12">
                <div className="alert alert-danger mb-0">{submitError}</div>
              </div>
            )}
            <form className="row g-3 mt-1" onSubmit={handleSubmit} noValidate>
              <div className="col-12">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className={getInputClass("fullName")}
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.fullName && (
                  <div className="invalid-feedback d-block">
                    {errors.fullName}
                  </div>
                )}
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="mobile" className="form-label">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="text"
                  className={getInputClass("mobile")}
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.mobile && (
                  <div className="invalid-feedback d-block">
                    {errors.mobile}
                  </div>
                )}
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className={getInputClass("gender", "form-select")}
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <div className="invalid-feedback d-block">
                    {errors.gender}
                  </div>
                )}
              </div>

              <div className="col-12">
                <label htmlFor="profilePicture" className="form-label">
                  Profile Picture
                </label>
                <input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className={getInputClass("profilePicture")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.profilePicture && (
                  <div className="invalid-feedback d-block">
                    {errors.profilePicture}
                  </div>
                )}
                {profilePreview && (
                  <img
                    src={profilePreview}
                    alt="Selected profile preview"
                    className="img-thumbnail mt-2"
                    style={{
                      maxWidth: "160px",
                      maxHeight: "160px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>

              <div className="col-12">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  className={getInputClass("address")}
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && (
                  <div className="invalid-feedback d-block">
                    {errors.address}
                  </div>
                )}
              </div>

              <div className="col-12">
                <label htmlFor="registerEmail" className="form-label">
                  Email Address
                </label>
                <input
                  id="registerEmail"
                  name="registerEmail"
                  type="email"
                  className={getInputClass("registerEmail")}
                  value={values.registerEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.registerEmail && (
                  <div className="invalid-feedback d-block">
                    {errors.registerEmail}
                  </div>
                )}
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="registerPassword" className="form-label">
                  Password
                </label>
                <input
                  id="registerPassword"
                  name="registerPassword"
                  type="password"
                  className={getInputClass("registerPassword")}
                  value={values.registerPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.registerPassword && (
                  <div className="invalid-feedback d-block">
                    {errors.registerPassword}
                  </div>
                )}
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className={getInputClass("confirmPassword")}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback d-block">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    className={`form-check-input${errors.acceptTerms ? " is-invalid" : ""}`}
                    checked={values.acceptTerms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="acceptTerms" className="form-check-label">
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                  {errors.acceptTerms && (
                    <div className="invalid-feedback d-block">
                      {errors.acceptTerms}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-dark w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </button>
              </div>

              <div className="col-12 text-center">
                <span className="text-muted">Already have an account? </span>
                <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-5 g-4">
          <article className="card shadow-sm">
            <div className="card-body">
              <h3 className="h5">Rewards Program</h3>
              <p className="mb-0">
                Earn points on every order and redeem them for discounts.
              </p>
            </div>
          </article>
          <br />
          <article className="card shadow-sm">
            <div className="card-body">
              <h3 className="h5">Saved Preferences</h3>
              <p className="mb-0">
                Store your size, address, and payment choices for quick
                shopping.
              </p>
            </div>
          </article>
          <br />
          <article className="card shadow-sm ">
            <div className="card-body">
              <h3 className="h5">Exclusive Drops</h3>
              <p className="mb-0">
                Get early alerts for new arrivals and members-only offers.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
