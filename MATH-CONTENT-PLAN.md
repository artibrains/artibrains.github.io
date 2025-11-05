# Math Content Roadmap

## Objectives
- Publish a set of independent companion posts that expand the mathematical depth of the printed book (PDF) without altering existing web chapters.
- Maintain bilingual parity: each companion post should have standalone `*.en.md` and `*.es.md` versions.
- Reuse the Goldmark math passthrough and shortcodes already in place (e.g., `{{< math >}}`) for consistent rendering.

## Existing Assets
- `content/Chapter 6/xor-proof/xor-proof.en|es.md` — completed example of a stand-alone mathematical proof page. Use this as the structural template for future entries.

## Companion Post Backlog (New Content Only)

Each entry below should live under a new folder tree, for example `content/companion/chapter-2/gradient-descent-note.en.md` and the matching `.es.md`. Do **not** reuse existing chapter directories.

### Chapter 1 — Foundations
- **1.5 Mathematical Note: Normal Equation for Linear Regression** (`content/companion/chapter-1/normal-equation.*`). Derive the closed-form solution, geometric interpretation, and conditioning discussion.
- **1.6 Mathematical Sidebar: Symbolic vs. Statistical AI** (`content/companion/chapter-1/symbolic-vs-statistical.*`). Provide probability toy example illustrating the paradigm shift described in the PDF.

### Chapter 2 — Gradient Methods
- **2.2 Mathematical Note: Gradient Descent Mechanics** (`content/companion/chapter-2/gradient-descent.*`). Cover update rule derivations, convergence criteria, and step-size heuristics.
- **2.3 Mathematical Note: Bias–Variance Analysis** (`content/companion/chapter-2/bias-variance.*`). Include Taylor expansion outline and error decomposition.
- **2.6 Programmer’s Appendix: Matrix Form of SGD** (`content/companion/chapter-2/matrix-sgd.*`). Translate narrative code insights into vector calculus notation.

### Chapter 3 — Binary Classification
- **3.1 Mathematical Note: Logistic Regression Likelihood** (`content/companion/chapter-3/logistic-likelihood.*`). Derive log-likelihood, gradients, and convexity proof sketch.
- **3.3 Mathematical Note: Regularisation Geometry** (`content/companion/chapter-3/regularisation.*`). Compare $L_1$ and $L_2$ constraints with geometric diagrams and Karush–Kuhn–Tucker conditions overview.
- **3.5 Mathematical Note: Cross-Validation Estimates** (`content/companion/chapter-3/cross-validation.*`). Analyze expectation, variance, and practical fold selection guidance.

### Chapter 4 — Multiclass Systems
- **4.1 Mathematical Note: Entropy and Information Gain** (`content/companion/chapter-4/decision-tree-impurity.*`). Derive entropy, Gini, and mutual information with worked tables.
- **4.3 Mathematical Note: Evaluation Metrics Algebra** (`content/companion/chapter-4/metrics.*`). Formalize precision/recall/F1 (macro vs. micro) and ROC/AUC computations.
- **4.5 Mathematical Note: Naive Bayes Foundations** (`content/companion/chapter-4/naive-bayes.*`). Provide derivation with Laplace smoothing and independence assumptions.

### Chapter 5 — Unsupervised Learning
- **5.2 Mathematical Note: K-Means Objective** (`content/companion/chapter-5/kmeans-objective.*`). Prove monotonic decrease of Lloyd’s algorithm and discuss initialization strategies.
- **5.3 Mathematical Note: Elbow Method Justification** (`content/companion/chapter-5/elbow-method.*`). Connect within-cluster sum of squares to variance decomposition.
- **5.4 Mathematical Note: Clustering Metrics & PCA Primer** (`content/companion/chapter-5/clustering-metrics.*`). Cover Silhouette, Davies–Bouldin, and optional PCA derivation.

### Chapter 6 — Neural Networks
- **6.1 Mathematical Note: Perceptron Convergence** (`content/companion/chapter-6/perceptron-convergence.*`). Provide theorem statement and proof sketch complementing the PDF narrative.
- **6.2 Mathematical Note: Backpropagation via Chain Rule** (`content/companion/chapter-6/backpropagation-math.*`). Step-by-step derivation with Jacobian notation.
- **6.3 Mathematical Note: Training Stability** (`content/companion/chapter-6/training-stability.*`). Discuss weight initialisation, vanishing gradients, and variance analysis.
- **6.7 Mathematical Note: Higher-Order Insights** (`content/companion/chapter-6/hessian-analysis.*`). Introduce matrix calculus notation and second-order methods context.

### Chapter 7 — Language Models
- **7.1 Mathematical Note: Tokenisation & Embeddings** (`content/companion/chapter-7/tokenisation-embeddings.*`). Explain BPE merge math and embedding space geometry.
- **7.3 Mathematical Note: Attention Mechanisms** (`content/companion/chapter-7/attention.*`). Derive scaled dot-product attention, softmax stability, and complexity.
- **7.6 Mathematical Note: REINFORCE & RLHF** (`content/companion/chapter-7/reinforce.*`). Present policy-gradient derivations and reward baselines.
- **7.11 Mathematical Note: Positional Encoding Geometry** (`content/companion/chapter-7/positional-encoding.*`). Prove sinusoidal properties and cosine similarity bounds.

### Chapter 8 — Applied AI Reflections
- **8.2 Mathematical Note: Decision Theory for Diagnostics** (`content/companion/chapter-8/decision-theory.*`). Cover ROC curves, calibration, and cost-sensitive risk.
- **8.3 Mathematical Appendix: Generalisation Bounds** (`content/companion/chapter-8/generalisation-bounds.*`). Summarise VC dimension insights linked to the Minermont story arc.

## Implementation Guidelines
- Create a dedicated companion root such as `content/companion/` with subfolders per chapter (e.g., `chapter-3/`).
- Use filenames `topic.en.md` / `topic.es.md`; set `draft: true`, `math: true`, and `series: "book-companion"` (new taxonomy) for easy listing.
- Add front matter linking back to the PDF section via a `pdf_section` field (e.g., `"3.3 La regularización"`) to help readers map content.
- Include bilingual KaTeX blocks and ensure terminology remains consistent with `i18n/*.toml` entries.
- Surface companion posts via a new Hugo list page (e.g., `/companion/`) instead of injecting notices into existing chapters.
- Validate every page with `hugo serve` and confirm math rendering and taxonomy navigation.

## Suggested Sequencing
1. Build Chapter 2–3 companion notes (core math underpinning early chapters).
2. Publish Chapter 4 impurity metrics and Naive Bayes derivations.
3. Release Chapter 5 clustering theory and metrics.
4. Add Chapter 6 neural network deep dives (reference existing XOR proof post for structure).
5. Expand Chapter 7 attention, embeddings, and RLHF materials.
6. Close with Chapter 8 evaluation and generalisation appendices.

## Dependencies & Resources
- Ensure `assets/` includes any supplemental diagrams (vector spaces, confusion matrix) exported as SVG.
- Reuse existing shortcode components (`notice`, `math`, `demo-wrapper`).
- For bilingual parity, draft English first, then translate to Spanish ensuring math notation remains identical.

## Review Checklist
- [ ] Front matter includes `pdf_section` and `series` metadata for all companion posts.
- [ ] Mathematical statements validated by a second reviewer.
- [ ] Companion index page lists new posts correctly in both languages.
- [ ] Bibliography updated where new references are cited.
