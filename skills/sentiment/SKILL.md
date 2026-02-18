---
name: sentiment
description: Analyze market sentiment from Twitter, News, and Web search.
version: 1.0.0
requires:
  env:
    - TWITTER_API_KEY # Optional, fallback to search
    - SEARCH_API_KEY
---

# Sentiment Analysis Skill

This skill allows you to gather external context to validate market predictions.

## Capabilities

- Search for recent social media mentions of a topic.
- Aggregate news headlines and assess the overall "mood."
- Extract key arguments for and against a specific outcome.

## Essential Tools

Execute these actions via the `exec` tool.

### 1. Social Sentiment Scan

`npm run sentiment -- search --query "Trump election odds" --source "twitter"`
Returns a summary of recent engagement and prevailing opinion.

### 2. News Aggregation

`npm run sentiment -- search --query "US economy inflation report" --source "news"`
Fetches the latest headlines and provides a "Bullish/Bearish" score.

### 3. Argument Extraction

`npm run sentiment -- analyze --topic "<market_desc>"`
Synthesizes data into a "Confidence Score" (0-100).

## Strategy Guidelines

- **Recency**: Always prioritize news from the last 24 hours.
- **Source Reliability**: Cross-reference Twitter hype with official news reports.
- **Confirmation Bias**: Actively look for information that *contradicts* your current position.
