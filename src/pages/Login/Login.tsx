import React from "react";
import styles from "./Login.module.css";

const Login = () => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Welcome Back 👋</h2>
        <p className={styles.subtitle}>Login to continue your journey</p>
        <form className={styles.form} onSubmit={handleLogin} autoComplete="off">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={styles.input}
            autoComplete="off"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.input}
            autoComplete="new-password"
            required
          />
          <button type="submit" className={styles.button}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
