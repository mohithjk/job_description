import requests

# Replace with your actual NewsAPI key
API_KEY = "5ea1cb0c9cbc4ea186b6fd6f52d1dc99"
QUERY = "Artificial Intelligence"   # you can replace with user field like "Data Science", "Finance", etc.

url = f"https://newsapi.org/v2/everything?q={QUERY}&sortBy=publishedAt&language=en&apiKey={API_KEY}"

response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    articles = data.get("articles", [])

    print(f"\n📰 Latest news about {QUERY}:\n")
    for i, article in enumerate(articles[:5], start=1):  # show top 5
        print(f"{i}. {article['title']}")
        print(f"   Source: {article['source']['name']}")
        print(f"   URL: {article['url']}\n")
else:
    print("❌ Failed to fetch news:", response.status_code, response.text)
