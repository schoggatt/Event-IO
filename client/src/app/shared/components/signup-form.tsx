import React, { useState } from "react";
import UserService from "../services/auth/user.service";

export default function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const userService: UserService = new UserService();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    const validationErrors: string[] = [];
    if (firstName.trim() === "") {
      validationErrors.push("First name is required");
    }
    if (lastName.trim() === "") {
      validationErrors.push("Last name is required");
    }
    if (email.trim() === "") {
      validationErrors.push("Email is required");
    }
    if (password.trim() === "") {
      validationErrors.push("Password is required");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      const newUser = {
        id: null,
        email: email,
        firstName: firstName,
        lastName: lastName,
      };
      userService.createUser(newUser).then((user) => {
        console.log(user);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          className="text-black"
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          className="text-black"
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          className="text-black"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* <div>
        <label htmlFor="password">Password:</label>
        <input
          className="text-black"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div> */}
      {errors.length > 0 && (
        <div>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        className="bg-transparent hover:bg-white-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-white-500 hover:border-transparent rounded"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
}
