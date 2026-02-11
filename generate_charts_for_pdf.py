import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
import lightgbm as lgb
import os

# Set style to match the dark theme of the portfolio
plt.style.use('dark_background')
sns.set_style("darkgrid", {"axes.facecolor": "#1e282d", "grid.color": "#463714"})

# Colors from style.css
colors = {
    'bg': '#010a13',
    'card_bg': '#1e282d',
    'text': '#f0e6d2',
    'gold': '#c8aa6e',
    'accent': '#0ac8b9',
    'loss': '#ff4e50',
    'blue': '#0ac8b9', # representing blue team win
    'red': '#ff4e50'   # representing red team win
}

def save_plot(filename):
    if not os.path.exists('assets'):
        os.makedirs('assets')
    plt.tight_layout()
    plt.savefig(f'assets/{filename}', dpi=300, bbox_inches='tight', facecolor=colors['card_bg'])
    plt.close()

def main():
    print("Loading data...")
    df = pd.read_csv('high_diamond_ranked_10min.csv')
    
    # Preprocessing
    df.drop('gameId', axis=1, inplace=True)
    df['blueKDA'] = (df['blueKills'] + df['blueAssists']) / df['blueDeaths'].replace(0, 1)
    df['blueKillDiff'] = df['blueKills'] - df['redKills']
    
    # 1. First Blood Chart
    print("Generating First Blood Chart...")
    plt.figure(figsize=(6, 4))
    fb_win_rate = df.groupby('blueFirstBlood')['blueWins'].mean() * 100
    bars = plt.bar(['No First Blood', 'First Blood'], fb_win_rate, color=[colors['red'], colors['blue']])
    plt.title('Win Rate by First Blood', color=colors['gold'], fontsize=14)
    plt.ylabel('Win Rate (%)', color=colors['text'])
    plt.ylim(0, 100)
    plt.xticks(color=colors['text'])
    plt.yticks(color=colors['text'])
    
    # Add percentages on bars
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2., height,
                f'{height:.1f}%',
                ha='center', va='bottom', color=colors['text'])
    save_plot('fbChart_static.png')

    # 2. Elite Monsters Chart
    print("Generating Elite Monsters Chart...")
    plt.figure(figsize=(6, 4))
    elite_win_rate = df.groupby('blueEliteMonsters')['blueWins'].mean() * 100
    sns.lineplot(x=elite_win_rate.index, y=elite_win_rate.values, marker='o', color=colors['gold'], linewidth=3)
    plt.title('Win Rate vs Elite Monsters Killed', color=colors['gold'], fontsize=14)
    plt.xlabel('Number of Elite Monsters', color=colors['text'])
    plt.ylabel('Win Rate (%)', color=colors['text'])
    plt.ylim(0, 100)
    plt.xticks(range(3), color=colors['text'])
    plt.yticks(color=colors['text'])
    save_plot('eliteMonstersChart_static.png')

    # 3. Dragon Control
    print("Generating Dragon Chart...")
    plt.figure(figsize=(6, 4))
    dragon_counts = df['blueDragons'].value_counts()
    plt.pie(dragon_counts, labels=['0 Dragons', '1 Dragon'], autopct='%1.1f%%', 
            colors=[colors['loss'], colors['accent']], textprops={'color': colors['text']})
    plt.title('Dragon Control Distribution', color=colors['gold'])
    save_plot('dragonChart_static.png')

    # 4. Herald Control
    print("Generating Herald Chart...")
    plt.figure(figsize=(6, 4))
    herald_counts = df['blueHeralds'].value_counts()
    plt.pie(herald_counts, labels=['0 Heralds', '1 Herald'], autopct='%1.1f%%', 
            colors=[colors['loss'], colors['accent']], textprops={'color': colors['text']})
    plt.title('Herald Control Distribution', color=colors['gold'])
    save_plot('heraldChart_static.png')

    # 5. KDA Chart
    print("Generating KDA Chart...")
    plt.figure(figsize=(8, 5))
    df['kda_bins'] = pd.cut(df['blueKDA'], bins=[0, 1, 2, 3, 4, 100], labels=['0-1', '1-2', '2-3', '3-4', '4+'])
    kda_win_rate = df.groupby('kda_bins', observed=True)['blueWins'].mean() * 100
    sns.barplot(x=kda_win_rate.index, y=kda_win_rate.values, palette=[colors['loss']]*2 + [colors['accent']]*3)
    plt.title('Win Rate by KDA Range', color=colors['gold'], fontsize=14)
    plt.xlabel('KDA Range', color=colors['text'])
    plt.ylabel('Win Rate (%)', color=colors['text'])
    plt.ylim(0, 100)
    plt.xticks(color=colors['text'])
    plt.yticks(color=colors['text'])
    save_plot('kdaChart_static.png')

    # Prepare Data for Models
    X = df.drop(['blueWins', 'kda_bins'], axis=1)
    Y = df['blueWins']
    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.3, random_state=1234)

    # 6. Logistic Regression Feature Importance
    print("Training Logistic Regression...")
    lr = LogisticRegression(max_iter=1000)
    lr.fit(X_train, y_train)
    
    coef_df = pd.DataFrame({'feature': X.columns, 'coef': lr.coef_[0]})
    coef_df['abs_coef'] = coef_df['coef'].abs()
    coef_df = coef_df.sort_values('abs_coef', ascending=False).head(10)
    
    plt.figure(figsize=(10, 6))
    sns.barplot(x='coef', y='feature', data=coef_df, palette='viridis')
    plt.title('Top 10 Feature Importance (Logistic Regression)', color=colors['gold'])
    plt.xlabel('Coefficient Value', color=colors['text'])
    plt.ylabel('Feature', color=colors['text'])
    plt.xticks(color=colors['text'])
    plt.yticks(color=colors['text'])
    save_plot('featLRChart_static.png')
    
    # Save the same chart for the Comparison section (or similar)
    save_plot('featLRCompChart_static.png')

    # 7. Random Forest Feature Importance
    print("Training Random Forest...")
    rf = RandomForestClassifier(n_estimators=100, random_state=1234)
    rf.fit(X_train, y_train)
    
    importances = pd.DataFrame({'feature': X.columns, 'importance': rf.feature_importances_})
    importances = importances.sort_values('importance', ascending=False).head(10)
    
    plt.figure(figsize=(10, 6))
    sns.barplot(x='importance', y='feature', data=importances, palette='viridis')
    plt.title('Top 10 Feature Importance (Random Forest)', color=colors['gold'])
    plt.xlabel('Importance', color=colors['text'])
    plt.ylabel('Feature', color=colors['text'])
    plt.xticks(color=colors['text'])
    plt.yticks(color=colors['text'])
    save_plot('featRFChart_static.png')

    # 8. LightGBM Feature Importance
    print("Training LightGBM...")
    lgbm = lgb.LGBMClassifier(random_state=1234, verbose=-1)
    lgbm.fit(X_train, y_train)
    
    lgbm_imp = pd.DataFrame({'feature': X.columns, 'importance': lgbm.feature_importances_})
    lgbm_imp = lgbm_imp.sort_values('importance', ascending=False).head(10)
    
    plt.figure(figsize=(10, 6))
    sns.barplot(x='importance', y='feature', data=lgbm_imp, palette='viridis')
    plt.title('Top 10 Feature Importance (LightGBM)', color=colors['gold'])
    plt.xlabel('Importance (Gain)', color=colors['text'])
    plt.ylabel('Feature', color=colors['text'])
    plt.xticks(color=colors['text'])
    plt.yticks(color=colors['text'])
    save_plot('featLGBMChart_static.png')

    print("All charts generated successfully!")

if __name__ == "__main__":
    main()
