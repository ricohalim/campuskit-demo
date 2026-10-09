# Deploy CampusKit to GitHub Pages

1. Extract `CampusKit_GitHub_Pages_v6_Flat.zip`.
2. Upload **all files inside the extracted folder** to the root of your repository. This package is flat by design; reports, SQL, and data files are not hidden in subfolders.
3. In the repository, open **Settings → Pages**.
4. Under Build and deployment, select **Deploy from a branch**.
5. Choose branch `main` and folder `/(root)`, then save.
6. Wait for deployment and open the URL shown by GitHub, usually `https://USERNAME.github.io/REPOSITORY/`.

Check that `index.html`, `styles.css`, `app.js`, `analysis.html`, both report `.md` files, all three `.sql` files, `synthetic_checkouts.csv`, and `demo_metrics.json` are visible in the Code tab.

No extra GitHub Actions workflow is required when using the Deploy from a branch setting.
