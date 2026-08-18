import React from "react";
import Brand from "../../components/Brand";
import Icon from "../../components/Icon";

export default function AuthScreen({ onLogin }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [notice, setNotice] = React.useState("");

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const role = data.get("role");
    if (rememberMe) {
      localStorage.setItem("agni_remember_email", email);
    }
    event.currentTarget.reset();
    setShowPassword(false);
    onLogin(email, role);
  }

  return (
    <main id="top" className="auth-page">
      <section className="showcase" aria-label="Agni CRM introduction">
        <div className="mesh mesh-one" />
        <div className="mesh mesh-two" />
        <div className="showcase-inner">
          <Brand />
          <div className="showcase-copy">
            <p className="eyebrow">
              <span /> THE RELATIONSHIP OS
            </p>
            <h1>
              Make every customer
              <br />
              interaction <em>count.</em>
            </h1>
            <p className="lede">
              One focused workspace for your team to turn conversations into
              lasting customer relationships.
            </p>
          </div>
          <div className="activity-card">
            <div className="activity-top">
              <span className="pulse" /> Live activity {" "}
              <span className="activity-more">•••</span>
            </div>
            <div className="activity-row">
              <div className="avatar avatar-purple">A</div>
              <div>
                <strong>Acme Inc.</strong>
                <small>
                  Deal moved to <b>Proposal</b>
                </small>
              </div>
              <time>Now</time>
            </div>
            <div className="activity-row">
              <div className="avatar avatar-coral">M</div>
              <div>
                <strong>Maria Santos</strong>
                <small>New lead assigned to you</small>
              </div>
              <time>2m</time>
            </div>
            <div className="activity-row">
              <div className="avatar avatar-blue">S</div>
              <div>
                <strong>Summit Co.</strong>
                <small>Meeting confirmed for today</small>
              </div>
              <time>18m</time>
            </div>
          </div>
          <div className="trusted">
            <div className="trusted-avatars">
              <span>J</span>
              <span>K</span>
              <span>R</span>
              <span>+</span>
            </div>
            <p>
              Trusted by growing teams
              <br />
              <b>around the world</b>
            </p>
          </div>
        </div>
        <p className="copyright">© 2026 Agni CRM. Built for momentum.</p>
      </section>

      <section className="auth-area" aria-labelledby="form-title">
        <div className="mobile-brand">
          <Brand />
        </div>
        <div className="auth-panel">
          <div className="form-intro">
            <p className="eyebrow">WELCOME BACK</p>
            <h2 id="form-title">Sign in to your account</h2>
            <p>Access your CRM workspace with your email, role, and secure password.</p>
          </div>

          <form onSubmit={submit} autoComplete="off">
            <label className="field-label">
              Work email
              <input
                name="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
            </label>
            <label className="field-label">
              Select role
              <select name="role" required>
                <option value="">Choose role</option>
                <option value="Admin">Admin</option>
                <option value="Owner">Owner</option>
                <option value="Client">Client</option>
                <option value="Manager">Manager</option>
                <option value="Sales Person">Sales Person</option>
                <option value="Branch Manager">Branch Manager</option>
                <option value="Marketing">Marketing</option>
                <option value="IT">IT</option>
              </select>
            </label>
            <label className="field-label">
              Password
              <span className="password-wrap">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  minLength="8"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Icon name={showPassword ? "eyeOff" : "eye"} size={18} />
                </button>
              </span>
            </label>
            <div className="form-options">
              <label className="check-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span />
                Remember me
              </label>
              <a href="#forgot">Forgot password?</a>
            </div>
            <button className="primary-button" type="submit">
              Sign in to Agni
              <Icon name="arrow" size={18} />
            </button>
          </form>
          {notice && (
            <p className="notice" role="status">
              <Icon name="check" size={17} />
              {notice}
            </p>
          )}
          <div className="divider">
            <span>or continue with</span>
          </div>
          <button className="google-button" type="button">
            <Icon name="google" size={19} />
            Google
          </button>
        </div>
        <p className="secure">
          <span>
            <Icon name="check" size={14} />
          </span>
          Your data is encrypted and secure
        </p>
      </section>
    </main>
  );
}
