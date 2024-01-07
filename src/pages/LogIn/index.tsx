import Form from "@/components/Form/Form";
import React, { useState } from 'react';
import styles from '@/styles/LogIn.module.scss'
import Button from "@/components/Button/Button";

const LogIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  return (
        <Form onSubmit={handleLogin}>
          <div className={styles.tittle}>Sign In</div>
          <div className={styles.inputGroup}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputField}
                required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
                required
            />
               {/*TODO: make "input" be an single component*/}
          </div>
          <div>
            Forgot Password
          </div>
          <Button type="submit">Sign in</Button>
            <div> Don't have an account?</div>
          <Button outline>Sign up</Button>
        </Form>
  );
};

export default LogIn;
