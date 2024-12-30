import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

function ChatInterface() {
  const [jobDetails, setJobDetails] = useState({
    post: "",
    vacancies: "",
    skills: "",
    degree: "",
    cgpa: "",
    alumni_name: "",
    company_name: "",
    contact_number: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getToken } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict negative values for numeric inputs
    if ((name === "vacancies" || name === "cgpa" || name === "contact_number") && value < 0) {
      alert("Negative values are not allowed.");
      return;
    }

    setJobDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleJobPost = async () => {
    const requiredFields = ["post", "vacancies", "contact_number"];
    for (let field of requiredFields) {
      if (!jobDetails[field]) {
        alert(`Please fill out the ${field.replace("_", " ").toUpperCase()} field.`);
        return;
      }
    }

    try {
      setIsSubmitting(true);
      const token = await getToken();
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobDetails),
      });

      if (response.ok) {
        alert("Job posted successfully!");
        setJobDetails({
          post: "",
          vacancies: "",
          skills: "",
          degree: "",
          cgpa: "",
          alumni_name: "",
          company_name: "",
          contact_number: "",
        });
      } else {
        let errorMsg = "Failed to post job";
        try {
          const error = await response.json();
          errorMsg += `: ${error.message}`;
        } catch (e) {
          console.error("Error parsing response:", e);
        }
        alert(errorMsg);
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("An error occurred while posting the job.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    formGroup: { marginBottom: "15px" },
    inputField: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ddd",
      width: "100%",
      marginBottom: "10px",
    },
    submitButton: {
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "15px" }}>Post a Job</h3>
      {Object.keys(jobDetails).map((key) => (
        <div key={key} style={styles.formGroup}>
          <input
            type={["vacancies", "cgpa", "contact_number"].includes(key) ? "number" : "text"}
            name={key}
            value={jobDetails[key]}
            onChange={handleChange}
            placeholder={key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            style={styles.inputField}
          />
        </div>
      ))}
      <button style={styles.submitButton} onClick={handleJobPost} disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post Job"}
      </button>
    </div>
  );
}

export default ChatInterface;
