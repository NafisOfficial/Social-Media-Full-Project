import pandas as pd
import numpy as np

# ============================================================================
# DATASET PREPROCESSING & OPTIMIZATION FOR FREE HOSTING
# ============================================================================

print("=" * 70)
print("PREPROCESSING DATASETS FOR DEPLOYMENT")
print("=" * 70)

# ── 1. BENGALI DATASET ─────────────────────────────────────────────────────
print("\n[1] Processing Bengali Hate Speech Dataset...")
df_bn = pd.read_csv("d:\\Final year project\\Datasets\\Bengali hate speech_updated.csv")

print(f"  Original size: {len(df_bn):,} rows")
print(f"  Original size (MB): {df_bn.memory_usage(deep=True).sum() / 1024**2:.2f} MB")

# Keep only essential columns
df_bn = df_bn[['sentence', 'hate', 'harassment_type', 'severity']].copy()

# Remove duplicates (keep first occurrence)
df_bn = df_bn.drop_duplicates(subset=['sentence'], keep='first')
print(f"  After removing duplicates: {len(df_bn):,} rows")

# Stratified sampling to reduce size while maintaining class balance
# Target: ~5000 rows
target_size = 5000
class_counts = df_bn['hate'].value_counts()
print(f"  Class distribution - Harassment: {class_counts.get(1, 0)}, Normal: {class_counts.get(0, 0)}")

# Calculate sampling fraction
sample_fraction = min(target_size / len(df_bn), 1.0)

if len(df_bn) > target_size:
    df_bn = df_bn.groupby('hate', group_keys=False).apply(
        lambda x: x.sample(frac=sample_fraction, random_state=42)
    ).reset_index(drop=True)
    df_bn = df_bn.sample(frac=1, random_state=42).reset_index(drop=True)

print(f"  After stratified sampling: {len(df_bn):,} rows")
print(f"  Final size (MB): {df_bn.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
print(f"  Compression: {((1 - len(df_bn)/6173) * 100):.1f}% reduction")

# Save optimized dataset
df_bn.to_csv("d:\\Final year project\\Datasets\\bengali_hate_speech_optimized.csv", index=False)
print(f"  ✓ Saved: bengali_hate_speech_optimized.csv")

# ── 2. ENGLISH DATASET ─────────────────────────────────────────────────────
print("\n[2] Processing English Toxic Comments Dataset...")
df_en = pd.read_csv("d:\\Final year project\\Datasets\\toxic_comments_50000.csv")

print(f"  Original size: {len(df_en):,} rows")
print(f"  Original size (MB): {df_en.memory_usage(deep=True).sum() / 1024**2:.2f} MB")

# Keep only essential columns
df_en = df_en[['sentence', 'hate']].copy()

# Add default harassment_type and severity for consistency
df_en['harassment_type'] = 'toxic_comment'
df_en['severity'] = df_en['hate'].apply(lambda x: 3 if x == 1 else 0)

# Remove duplicates
df_en = df_en.drop_duplicates(subset=['sentence'], keep='first')
print(f"  After removing duplicates: {len(df_en):,} rows")

# Stratified sampling
class_counts = df_en['hate'].value_counts()
print(f"  Class distribution - Harassment: {class_counts.get(1, 0)}, Normal: {class_counts.get(0, 0)}")

target_size = 6000
sample_fraction = min(target_size / len(df_en), 1.0)

if len(df_en) > target_size:
    df_en = df_en.groupby('hate', group_keys=False).apply(
        lambda x: x.sample(frac=sample_fraction, random_state=42)
    ).reset_index(drop=True)
    df_en = df_en.sample(frac=1, random_state=42).reset_index(drop=True)

print(f"  After stratified sampling: {len(df_en):,} rows")
print(f"  Final size (MB): {df_en.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
print(f"  Compression: {((1 - len(df_en)/49998) * 100):.1f}% reduction")

# Save optimized dataset
df_en.to_csv("d:\\Final year project\\Datasets\\english_toxic_comments_optimized.csv", index=False)
print(f"  ✓ Saved: english_toxic_comments_optimized.csv")

# ── 3. BANGLISH DATASET ────────────────────────────────────────────────────
print("\n[3] Processing Banglish Dataset...")
df_bl = pd.read_csv("d:\\Final year project\\Datasets\\toxic_comments_dataset_updated.csv")

print(f"  Original size: {len(df_bl):,} rows")
print(f"  Original size (MB): {df_bl.memory_usage(deep=True).sum() / 1024**2:.2f} MB")

# Keep only essential columns
df_bl = df_bl[['sentence', 'hate']].copy()

# Add default harassment_type and severity for consistency
df_bl['harassment_type'] = 'banglish_comment'
df_bl['severity'] = df_bl['hate'].apply(lambda x: 3 if x == 1 else 0)

# Remove duplicates
df_bl = df_bl.drop_duplicates(subset=['sentence'], keep='first')
print(f"  After removing duplicates: {len(df_bl):,} rows")

# Stratified sampling
class_counts = df_bl['hate'].value_counts()
print(f"  Class distribution - Harassment: {class_counts.get(1, 0)}, Normal: {class_counts.get(0, 0)}")

target_size = 5500
sample_fraction = min(target_size / len(df_bl), 1.0)

if len(df_bl) > target_size:
    df_bl = df_bl.groupby('hate', group_keys=False).apply(
        lambda x: x.sample(frac=sample_fraction, random_state=42)
    ).reset_index(drop=True)
    df_bl = df_bl.sample(frac=1, random_state=42).reset_index(drop=True)

print(f"  After stratified sampling: {len(df_bl):,} rows")
print(f"  Final size (MB): {df_bl.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
print(f"  Compression: {((1 - len(df_bl)/49998) * 100):.1f}% reduction")

# Save optimized dataset
df_bl.to_csv("d:\\Final year project\\Datasets\\banglish_toxic_comments_optimized.csv", index=False)
print(f"  ✓ Saved: banglish_toxic_comments_optimized.csv")

# ── SUMMARY ────────────────────────────────────────────────────────────────
print("\n" + "=" * 70)
print("PREPROCESSING COMPLETE")
print("=" * 70)

total_rows = len(df_bn) + len(df_en) + len(df_bl)
total_size_mb = (df_bn.memory_usage(deep=True).sum() + 
                 df_en.memory_usage(deep=True).sum() + 
                 df_bl.memory_usage(deep=True).sum()) / 1024**2

print(f"\n✓ Total optimized rows: {total_rows:,}")
print(f"✓ Total optimized size: {total_size_mb:.2f} MB")
print(f"✓ Size reduction: ~85% smaller")
print(f"\nOptimized datasets ready for deployment!")
print(f"\nFiles created:")
print(f"  1. bengali_hate_speech_optimized.csv ({len(df_bn):,} rows)")
print(f"  2. english_toxic_comments_optimized.csv ({len(df_en):,} rows)")
print(f"  3. banglish_toxic_comments_optimized.csv ({len(df_bl):,} rows)")
