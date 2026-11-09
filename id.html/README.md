# Professional Digital Identity Configuration (`id.html/`)

Welcome to your centralized Digital Identity management folder.  
The portfolio automatically reads from these configuration files (`links.json` and `profile-card.json`). Any changes you make here are automatically reflected on your live website, digital identity cards, QR code shares, and contact modules without modifying any React code.

---

## 📁 Files in This Directory

- **`links.json`**: Key-value mappings of verified social links, portfolio URL, WhatsApp, and email.
- **`profile-card.json`**: Complete digital identity metadata (Name, Title, Bio, Image paths, Resume paths).
- **`README.md`**: This instruction guide.

---

## 🛠️ How to Add or Update Your Accounts

Open `links.json` in any text editor and fill in your real profile URLs:

### 1. Adding LinkedIn Profile
```json
"linkedin": {
  "username": "shubham-patel-234a61356",
  "url": "https://www.linkedin.com/in/shubham-patel-234a61356"
}
```

### 2. Adding Naukri.com Profile
```json
"naukri": {
  "username": "your-naukri-id",
  "url": "https://www.naukri.com/mnjuser/profile"
}
```

### 3. Adding Freelancer Profile
```json
"freelancer": {
  "username": "your-freelancer-username",
  "url": "https://www.freelancer.com/u/your-username"
}
```

### 4. Adding or Updating GitHub URL
```json
"github": {
  "username": "shubhampatel0487",
  "url": "https://github.com/shubhampatel0487"
}
```

### 5. Updating Email & WhatsApp Direct Chat
```json
"email": "shubhampatel0487@gmail.com",
"whatsapp": "+916307510099",
"whatsapp_url": "https://wa.me/916307510099"
```

---

## ⚠️ Security & Privacy Notice

This directory is designed exclusively for **public professional social identities** and recruiter contact links.  
**DO NOT** store:
- Government identity numbers (Aadhaar, PAN, SSN)
- Bank accounts or UPI PINs
- Passwords, API secret keys, or private tokens

