# Deploying Your Portfolio to GitHub Pages

Follow this guide to host your portfolio for free on GitHub. Any time you push changes, your live site will update automatically.

## Step 1: Install Git
Since `git` isn't currently recognized on your computer, you need to install it:
1.  Download Git from [git-scm.com](https://git-scm.com/download/win).
2.  Run the installer (you can just click "Next" through the options).
3.  **Restart your computer** (or restart VS Code) after installing.

## Step 2: Create a Repository on GitHub
1.  Log in to [GitHub.com](https://github.com).
2.  Click the **+** icon in the top-right and select **New repository**.
3.  Name it something like `my-portfolio` or `shaqib-portfolio`.
4.  Make sure it is **Public**.
5.  Click **Create repository**.
6.  Copy the URL of your new repository (e.g., `https://github.com/your-username/my-portfolio.git`).

## Step 3: Connect and Push Your Code
Once Git is installed, open the terminal in this folder (`f:\Portfolio\shaqib-portfolio`) and run these commands one by one:

```bash
# Initialize a new git repo
git init

# Add all your files
git add .

# Save the changes
git commit -m "Initial portfolio setup"

# Rename the branch to main
git branch -M main

# Link to your GitHub repo
git remote add origin https://github.com/smshaqib/Portfolio.git

# Push the files to GitHub
git push -u origin main
```

> **Note:** If `git push` gives an error, use `git push -f origin main` to force it.

## Step 4: Turn on GitHub Pages (The Live Link)
1.  Go to your repository: [https://github.com/smshaqib/Portfolio](https://github.com/smshaqib/Portfolio)
2.  Click **Settings** (top tab).
3.  On the left sidebar, click **Pages**.
4.  Under **Build and deployment** > **Branch**, select **main** and click **Save**.
5.  Wait about 1-2 minutes. Refresh the page, and you will see your live link at the top (likely `https://smshaqib.github.io/Portfolio/`).

## How to Update in the Future
Whenever you make changes to your code:

1.  Open the terminal.
2.  Run these three commands:
    ```bash
    git add .
    git commit -m "Updated portfolio content"
    git push
    ```
3.  Your live site will automatically update in a few minutes!
