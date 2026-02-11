# LOL Match Prediction Analysis (Diamond Tier) 🎮

## 📌 Project Overview
**League of Legends (LoL)** is a fast-paced, competitive MOBA game where early-game advantages often dictate the final outcome. This project analyzes match data from **Diamond Ranked Games (10 minutes in)** to identify which early-game factors most strongly correlate with victory and to build machine learning models that predict match outcomes.

- **Goal**: Identify key winning factors and predict game results based on early-game stats.
- **Data Source**: [Kaggle - League of Legends Diamond Ranked Games (10 min)](https://www.kaggle.com/datasets/bobbyscience/league-of-legends-diamond-ranked-games-10-min)
- **Author**: Yewon Shin
- **Date**: 2026.01

## 🛠 Tech Stack
- **Language**: Python 3.8+
- **Data Processing**: Pandas, NumPy
- **Visualization**: Matplotlib, Seaborn
- **Machine Learning**: Scikit-learn, LightGBM, RandomForest
- **Web Portfolio**: HTML5, CSS3, Chart.js

## 📂 Project Structure
```bash
├── assets/                       # Images and static assets for the portfolio
├── high_diamond_ranked_10min.csv # Dataset (Kaggle)
├── LOL_Match_Prediction_Analysis.ipynb # Main analysis notebook
├── generate_charts_for_pdf.py    # Script to generate static charts for PDF
├── index.html                    # Interactive Web Portfolio
├── print_landscape.html          # Print-optimized Portfolio (Landscape PDF)
├── script.js                     # Chart.js logic for web portfolio
└── style.css                     # Dark-themed styling
```

## 📊 Key Analysis & Findings

### 1. Most Influential Factor: **Gold Difference** 💰
- **Coefficient (Logistic Regression)**: **0.96** (Highest Impact)
- **Insight**: Gold difference is the single strongest predictor of victory. Winning teams inconsistently maintain a positive gold lead, while losing teams fall behind early.
- **Correlation**: Strongly correlated with KDA and Experience Difference.

### 2. Strategic Objectives: **Dragons > Heralds** 🐉
- **Dragon Control**: Securing dragons increases win probability by **~22%**.
- **Rift Herald**: Increases win probability by **~12%**.
- **Conclusion**: Prioritizing Drake stacking in the early game is a more reliable strategy for victory than focusing solely on Rift Herald.

### 3. KDA vs Win Rate ⚔️
- **KDA > 2.5**: Win rate exceeds **65%**.
- **KDA > 4.0**: Win rate jumps to over **80%**.
- **Insight**: Playing safe and maintaining a high KDA (avoiding deaths) is crucial for snow-balling a lead.

## 🤖 Model Performance
We compared three machine learning models to predict match outcomes:

| Model | F1 Score | AUC Score | Note |
|-------|----------|-----------|------|
| **Logistic Regression** | **0.739** | **0.812** | **Best Balance** (Interpretability + Performance) |
| Random Forest (Tuned) | 0.733 | 0.809 | Robust against overfitting |
| LightGBM (Tuned) | 0.736 | 0.811 | Fastest training speed |

**Selected Model**: Logistic Regression (Accuracy ~74%)

## 🚀 How to View the Portfolio

### 1. Interactive Web Version
Open `index.html` in your browser to see the interactive charts and full analysis.
- [Live Demo](https://aimee-shin.github.io/Kaggle---LOL-Match-Prediction/)

### 2. PDF Version (Print Ready)
Open `print_landscape.html` and use the print function (`Cmd + P` / `Ctrl + P`) to save as a landscape PDF.
- **Settings**: Layout: Landscape, Background Graphics: Checked, Margins: None.

## 📝 Usage
To run the analysis yourself:
1. Install dependencies:
   ```bash
   pip install pandas numpy matplotlib seaborn scikit-learn lightgbm
   ```
2. Run the Jupyter Notebook:
   ```bash
   jupyter notebook LOL_Match_Prediction_Analysis.ipynb
   ```

---
*Created by [Yewon Shin](https://github.com/aimee-shin)*
